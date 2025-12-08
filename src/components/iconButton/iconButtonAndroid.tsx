import {
  buttonBaseClasses,
  ExtendButtonBase,
  touchRippleClasses,
} from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { materialDesign } from "../../shared/android/materialDesign";
import {
  IconButtonBase,
  IconButtonBaseProps,
  IconButtonBaseTypeMap,
} from "./iconButtonBase";

/**
 * MD3 https://m3.material.io/components/icon-buttons
 */
const StyledIconButtonBase = styled(IconButtonBase, {
  name: "AdaptiveIconButton",
  slot: "android",
})<{ ownerState: IconButtonBaseProps }>(({ ownerState, theme }) => {
  const sizeInfo = {
    small: { padding: 6, font: 20, pressedRadius: 8 },
    medium: { padding: 8, pressedRadius: 8 },
    large: { padding: 16, pressedRadius: 12 },
    "x-large": { padding: 32, pressedRadius: 16 },
  }[ownerState.size ?? "medium"];

  return {
    padding: sizeInfo.padding,

    ...materialDesign.focusRipple(
      theme,
      ownerState,
      theme.transitions.create(["background-color", "border-radius"], {
        duration: theme.transitions.duration.short,
      }),
    ),

    "&:active": {
      borderRadius: sizeInfo.pressedRadius,
    },
    [`&.${buttonBaseClasses.focusVisible}`]: materialDesign.focusRippleVisible(
      theme,
      ownerState,
    ),
    "& > *": {
      fontSize: sizeInfo.font
        ? theme.typography.pxToRem(sizeInfo.font)
        : undefined,
    },
    [`& .${touchRippleClasses.ripple} .${touchRippleClasses.child}`]: {
      borderRadius: sizeInfo.pressedRadius,
    },
  };
});

export const IconButtonAndroid: ExtendButtonBase<IconButtonBaseTypeMap> =
  function <RootComponent extends React.ElementType, AdditionalProps = {}>(
    props: IconButtonBaseProps<RootComponent, AdditionalProps>,
  ) {
    const { className, disableFocusRipple, ...otherProps } = props;
    const ownerState = materialDesign.useButtonBaseRippleProps(props);

    const composedClasses = composeClasses(
      { android: ["android"] },
      (s) => generateUtilityClass("AdaptiveIconButton", s),
      props.classes,
    );

    return (
      <StyledIconButtonBase
        className={clsx(composedClasses.android, className)}
        disableFocusRipple
        ownerState={ownerState}
        {...otherProps}
      />
    );
  };
