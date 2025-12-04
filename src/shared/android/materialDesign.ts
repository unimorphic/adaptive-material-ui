import { Theme, useThemeProps } from "@mui/material/styles";

interface RippleProps {
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
}

export const materialDesign = {
  focusRipple: (
    theme: Theme,
    ownerState: RippleProps,
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
  focusRippleVisible: (theme: Theme, ownerState: RippleProps) => {
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

  /**
   * Sets the ripple props using the ButtonBase theme props.
   * This allows disabling the ripple effect globally in a single place.
   * https://mui.com/material-ui/getting-started/faq/#how-can-i-disable-the-ripple-effect-globally
   */
  useButtonBaseRippleProps: <T extends RippleProps>(props: T): T => {
    const buttonBaseProps = useThemeProps({
      props: props,
      name: "MuiButtonBase",
    });
    return {
      ...props,
      disableFocusRipple: buttonBaseProps.disableFocusRipple,
      disableRipple: buttonBaseProps.disableRipple,
    };
  },
};
