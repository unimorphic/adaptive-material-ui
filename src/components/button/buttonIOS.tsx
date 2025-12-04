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
})<{ ownerState: ButtonBaseProps }>(({ ownerState }) => ({
  padding:
    ownerState.size === "large"
      ? "12px 20px"
      : ownerState.size === "small"
        ? "3px 10px"
        : "5px 12px",
}));

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
