import { CSSProperties, Theme } from "@mui/material/styles";

const iosLiquidGlass = {
  thumb: (theme: Theme) =>
    ({
      backgroundColor: theme.palette.common.white,
      display: "block",
      transition: theme.transitions.create(["background-color", "transform"], {
        duration: iosLiquidGlass.transitionDuration,
      }),

      "&:after": {
        content: '""',
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 0 40px 15px currentColor"
            : "0 0 40px 10px currentColor",
        display: "block",
        height: 1,
        left: "50%",
        opacity: 0,
        position: "absolute",
        top: "50%",
        transition: theme.transitions.create(["opacity", "transform"], {
          duration: iosLiquidGlass.transitionDuration,
        }),
        width: 1,
      },

      "&:before": {
        borderRadius: "inherit",
        boxShadow:
          theme.palette.mode === "dark"
            ? "inset 3px 3px 0px -3.5px #fff, inset -3px -3px 0px -3.5px #fff, inset -.5px -.5px 0px #ffffff80, inset .5px .5px 0px #ffffff1a, inset -3px 3px 0px -3.5px #ffffff40, inset 0px -5px 0px -3.5px #ffffff40, inset 0px -5px 5px #ffffff40"
            : "inset -3px -3px 0px -3.5px #fff, inset 3px 3px 0px -3.5px #fff, inset 0px 0px 0px .5px #ffffff80, inset 3px 3px 10px -2px #eee, inset -3px -3px 10px -2px #eee, inset 0 0 5px 1px #fff",
        content: '""',
        display: "block",
        height: "100%",
        opacity: 0,
        width: "100%",
      },
    }) satisfies CSSProperties,

  thumbActive: (scale: number, transform?: string) =>
    ({
      backgroundColor: "transparent",
      boxShadow: "0 .5px 4px #0000001f, 0 6px 13px #0000001f",
      transform: `${transform?.toString() ?? ""} scale(${scale.toString()})`,

      "&:after": {
        opacity: 1,
        transform: `scale(calc(1/${scale.toString()}))`,
      },

      "&:before": {
        opacity: 1,
      },
    }) satisfies CSSProperties,

  thumbFocused: () =>
    ({
      "&:after": {
        opacity: 1,
      },
    }) satisfies CSSProperties,

  transitionDuration: 300,
};

export default iosLiquidGlass;
