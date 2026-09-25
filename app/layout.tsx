import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mirador Documentation",
  description: "A practical guide to using, installing, and configuring Mirador.",
};

const navbar = (
  <Navbar
    logo={
      <span className="mirador-logo">
        <img src="/mirador-logo.svg" alt="" width="30" height="30" />
        <span>Mirador Documentation</span>
      </span>
    }
  />
);

const footer = (
  <Footer>
    <span>
      Mirador is open-source, community-driven software. Contributions are welcome; read the{" "}
      <a href="https://github.com/ProjectMirador/mirador?tab=contributing-ov-file">
        contributing guide
      </a>{" "}
      to learn how to report issues, propose changes, and help improve the project.
    </span>
  </Footer>
);

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
        color={{
          hue: 214.7,
          saturation: 78.7,
          lightness: 46.1,
        }}
      >
        <meta name="theme-color" content="rgb(25, 103, 210)" />
        <link rel="shortcut icon" href="/mirador-logo.svg" />
      </Head>
      <body>
        <Banner dismissible={false}>
          <span>
            Mirador 4 guide. Try the{" "}
            <a href="https://projectmirador.org/demo/">official live demo</a>.
          </span>
        </Banner>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          sidebar={{ autoCollapse: true, defaultMenuCollapseLevel: 1, toggleButton: true }}
          docsRepositoryBase="https://github.com/projectmirador/mirador/wiki"
          footer={footer}
          editLink={false}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
