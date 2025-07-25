import { CSSObject } from "@emotion/react";

declare module "@mui/material/styles" {
  interface Theme {
    applyStyles: (key: "light" | "dark", styles: CSSObject) => CSSObject;
  }
}
