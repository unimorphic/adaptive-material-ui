import { ExtendButtonBase } from "@mui/material/ButtonBase";
import { fabClasses } from "@mui/material/Fab";
import { alpha, styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { FabBase, FabBaseProps, FabBaseTypeMap } from "./fabBase";

const StyledFab = styled(FabBase, {
  name: "AdaptiveFab",
  slot: "ios",
})<{ ownerState: FabBaseProps }>(({ ownerState, theme }) => {
  const currentColor =
    !ownerState.color ||
    ownerState.color === "default" ||
    ownerState.color === "inherit"
      ? (theme.vars ?? theme).palette.grey[300]
      : (theme.vars ?? theme).palette[ownerState.color].main;
  const currentColorTransparent = alpha(currentColor, 0.7);

  const size = {
    "xx-large": 92,
    "x-large": 76,
    large: 52,
    medium: 44,
    small: 36,
  }[ownerState.size ?? "large"];

  return {
    backgroundColor: currentColor,
    height: size,
    width: ownerState.variant !== "extended" ? size : undefined,

    ...theme.applyStyles("dark", {
      backgroundColor: currentColorTransparent,
    }),

    [`&, &:active, &.${fabClasses.focusVisible}`]: {
      boxShadow: `inset -3px -3px 0px -3.5px #fff, inset 3px 3px 0px -3.5px #fff, inset 0px 0px 0px .5px #ffffff80, inset 3px 3px 10px -2px ${currentColor}, inset -3px -3px 10px -2px ${currentColor}, inset 0 0 5px 1px #fff, 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)`,

      ...theme.applyStyles("dark", {
        boxShadow: `inset 3px 3px 0px -3.5px ${currentColor}, inset -3px -3px 0px -3.5px ${currentColor}, inset -.5px -.5px 0px #ffffff80, inset .5px .5px 0px #ffffff1a, inset -3px 3px 0px -3.5px #ffffff40, inset 0px -5px 0px -3.5px ${currentColorTransparent}, inset 0px -5px 5px ${currentColorTransparent}, 0 0 15px 4px #0003`,
      }),
    },
  };
});

export const FabIOS: ExtendButtonBase<FabBaseTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: FabBaseProps<RootComponent, AdditionalProps>) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveFab", s),
    props.classes,
  );

  return (
    <StyledFab
      className={clsx(composedClasses.ios, className)}
      disableTouchRipple
      ownerState={props}
      {...otherProps}
    />
  );
};
