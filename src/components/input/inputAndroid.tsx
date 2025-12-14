import FilledInput, { FilledInputProps } from "@mui/material/FilledInput";
import Input, { InputProps } from "@mui/material/Input";
import { InputBaseProps } from "@mui/material/InputBase";
import OutlinedInput, {
  outlinedInputClasses,
  OutlinedInputProps,
} from "@mui/material/OutlinedInput";
import { styled, Theme } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";

function getCaretColor(theme: Theme, ownerState: InputBaseProps) {
  const color = ownerState.error ? "error" : (ownerState.color ?? "primary");
  return (theme.vars ?? theme).palette[color].main;
}

/**
 * MD3 https://m3.material.io/components/text-fields
 */
const StyledInput = styled(Input, {
  name: "AdaptiveInput",
  slot: "android",
})<{ ownerState: InputProps }>(({ theme, ownerState }) => ({
  caretColor: getCaretColor(theme, ownerState),
}));

export function InputAndroid(props: InputProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveInput", s),
    props.classes,
  );

  return (
    <StyledInput
      className={clsx(composedClasses.android, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}

const StyledFilledInput = styled(FilledInput, {
  name: "AdaptiveFilledInput",
  slot: "android",
})<{ ownerState: FilledInputProps }>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.background.container.highest,
  caretColor: getCaretColor(theme, ownerState),
}));

export function FilledInputAndroid(props: FilledInputProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveFilledInput", s),
    props.classes,
  );

  return (
    <StyledFilledInput
      className={clsx(composedClasses.android, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}

const StyledOutlinedInput = styled(OutlinedInput, {
  name: "AdaptiveOutlinedInput",
  slot: "android",
})<{ ownerState: OutlinedInputProps }>(({ theme, ownerState }) => ({
  caretColor: getCaretColor(theme, ownerState),

  [`& .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: theme.palette.dividerSecondary,
  },
}));

export function OutlinedInputAndroid(props: OutlinedInputProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveOutlinedInput", s),
    props.classes,
  );

  return (
    <StyledOutlinedInput
      className={clsx(composedClasses.android, className)}
      ownerState={props}
      {...otherProps}
    />
  );
}
