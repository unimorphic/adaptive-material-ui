import { ExtendButtonBase } from "@mui/material/ButtonBase";
import { fabClasses } from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { materialDesign } from "../../shared/android/materialDesign";
import { FabBase, FabBaseProps, FabBaseTypeMap } from "./fabBase";

/**
 * MD3 https://m3.material.io/components/floating-action-button
 * https://m3.material.io/components/extended-fab
 * https://material-web.dev/components/fab/
 */
const StyledFab = styled(FabBase, {
  name: "AdaptiveFab",
  slot: "android",
})<{ ownerState: FabBaseProps }>(({ ownerState, theme }) => {
  const borderMap = { "x-large": 20, "xx-large": 28 };

  const extendedHeight = {
    "xx-large": 96,
    "x-large": 80,
    large: 56,
    medium: 48,
    small: 40,
  }[ownerState.size ?? "large"];

  return {
    borderRadius:
      ownerState.size && ownerState.size in borderMap
        ? borderMap[ownerState.size as keyof typeof borderMap]
        : 16,
    height: ownerState.variant === "extended" ? extendedHeight : undefined,

    ...materialDesign.focusRipple(
      theme,
      ownerState,
      theme.transitions.create(
        ["background-color", "box-shadow", "border-color"],
        { duration: theme.transitions.duration.short },
      ),
    ),

    [`&.${fabClasses.focusVisible}`]: materialDesign.focusRippleVisible(
      theme,
      ownerState,
    ),
  };
});

export const FabAndroid: ExtendButtonBase<FabBaseTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: FabBaseProps<RootComponent, AdditionalProps>) {
  const { className, disableFocusRipple, ...otherProps } = props;

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveFab", s),
    props.classes,
  );

  return (
    <StyledFab
      className={clsx(composedClasses.android, className)}
      disableFocusRipple
      ownerState={props}
      {...otherProps}
    />
  );
};
