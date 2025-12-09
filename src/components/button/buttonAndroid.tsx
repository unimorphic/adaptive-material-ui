import { buttonClasses } from "@mui/material/Button";
import { ExtendButtonBase } from "@mui/material/ButtonBase";
import { buttonGroupClasses } from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { materialDesign } from "../../shared/android/materialDesign";
import { ButtonBase, ButtonBaseProps, ButtonBaseTypeMap } from "./buttonBase";

/**
 * MD3 https://m3.material.io/components/buttons
 */
const StyledButton = styled(ButtonBase, {
  name: "AdaptiveButton",
  slot: "android",
})<{ ownerState: ButtonBaseProps }>(({ ownerState, theme }) => {
  const sizeInfo = {
    small: {
      padding: "6px 12px",
      font: 14,
      lineHeight: 1.428,
      radius: 12,
      pressedRadius: 8,
    },
    medium: {
      padding: "10px 16px",
      font: 14,
      lineHeight: 1.428,
      radius: 12,
      pressedRadius: 8,
    },
    large: {
      padding: "16px 24px",
      font: 16,
      lineHeight: 1.5,
      radius: 16,
      pressedRadius: 12,
    },
    "x-large": {
      padding: "32px 48px",
      font: 24,
      lineHeight: 1.333,
      radius: 28,
      pressedRadius: 16,
    },
  }[ownerState.size ?? "medium"];

  return {
    borderRadius: !ownerState.round ? sizeInfo.radius : undefined,
    fontSize: theme.typography.pxToRem(sizeInfo.font),
    lineHeight: sizeInfo.lineHeight,
    padding: sizeInfo.padding,
    textTransform: "none",

    ...materialDesign.focusRipple(
      theme,
      ownerState,
      theme.transitions.create(
        ["background-color", "border-radius", "box-shadow", "border-color"],
        { duration: theme.transitions.duration.short },
      ),
    ),

    [`*:not(.${buttonGroupClasses.root}) > &:active`]: {
      borderRadius: sizeInfo.pressedRadius,
    },
    [`&.${buttonClasses.focusVisible}`]: materialDesign.focusRippleVisible(
      theme,
      ownerState,
    ),
  };
});

export const ButtonAndroid: ExtendButtonBase<ButtonBaseTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: ButtonBaseProps<RootComponent, AdditionalProps>) {
  const { className, disableFocusRipple, ...otherProps } = props;
  const ownerState = materialDesign.useButtonBaseRippleProps(props);

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveButton", s),
    props.classes,
  );

  return (
    <StyledButton
      className={clsx(composedClasses.android, className)}
      disableFocusRipple
      ownerState={ownerState}
      {...otherProps}
    />
  );
};
