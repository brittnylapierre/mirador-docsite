import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";
import { Callout, FileTree } from "nextra/components";
import HomeMiradorViewer from "./app/components/HomeMiradorViewer";

// Get the default MDX components
const themeComponents = getThemeComponents();

// Merge components
export function useMDXComponents() {
  return {
    ...themeComponents,
    Callout: Callout,
    FileTree: FileTree,
    HomeMiradorViewer: HomeMiradorViewer,
  };
}
