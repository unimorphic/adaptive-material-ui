import { ExtendButtonBase } from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { ButtonBase, ButtonBaseProps, ButtonBaseTypeMap } from "./buttonBase";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Buttons
 */
const StyledButton = styled(ButtonBase, {
  name: "AdaptiveButton",
  slot: "ios",
})<{ ownerState: ButtonBaseProps }>(({ ownerState, theme }) => {
  const sizeInfo = {
    small: { padding: "1px 10px", font: 15 },
    medium: { padding: "2px 12px", font: 17 },
    large: { padding: "10px 20px", font: 17 },
    "x-large": { padding: "26px 44px", font: 24 },
  }[ownerState.size ?? "medium"];

  return {
    fontSize: theme.typography.pxToRem(sizeInfo.font),
    fontWeight: 400,
    padding: sizeInfo.padding,
    textTransform: "none",
  };
});

export const ButtonIOS: ExtendButtonBase<ButtonBaseTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: ButtonBaseProps<RootComponent, AdditionalProps>) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveButton", s),
    props.classes,
  );

  return (
    <StyledButton
      className={clsx(composedClasses.ios, className)}
      disableTouchRipple
      ownerState={props}
      {...otherProps}
    />
  );
};
