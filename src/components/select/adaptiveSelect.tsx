import { menuItemClasses, MenuItemClasses } from "@mui/material/MenuItem";
import {
  selectClasses,
  SelectClasses,
  SelectProps,
} from "@mui/material/Select";
import {
  styled,
  StyledComponentProps,
  useThemeProps,
} from "@mui/material/styles";
import { lazy, ReactNode, useContext } from "react";
import {
  AdaptiveModeContext,
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import {
  AdaptiveFilledInput,
  AdaptiveInput,
  AdaptiveOutlinedInput,
} from "../input/adaptiveInput";
import { SelectItemProps } from "./selectItemProps";

export type AdaptiveSelectProps<Value = unknown> = SelectProps<Value> &
  StyledComponentProps<keyof AdaptiveSelectClasses> &
  AdaptiveModeProp;

export interface AdaptiveSelectClasses extends SelectClasses {}

export const adaptiveSelectClasses = selectClasses;

export type AdaptiveSelectItemProps<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
> = SelectItemProps<RootComponent, AdditionalProps> &
  StyledComponentProps<keyof AdaptiveSelectItemClasses>;

export interface AdaptiveSelectItemClasses extends MenuItemClasses {}

export const adaptiveSelectItemClasses = menuItemClasses;

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

const SelectItemAndroid = lazy(async () => {
  const { SelectItemAndroid } = await import("../android");
  return { default: SelectItemAndroid };
});
const SelectItemDesktop = lazy(async () => {
  const { SelectItemDesktop } = await import("../desktop");
  return { default: SelectItemDesktop };
});
const SelectItemIOS = lazy(async () => {
  const { SelectItemIOS } = await import("../ios");
  return { default: SelectItemIOS };
});

const styleConfig = { name: "AdaptiveSelect", slot: "Root" };
const StyledAdaptiveInput = styled(AdaptiveInput, styleConfig)();
const StyledAdaptiveOutlinedInput = styled(
  AdaptiveOutlinedInput,
  styleConfig,
)();
const StyledAdaptiveFilledInput = styled(AdaptiveFilledInput, styleConfig)();

export function AdaptiveSelectItem<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
>(inProps: AdaptiveSelectItemProps<RootComponent, AdditionalProps>) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSelectItem" });
  const modeContext = useContext(AdaptiveModeContext);

  let content: ReactNode;
  switch (modeContext.mode) {
    case "android":
      content = (
        <SelectItemAndroid<RootComponent, AdditionalProps> {...props} />
      );
      break;
    case "ios":
      content = <SelectItemIOS<RootComponent, AdditionalProps> {...props} />;
      break;
    default:
      content = (
        <SelectItemDesktop<RootComponent, AdditionalProps> {...props} />
      );
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveSelectItem"
      targetComponentName="MuiMenuItem"
    >
      {content}
    </ReplaceComponentInTheme>
  );
}

export function AdaptiveSelect<Value = unknown>(
  inProps: AdaptiveSelectProps<Value>,
) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSelect" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);
  const { input, ...selectProps } = otherProps;

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
