export default interface RemarkTreeNode {
  children?: RemarkTreeNode[];
  name: string;
  type: string;
  value: string;
}
