import { ButtonTypeMap } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { ButtonRound, ButtonRoundProps } from "./buttonRound";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Buttons
 */
const StyledButton = styled(ButtonRound, {
  name: "AdaptiveButton",
  slot: "ios",
})<{
  ownerState: ButtonRoundProps;
}>(({ ownerState }) => ({
  padding:
    ownerState.size === "large"
      ? "12px 20px"
      : ownerState.size === "small"
        ? "3px 10px"
        : "5px 12px",
})) as unknown as typeof ButtonRound;

export function ButtonIOS<
  RootComponent extends React.ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
>(props: ButtonRoundProps<RootComponent, AdditionalProps>) {
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
      {...(otherProps as ButtonRoundProps<RootComponent, AdditionalProps>)}
    />
  );
}
