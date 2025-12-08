import {
  checkboxClasses,
  CheckboxClasses,
  CheckboxProps,
} from "@mui/material/Checkbox";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import { useAdaptiveMode } from "../../adaptiveMode/adaptiveMode";
import { AndroidClasses } from "../../shared/android/androidClasses";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export type AdaptiveCheckboxProps = CheckboxProps &
  StyledComponentProps<keyof AdaptiveCheckboxClasses>;

export interface AdaptiveCheckboxClasses
  extends CheckboxClasses,
    IosClasses,
    AndroidClasses {}

export const adaptiveCheckboxClasses = {
  ...checkboxClasses,
  ...generateUtilityClasses("AdaptiveCheckbox", ["android", "ios"]),
};

// See docs\pages\docs\codeSplitting.md
const CheckboxAndroid = lazy(async () => {
  const { CheckboxAndroid } = await import("../android");
  return { default: CheckboxAndroid };
});
const CheckboxDesktop = lazy(async () => {
  const { CheckboxDesktop } = await import("../desktop");
  return { default: CheckboxDesktop };
});
const CheckboxIOS = lazy(async () => {
  const { CheckboxIOS } = await import("../ios");
  return { default: CheckboxIOS };
});

export function AdaptiveCheckbox(inProps: AdaptiveCheckboxProps) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveCheckbox" });
  const adaptiveMode = useAdaptiveMode();

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <CheckboxAndroid {...props} />;
      break;
    case "ios":
      content = <CheckboxIOS {...props} />;
      break;
    default:
      content = <CheckboxDesktop {...props} />;
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveCheckbox"
      targetComponentName="MuiCheckbox"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}
