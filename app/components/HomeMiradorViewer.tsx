"use client";

import { useEffect, useRef, useState } from "react";

type MiradorInstance = {
  unmount?: () => void;
};

type MiradorModule = {
  default?: {
    viewer: (config: unknown, plugins?: unknown[]) => MiradorInstance;
  };
  viewer?: (config: unknown, plugins?: unknown[]) => MiradorInstance;
};

const viewerId = "mirador-home-viewer";

const config = {
  id: viewerId,
  osdConfig: {
    crossOriginPolicy: "Anonymous",
  },
  windows: [
    {
      manifestId: "https://media.nga.gov/public/manifests/nga_highlights.json",
    },
    {
      manifestId: "https://iiif.harvardartmuseums.org/manifests/object/299843",
    },
  ],
};

export default function HomeMiradorViewer() {
  const viewerRef = useRef<MiradorInstance | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let isMounted = true;

    async function mountViewer() {
      try {
        const module = (await import("mirador")) as MiradorModule;
        const Mirador = module.default ?? module;

        if (!isMounted || !Mirador.viewer) return;

        viewerRef.current = Mirador.viewer(config, []);
        setStatus("ready");
      } catch {
        if (isMounted) setStatus("error");
      }
    }

    mountViewer();

    return () => {
      isMounted = false;

      const viewer = viewerRef.current;
      viewerRef.current = null;

      if (viewer?.unmount) {
        window.setTimeout(() => {
          viewer.unmount();
        }, 0);
      }
    };
  }, []);

  return (
    <div className="mirador-live-viewer-shell">
      <div id={viewerId} className="mirador-live-viewer" aria-label="Mirador viewer demo" />
      {status !== "ready" ? (
        <div className="mirador-live-status" role={status === "error" ? "alert" : "status"}>
          {status === "error" ? "Unable to load Mirador." : "Loading Mirador..."}
        </div>
      ) : null}
    </div>
  );
}
