import { Theme } from "@mui/material/styles";

interface RippleOwnerState {
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
}

export const materialDesign = {
  focusRipple: (
    theme: Theme,
    ownerState: RippleOwnerState,
    transition?: string,
    offset = 2,
  ) => {
    if (ownerState.disableFocusRipple || ownerState.disableRipple) {
      return { transition: transition };
    }

    return {
      outlineOffset: offset,
      transition:
        theme.transitions.create(["outline"], {
          easing: "cubic-bezier(0.3, 0.8, 0.3, 4)",
        }) + (transition ? `, ${transition}` : ""),
    };
  },
  focusRippleVisible: (theme: Theme, ownerState: RippleOwnerState) => {
    if (ownerState.disableFocusRipple || ownerState.disableRipple) {
      return {};
    }

    return {
      outline: `3px solid ${theme.palette.common.black}`,

      ...theme.applyStyles("dark", {
        outlineColor: theme.palette.common.white,
      }),
    };
  },
};
