import {
  filledInputClasses,
  FilledInputClasses,
  FilledInputProps,
} from "@mui/material/FilledInput";
import { inputClasses, InputClasses, InputProps } from "@mui/material/Input";
import {
  outlinedInputClasses,
  OutlinedInputClasses,
  OutlinedInputProps,
} from "@mui/material/OutlinedInput";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export type AdaptiveInputProps = Omit<InputProps, "classes"> &
  StyledComponentProps<keyof AdaptiveInputClasses> &
  AdaptiveModeProp;

export interface AdaptiveInputClasses extends InputClasses, IosClasses {}

export const adaptiveInputClasses = {
  ...inputClasses,
  ...generateUtilityClasses("AdaptiveInput", ["ios"]),
};

export type AdaptiveFilledInputProps = Omit<FilledInputProps, "classes"> &
  StyledComponentProps<keyof AdaptiveFilledInputClasses> &
  AdaptiveModeProp;

export interface AdaptiveFilledInputClasses
  extends FilledInputClasses,
    IosClasses {}

export const adaptiveFilledInputClasses = {
  ...filledInputClasses,
  ...generateUtilityClasses("AdaptiveFilledInput", ["ios"]),
};

export type AdaptiveOutlinedInputProps = Omit<OutlinedInputProps, "classes"> &
  StyledComponentProps<keyof AdaptiveOutlinedInputClasses> &
  AdaptiveModeProp;

export interface AdaptiveOutlinedInputClasses
  extends OutlinedInputClasses,
    IosClasses {}

export const adaptiveOutlinedInputClasses = {
  ...outlinedInputClasses,
  ...generateUtilityClasses("AdaptiveOutlinedInput", ["ios"]),
};

// See docs\pages\docs\codeSplitting.md
const InputAndroid = lazy(async () => {
  const { InputAndroid } = await import("../android");
  return { default: InputAndroid };
});
const InputDesktop = lazy(async () => {
  const { InputDesktop } = await import("../desktop");
  return { default: InputDesktop };
});
const InputIOS = lazy(async () => {
  const { InputIOS } = await import("../ios");
  return { default: InputIOS };
});

const FilledInputAndroid = lazy(async () => {
  const { FilledInputAndroid } = await import("../android");
  return { default: FilledInputAndroid };
});
const FilledInputDesktop = lazy(async () => {
  const { FilledInputDesktop } = await import("../desktop");
  return { default: FilledInputDesktop };
});
const FilledInputIOS = lazy(async () => {
  const { FilledInputIOS } = await import("../ios");
  return { default: FilledInputIOS };
});

const OutlinedInputAndroid = lazy(async () => {
  const { OutlinedInputAndroid } = await import("../android");
  return { default: OutlinedInputAndroid };
});
const OutlinedInputDesktop = lazy(async () => {
  const { OutlinedInputDesktop } = await import("../desktop");
  return { default: OutlinedInputDesktop };
});
const OutlinedInputIOS = lazy(async () => {
  const { OutlinedInputIOS } = await import("../ios");
  return { default: OutlinedInputIOS };
});

export function AdaptiveInput(inProps: AdaptiveInputProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveInput" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <InputAndroid {...otherProps} />;
      break;
    case "ios":
      content = <InputIOS {...otherProps} />;
      break;
    default:
      content = <InputDesktop {...otherProps} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveInput"
      targetComponentName="MuiInput"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}

export function AdaptiveFilledInput(inProps: AdaptiveFilledInputProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveFilledInput" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <FilledInputAndroid {...otherProps} />;
      break;
    case "ios":
      content = <FilledInputIOS {...otherProps} />;
      break;
    default:
      content = <FilledInputDesktop {...otherProps} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveFilledInput"
      targetComponentName="MuiFilledInput"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}

export function AdaptiveOutlinedInput(inProps: AdaptiveOutlinedInputProps) {
  const props = useThemeProps({
    props: inProps,
    name: "AdaptiveOutlinedInput",
  });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <OutlinedInputAndroid {...otherProps} />;
      break;
    case "ios":
      content = <OutlinedInputIOS {...otherProps} />;
      break;
    default:
      content = <OutlinedInputDesktop {...otherProps} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveOutlinedInput"
      targetComponentName="MuiOutlinedInput"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}
