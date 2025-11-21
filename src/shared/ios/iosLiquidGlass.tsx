import { CSSObject, Theme } from "@mui/material/styles";

interface IosLiquidGlass {
  backdrop: (theme: Theme) => CSSObject;
  overlay: (theme: Theme) => CSSObject;
  thumb: (theme: Theme) => CSSObject;
  thumbActive: (scale: number, transform?: string) => CSSObject;
  transitionDuration: number;
}

export const iosLiquidGlass: IosLiquidGlass = {
  backdrop: (theme: Theme) => ({
    backgroundColor: "rgba(41, 41, 58, 0.23)",

    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(18, 18, 18, 0.56)",
    }),
  }),

  overlay: (theme: Theme) => ({
    backdropFilter: "blur(16px)",
    background: "#ffffffbf",
    boxShadow:
      "inset -1px -1px 0px -.5px #fff, inset 1px 1px 0px -.5px #fff, inset 3px 3px 10px -3px #ddd, inset -3px -3px 10px -3px #ddd, inset 0 0 5px 1px #fff, inset 0 0 0 .5px #00000040, inset 0 0 24px 0 #0000001a, 0 0 25px 0 #0003",

    ...theme.applyStyles("dark", {
      background: "#32323280",
      boxShadow:
        "inset -2px -2px .5px -2.5px #fff6, inset 3px 3px .5px -3.5px #fff6, inset 2px 2px .5px -2px #262626, inset -2px -2px .5px -2px #262626, inset 0 0 5px 1px #141414, inset 0 0 0 1px #ffffff26, inset 0 0 10px 0 #ffffff13, inset 0 0 24px 0 #ffffff0d, 0 0 25px 0 #00000026",
    }),
  }),

  thumb: (theme: Theme) => ({
    backgroundColor: theme.palette.common.white,
    display: "block",
    transition: theme.transitions.create(
      ["background-color", "box-shadow", "transform"],
      { duration: iosLiquidGlass.transitionDuration },
    ),

    "&:after": {
      content: '""',
      boxShadow: "0 0 40px 10px currentColor",
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

      ...theme.applyStyles("dark", {
        boxShadow: "0 0 40px 15px currentColor",
      }),
    },

    "&:before": {
      borderRadius: "inherit",
      boxShadow:
        "inset -3px -3px 0px -3.5px #fff, inset 3px 3px 0px -3.5px #fff, inset 0px 0px 0px .5px #ffffff80, inset 3px 3px 10px -2px #eee, inset -3px -3px 10px -2px #eee, inset 0 0 5px 1px #fff",
      content: '""',
      display: "block",
      height: "100%",
      opacity: 0,
      width: "100%",

      ...theme.applyStyles("dark", {
        boxShadow:
          "inset 3px 3px 0px -3.5px #fff, inset -3px -3px 0px -3.5px #fff, inset -.5px -.5px 0px #ffffff80, inset .5px .5px 0px #ffffff1a, inset -3px 3px 0px -3.5px #ffffff40, inset 0px -5px 0px -3.5px #ffffff40, inset 0px -5px 5px #ffffff40",
      }),
    },
  }),

  thumbActive: (scale: number, transform?: string) => ({
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
  }),

  transitionDuration: 300,
};
