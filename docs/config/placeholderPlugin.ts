import { readFile, watch } from "node:fs/promises";
import { format as prettier } from "prettier";

interface RemarkTreeNode {
  children?: RemarkTreeNode[];
  type: string;
  value: string;
}

const placeholderContentByFileName: Record<string, string> = {};

async function watchFile(filePath: string, filename: string) {
  const watcher = watch(filePath, {});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for await (const event of watcher) {
    placeholderContentByFileName[filename] = "";
  }
}

async function replacePlaceholders(node: RemarkTreeNode) {
  if (node.children) {
    for (const child of node.children) {
      await replacePlaceholders(child);
    }
  }

  if (node.type !== "code" || !node.value.includes("[[")) {
    return;
  }

  const placeholders = node.value.match(/\[\[\w+\]\]/g) ?? [];
  for (const placeholder of placeholders) {
    const filename = placeholder.substring(2, placeholder.length - 2);
    const filePath = `shared/placeholders/${filename}.tsx`;

    let fileContent = placeholderContentByFileName[filename];
    if (!fileContent) {
      fileContent = await readFile(filePath, { encoding: "utf8" });
      placeholderContentByFileName[filename] = fileContent;

      watchFile(filePath, filename).catch((ex: unknown) => console.log(ex));
    }

    const parts = fileContent.split("\n<>\n");

    if (parts.length !== 2) {
      throw new Error(`Invalid placeholder file ${filePath}`);
    }

    const [imports, component] = parts;

    node.value =
      imports +
      node.value.replace(placeholder, component.replace("\n</>;\n", ""));
  }

  node.value = await prettier(node.value, { parser: "typescript" });
}

/**
 * Plugin that replaces [[placeHolders]] in mdx files with the contents of matching files in the shared/placeholders folder
 */
export default function placeholderPlugin() {
  return async (tree: RemarkTreeNode) => {
    for (const child of tree.children ?? []) {
      await replacePlaceholders(child);
    }
  };
}
