import RemarkTreeNode from "./remarkTreeNode";

async function removeEslintDisable(node: RemarkTreeNode) {
  for (const child of node.children ?? []) {
    await removeEslintDisable(child);
  }

  if (node.type !== "code" || !node.value.includes("eslint-disable")) {
    return;
  }

  node.value = node.value.replace("/* eslint-disable */\n", "");
}

/**
 * Plugin that removes eslint-disable in mdx files
 */
export default function eslintDisablePlugin() {
  return async (tree: RemarkTreeNode) => {
    for (const child of tree.children ?? []) {
      await removeEslintDisable(child);
    }
  };
}
