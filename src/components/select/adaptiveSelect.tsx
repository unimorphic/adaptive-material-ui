import { menuItemClasses, MenuItemClasses } from "@mui/material/MenuItem";
import {
  selectClasses,
  SelectClasses,
  SelectProps,
} from "@mui/material/Select";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { lazy, ReactNode, useContext } from "react";
import {
  AdaptiveModeContext,
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
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

  let content: ReactNode;
  switch (adaptiveMode) {
    case "android":
      content = <SelectAndroid<Value> {...otherProps} />;
      break;
    case "ios":
      content = <SelectIOS<Value> {...otherProps} />;
      break;
    default:
      content = <SelectDesktop<Value> {...otherProps} />;
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
