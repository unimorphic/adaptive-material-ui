import FilledInput, { FilledInputProps } from "@mui/material/FilledInput";
import Input, { InputProps } from "@mui/material/Input";
import OutlinedInput, {
  outlinedInputClasses,
  OutlinedInputProps,
} from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Text%2520Field
 */
const StyledInput = styled(Input, {
  name: "AdaptiveInput",
  slot: "ios",
})<{ ownerState: InputProps }>(() => ({
  "&:after": {
    display: "none",
  },
}));

export function InputIOS(props: InputProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveInput", s),
    props.classes,
  );

  return (
    <StyledInput
      className={clsx(composedClasses.ios, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}

const StyledFilledInput = styled(FilledInput, {
  name: "AdaptiveFilledInput",
  slot: "ios",
})<{ ownerState: InputProps }>(() => ({
  "&:after": {
    display: "none",
  },
}));

export function FilledInputIOS(props: FilledInputProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveFilledInput", s),
    props.classes,
  );

  return (
    <StyledFilledInput
      className={clsx(composedClasses.ios, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}

const StyledOutlinedInput = styled(OutlinedInput, {
  name: "AdaptiveOutlinedInput",
  slot: "ios",
})<{ ownerState: InputProps }>(({ theme }) => ({
  [`&.${outlinedInputClasses.focused}`]: {
    [`&:not(.${outlinedInputClasses.error}) .${outlinedInputClasses.notchedOutline}`]:
      {
        borderColor: (theme.vars ?? theme).palette.text.primary,
      },
    [`& .${outlinedInputClasses.notchedOutline}`]: {
      borderWidth: 1,
    },
  },
}));

export function OutlinedInputIOS(props: OutlinedInputProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveOutlinedInput", s),
    props.classes,
  );

  return (
    <StyledOutlinedInput
      className={clsx(composedClasses.ios, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}
