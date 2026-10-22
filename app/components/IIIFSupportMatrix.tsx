"use client";

import React, { useId, useMemo, useState } from "react";

export type CapabilityStatus = "supported" | "partial" | "notsupported" | "unknown";

export interface CapabilityItem {
  area: string;
  cap: string;
  status: CapabilityStatus;
  note: string;
}

const DATA: CapabilityItem[] = [
  // Presentation — structure & navigation
  {
    area: "Presentation · Structure & navigation",
    cap: "Manifest display",
    status: "supported",
    note: "Core functionality — any valid v2 or v3 manifest renders.",
  },
  {
    area: "Presentation · Structure & navigation",
    cap: "Collections",
    status: "supported",
    note: "Users browse collections in a dialog with full hierarchy navigation.",
  },
  {
    area: "Presentation · Structure & navigation",
    cap: "Table of contents (Ranges)",
    status: "supported",
    note: "Chapter/section structure appears as a clickable sidebar TOC.",
  },
  {
    area: "Presentation · Structure & navigation",
    cap: "Multi-canvas navigation",
    status: "supported",
    note: "Page-turning UI for books and other multi-page items.",
  },
  {
    area: "Presentation · Structure & navigation",
    cap: "Start canvas",
    status: "supported",
    note: "Items open at the publisher's chosen page (v2 startCanvas, v3 start). Canvas-level only — no temporal offset into A/V.",
  },
  {
    area: "Presentation · Structure & navigation",
    cap: "Viewing direction",
    status: "supported",
    note: "All four values; navigation arrows and thumbnails follow the reading direction.",
  },
  {
    area: "Presentation · Structure & navigation",
    cap: "navDate (timeline navigation)",
    status: "notsupported",
    note: "Date stamps on canvases are ignored — no date-based navigation. <a href='https://iiif.io/api/cookbook/recipe/0230-navdate/' target='_blank' rel='noopener noreferrer'>Recipe 0230</a>",
  },

  // Presentation — metadata & display
  {
    area: "Presentation · Metadata & display",
    cap: "Multi-language metadata",
    status: "supported",
    note: "Language picker for manifests published in several languages; can also drive the app UI language.",
  },
  {
    area: "Presentation · Metadata & display",
    cap: "Homepage links",
    status: "supported",
    note: "“View at institution” links from manifest/canvas homepage appear in the info panel. <a href='https://iiif.io/api/cookbook/recipe/0047-homepage/' target='_blank' rel='noopener noreferrer'>Recipe 0047</a>",
  },
  {
    area: "Presentation · Metadata & display",
    cap: "Alternate renderings",
    status: "supported",
    note: "Downloadable representations declared in the manifest (e.g. a PDF of the whole book) are exposed.",
  },
  {
    area: "Presentation · Metadata & display",
    cap: "Placeholder canvas",
    status: "unknown",
    note: "v3 preview canvas for restricted or loading content — behavior untested.",
  },
  {
    area: "Presentation · Metadata & display",
    cap: "Manifest-declared rotation",
    status: "notsupported",
    note: "The spec's two rotation mechanisms (ImageApiSelector rotation, CssStylesheet) are ignored. Users can rotate images, but only via viewer controls/config — a manifest can't request it. <a href='https://iiif.io/api/cookbook/recipe/0040-image-rotation-service/' target='_blank' rel='noopener noreferrer'>Recipe 0040</a>",
  },

  // Presentation — images & layers
  {
    area: "Presentation · Images & layers",
    cap: "Multiple painting annotations per canvas",
    status: "supported",
    note: "Foundation for composite and layered images.",
  },
  {
    area: "Presentation · Images & layers",
    cap: "Choice resources",
    status: "partial",
    note: "<b>Images only:</b> alternate versions of an image (e.g. natural light vs. X-ray) become toggleable layers with opacity and ordering controls (v2 and v3). Choice bodies on A/V canvases (quality alternatives) and text resources are not expanded and have no UI.",
  },

  // Presentation — A/V
  {
    area: "Presentation · Audio & video",
    cap: "A/V content",
    status: "supported",
    note: "Plays in a native HTML5 player — anything the browser's video/audio element supports; no HLS/adaptive streaming.",
  },
  {
    area: "Presentation · Audio & video",
    cap: "Captions (VTT)",
    status: "supported",
    note: "VTT supplementing annotations render as native browser captions, synchronized by the browser.",
  },
  {
    area: "Presentation · Audio & video",
    cap: "Transcripts (non-VTT)",
    status: "notsupported",
    note: "Full transcripts supplied as text/plain or text/html supplementing annotations are not displayed (viewers like Clover do this).",
  },
  {
    area: "Presentation · Audio & video",
    cap: "Temporal media fragments",
    status: "notsupported",
    note: "#t=start,end on canvas targets is silently ignored — no jumping to timestamps from a TOC, no segmented canvases, no time-targeted annotations.",
  },
  {
    area: "Presentation · Audio & video",
    cap: "Auto-advance / repeat behaviors",
    status: "notsupported",
    note: "v3 playlist-style behaviors (auto-advance, repeat) are not handled.",
  },
  {
    area: "Presentation · Audio & video",
    cap: "Accompanying canvas",
    status: "notsupported",
    note: "Secondary synchronized canvas — e.g. a sign-language interpretation video alongside the main content. <a href='https://iiif.io/api/cookbook/recipe/0014-accompanyingcanvas/' target='_blank' rel='noopener noreferrer'>Recipe 0014</a>",
  },

  // Image
  {
    area: "Image API",
    cap: "IIIF Image API images",
    status: "supported",
    note: "Core deep-zoom image rendering via OpenSeadragon.",
  },

  // Search
  {
    area: "Content Search API",
    cap: "Search API v1",
    status: "supported",
    note: "Full-text search inside items via a companion search panel.",
  },
  {
    area: "Content Search API",
    cap: "Autocomplete (v1)",
    status: "supported",
    note: "Type-ahead suggestions, when the manifest declares an autocomplete service.",
  },
  {
    area: "Content Search API",
    cap: "Search API v2",
    status: "notsupported",
    note: "The v2 re-alignment (Presentation v3 / W3C Web Annotation response shapes) isn't parsed; Mirador's search code reads v1/v0 shapes directly.",
  },

  // Auth
  {
    area: "Authentication API",
    cap: "Auth API v1",
    status: "supported",
    note: "All four access patterns: external (SSO), kiosk, clickthrough, and login.",
  },
  {
    area: "Authentication API",
    cap: "Auth API v2",
    status: "notsupported",
    note: "The v2 probe-service model is not implemented (known gap).",
  },

  // Content State
  {
    area: "Content State API",
    cap: "Content State (all forms)",
    status: "notsupported",
    note: "No iiif-content URL parameter, no encoded-state decoding, no drag-and-drop or postMessage import. <b>Practical impact:</b> you can't share a link that opens Mirador to an exact view (item + page + region). Deep-linking works only through Mirador's own config or the manifest's start property. A “share this view” feature via the share plugin has been floated.",
  },

  // Annotations
  {
    area: "Annotations",
    cap: "Annotation display",
    status: "supported",
    note: "Annotations with SVG and fragment selectors render as overlays, listed in a companion window.",
  },
  {
    area: "Annotations",
    cap: "Annotation collections",
    status: "partial",
    note: "Linked/paginated AnnotationCollection resources partially handled: pages load, but collection labels aren't shown (lists are flattened) and pagination is likely unsupported. <a href='https://github.com/ProjectMirador/mirador/issues/589' target='_blank' rel='noopener noreferrer'>Issue #589</a>",
  },
  {
    area: "Annotations",
    cap: "Annotation authoring",
    status: "notsupported",
    note: "Creating annotations relied on the mirador-annotations plugin, which was not maintained through the Mirador 4 upgrade.",
  },

  // Emerging
  {
    area: "Emerging areas",
    cap: "3D",
    status: "notsupported",
    note: "Not supported; a more robust 3D spec is expected in Presentation API 4.",
  },
  {
    area: "Emerging areas",
    cap: "Maps / georeferencing",
    status: "notsupported",
    note: "No Leaflet/OpenLayers integration.",
  },
];

const STATUS_LABELS: Record<CapabilityStatus, string> = {
  supported: "✅ Supported",
  partial: "⚠️ Partial",
  notsupported: "❌ Not supported",
  unknown: "❓ Unknown",
};

const SCORECARD = [
  { icon: "🖼", title: "Image API", detail: "✅ Full support via OpenSeadragon" },
  { icon: "📖", title: "Presentation v2/v3", detail: "Broad; gaps in time-based A/V" },
  { icon: "🔍", title: "Search API", detail: "✅ v1 & autocomplete · ❌ v2" },
  { icon: "🔐", title: "Auth API", detail: "✅ v1 all profiles · ❌ v2" },
  { icon: "🔗", title: "Content State", detail: "❌ Not supported" },
  { icon: "✏️", title: "Annotations", detail: "✅ Display · ⚠️ Collections · ❌ Authoring" },
];

const UNIQUE_AREAS = Array.from(new Set(DATA.map((d) => d.area)));

export default function IIIFSupportMatrix() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");

  const searchId = useId();
  const areaSelectId = useId();

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return DATA.filter((item) => {
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (areaFilter !== "all" && item.area !== areaFilter) return false;
      if (q) {
        const text = `${item.cap} ${item.area} ${item.note}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [search, statusFilter, areaFilter]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setAreaFilter("all");
  };

  // Group items by area while preserving order
  const groupedItems = useMemo(() => {
    const groups: { area: string; items: CapabilityItem[] }[] = [];
    let currentArea: string | null = null;
    let currentGroup: CapabilityItem[] = [];

    for (const item of filteredItems) {
      if (item.area !== currentArea) {
        if (currentArea !== null && currentGroup.length > 0) {
          groups.push({ area: currentArea, items: currentGroup });
        }
        currentArea = item.area;
        currentGroup = [item];
      } else {
        currentGroup.push(item);
      }
    }

    if (currentArea !== null && currentGroup.length > 0) {
      groups.push({ area: currentArea, items: currentGroup });
    }

    return groups;
  }, [filteredItems]);

  return (
    <div className="iiif-matrix-container">
      {/* High-level Scorecard */}
      <div className="iiif-scorecard" aria-label="IIIF Support Scorecard">
        {SCORECARD.map((card) => (
          <div key={card.title} className="iiif-scorecard-item">
            <span className="iiif-scorecard-title">
              <span className="iiif-scorecard-icon">{card.icon}</span> {card.title}
            </span>
            <span className="iiif-scorecard-detail">{card.detail}</span>
          </div>
        ))}
      </div>

      {/* Controls: Search, Status Pills, Area Dropdown */}
      <div className="iiif-matrix-controls">
        <div className="iiif-matrix-search-box">
          <input
            id={searchId}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search capabilities…"
            aria-label="Search capabilities"
            className="iiif-matrix-search-input"
          />
        </div>

        <div className="iiif-matrix-filter-buttons" role="group" aria-label="Filter by status">
          <button
            type="button"
            className={`iiif-filter-btn ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            type="button"
            className={`iiif-filter-btn ${statusFilter === "supported" ? "active" : ""}`}
            onClick={() => setStatusFilter("supported")}
          >
            ✅ Supported
          </button>
          <button
            type="button"
            className={`iiif-filter-btn ${statusFilter === "partial" ? "active" : ""}`}
            onClick={() => setStatusFilter("partial")}
          >
            ⚠️ Partial
          </button>
          <button
            type="button"
            className={`iiif-filter-btn ${statusFilter === "notsupported" ? "active" : ""}`}
            onClick={() => setStatusFilter("notsupported")}
          >
            ❌ Not supported
          </button>
          <button
            type="button"
            className={`iiif-filter-btn ${statusFilter === "unknown" ? "active" : ""}`}
            onClick={() => setStatusFilter("unknown")}
          >
            ❓ Unknown
          </button>
        </div>

        <div className="iiif-matrix-area-filter">
          <select
            id={areaSelectId}
            aria-label="Filter by area"
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="iiif-matrix-select"
          >
            <option value="all">All areas</option>
            {UNIQUE_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        <div className="iiif-matrix-count" aria-live="polite">
          {filteredItems.length} of {DATA.length} capabilities
        </div>
      </div>

      {/* Table view */}
      {filteredItems.length > 0 ? (
        <div className="iiif-table-wrapper">
          <table className="iiif-matrix-table">
            <thead>
              <tr>
                <th style={{ width: "24%" }}>Capability</th>
                <th style={{ width: "16%" }}>Status</th>
                <th>What this means for you</th>
              </tr>
            </thead>
            <tbody>
              {groupedItems.map((group) => (
                <React.Fragment key={group.area}>
                  <tr className="iiif-area-row">
                    <td colSpan={3}>{group.area}</td>
                  </tr>
                  {group.items.map((item) => (
                    <tr key={item.cap} className="iiif-data-row">
                      <td className="iiif-cap-cell">{item.cap}</td>
                      <td className="iiif-status-cell">
                        <span className={`iiif-badge iiif-badge-${item.status}`}>
                          {STATUS_LABELS[item.status]}
                        </span>
                      </td>
                      <td
                        className="iiif-note-cell"
                        dangerouslySetInnerHTML={{ __html: item.note }}
                      />
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="iiif-matrix-empty">
          <p>No capabilities match your filters.</p>
          <button type="button" onClick={resetFilters} className="iiif-reset-btn">
            Clear all filters
          </button>
        </div>
      )}

      <footer className="iiif-matrix-footer">
        Statuses reflect an internal capability assessment; “Unknown” means untested rather than absent.
        Cookbook links point to the IIIF recipe exercising each feature.
      </footer>
    </div>
  );
}

