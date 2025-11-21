import { selectClasses, SelectClasses } from "@mui/material/Select";
import {
  styled,
  StyledComponentProps,
  useThemeProps,
} from "@mui/material/styles";
import { lazy, ReactNode } from "react";
import {
  AdaptiveModeContext,
  useAdaptiveMode,
} from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import {
  AdaptiveFilledInput,
  AdaptiveInput,
  AdaptiveOutlinedInput,
} from "../input/adaptiveInput";
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

const styleConfig = { name: "AdaptiveSelect", slot: "Root" };
const StyledAdaptiveInput = styled(AdaptiveInput, styleConfig)();
const StyledAdaptiveOutlinedInput = styled(
  AdaptiveOutlinedInput,
  styleConfig,
)();
const StyledAdaptiveFilledInput = styled(AdaptiveFilledInput, styleConfig)();

export function AdaptiveSelect<Value = unknown>(
  inProps: AdaptiveSelectProps<Value>,
) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSelect" });
  const adaptiveMode = useAdaptiveMode();
  const { input, ...selectProps } = props;

  const inputComponent =
    input ??
    {
      standard: <StyledAdaptiveInput />,
      outlined: <StyledAdaptiveOutlinedInput label={selectProps.label} />,
      filled: <StyledAdaptiveFilledInput />,
    }[selectProps.variant ?? "outlined"];

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = (
        <SelectAndroid<Value> input={inputComponent} {...selectProps} />
      );
      break;
    case "ios":
      content = <SelectIOS<Value> input={inputComponent} {...selectProps} />;
      break;
    default:
      content = (
        <SelectDesktop<Value> input={inputComponent} {...selectProps} />
      );
      break;
  }

  return (
    <AdaptiveModeContext.Provider value={{ mode: adaptiveMode }}>
      <ReplaceComponentInTheme
        sourceComponentName="AdaptiveSelect"
        targetComponentName="MuiSelect"
      >
        {content}
      </ReplaceComponentInTheme>
    </AdaptiveModeContext.Provider>
  );
}
