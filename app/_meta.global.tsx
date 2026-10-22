import type { MetaRecord } from "nextra";

const meta: MetaRecord = {
  index: {
    type: "page",
    title: "Home",
    theme: {
      copyPage: true,
      layout: "full",
      toc: false,
      timestamp: false,
      typesetting: "article",
    },
  },
  "user-guide": {
    type: "page",
    title: "Using Mirador",
  },
  "install-config": {
    type: "page",
    title: "Install & Config Guide",
  },
  "iiif-support": {
    type: "page",
    title: "IIIF Support Matrix",
    theme: {
      toc: false,
    },
  },
  demo: {
    title: "Live Demo",
    href: "https://projectmirador.org/demo/",
  },
  wiki: {
    title: "Wiki",
    href: "https://github.com/projectmirador/mirador/wiki",
  },
  code: {
    title: "Code",
    href: "https://github.com/projectmirador/mirador",
  },
};

export default meta;
