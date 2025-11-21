import { selectClasses, SelectClasses } from "@mui/material/Select";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeContext,
  useAdaptiveMode,
} from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { SelectBaseProps } from "./selectProps";

export type AdaptiveSelectProps<Value = unknown> = SelectBaseProps<Value> &
  StyledComponentProps<keyof AdaptiveSelectClasses>;

export interface AdaptiveSelectClasses extends SelectClasses {}

export const adaptiveSelectClasses = selectClasses;

// See docs\pages\docs\codeSplitting.md
const SelectAndroid = lazy(async () => {
  const { SelectAndroid } = await import("../android");
  return { default: SelectAndroid };
});
const SelectDesktop = lazy(async () => {
  const { SelectDesktop } = await import("../desktop");
  return { default: SelectDesktop };
});
const SelectIOS = lazy(async () => {
  const { SelectIOS } = await import("../ios");
  return { default: SelectIOS };
});

export function AdaptiveSelect<Value = unknown>(
  inProps: AdaptiveSelectProps<Value>,
) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSelect" });
  const adaptiveMode = useAdaptiveMode();

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <SelectAndroid<Value> {...props} />;
      break;
    case "ios":
      content = <SelectIOS<Value> {...props} />;
      break;
    default:
      content = <SelectDesktop<Value> {...props} />;
      break;
  }

  return (
    <AdaptiveModeContext.Provider value={{ mode: adaptiveMode }}>
      <ReplaceComponentInTheme
        sourceComponentName="AdaptiveSelect"
        targetComponentName="MuiSelect"
      >
        <ReplaceComponentInTheme
          sourceComponentName="AdaptiveSelect"
          targetComponentName="MuiNativeSelect"
        >
          {content}
        </ReplaceComponentInTheme>
      </ReplaceComponentInTheme>
    </AdaptiveModeContext.Provider>
  );
}
