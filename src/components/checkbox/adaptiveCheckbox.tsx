import {
  checkboxClasses,
  CheckboxClasses,
  CheckboxProps,
} from "@mui/material/Checkbox";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import generateUtilityClasses from "@mui/utils/generateUtilityClasses";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { IosClasses } from "../../shared/ios/iosClasses";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";

export type AdaptiveCheckboxProps = CheckboxProps &
  StyledComponentProps<keyof AdaptiveCheckboxClasses> &
  AdaptiveModeProp;

export interface AdaptiveCheckboxClasses extends CheckboxClasses, IosClasses {}

export const adaptiveCheckboxClasses = {
  ...checkboxClasses,
  ...generateUtilityClasses("AdaptiveCheckbox", ["ios"]),
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
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <CheckboxAndroid {...otherProps} />;
      break;
    case "ios":
      content = <CheckboxIOS {...otherProps} />;
      break;
    default:
      content = <CheckboxDesktop {...otherProps} />;
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
