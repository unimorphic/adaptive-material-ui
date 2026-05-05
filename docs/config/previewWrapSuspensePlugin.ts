import { RspressPlugin } from "@rspress/core";
import * as path from "node:path";
import RemarkTreeNode from "./remarkTreeNode";

async function addSuspense(node: RemarkTreeNode) {
  for (const child of node.children ?? []) {
    await addSuspense(child);
  }

  if (node.type === "mdxJsxFlowElement" && node.name.startsWith("Demo_docs_")) {
    node.children = [{ ...node }];
    node.name = "AutoHeightSuspenseSkeleton";
  }
}

/**
 * Plugin that wraps previews in a Suspense component
 */
export default function previewWrapSuspensePlugin(): RspressPlugin {
  return {
    name: "preview-wrap-suspense-plugin",
    markdown: {
      globalComponents: [
        path.join(__dirname, "../shared/autoHeightSuspenseSkeleton.tsx"),
      ],
      remarkPlugins: [
        function () {
          return async (tree: RemarkTreeNode) => {
            for (const child of tree.children ?? []) {
              await addSuspense(child);
            }
          };
        },
      ],
    },
  };
}
