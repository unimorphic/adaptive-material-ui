// https://github.com/mui/material-ui/blob/v7.3.5/packages/mui-material/src/styles/slotShouldForwardProp.ts
export function slotShouldForwardProp(prop: string) {
  return (
    prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as"
  );
}
