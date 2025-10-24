import { SelectClassKey, SelectProps } from "@mui/material/Select";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { lazy, ReactNode, useContext } from "react";
import {
  AdaptiveMode,
  AdaptiveModeContext,
  AdaptiveModeProp,
  useAdaptiveModeFromProps,
} from "../../adaptiveMode/adaptiveMode";
import SelectItemProps, { DefaultAdditionalProps } from "./selectItemProps";

export type AdaptiveSelectProps<Value = unknown> = SelectProps<Value> &
  StyledComponentProps<SelectClassKey | AdaptiveSelectKey> &
  AdaptiveModeProp;

export interface AdaptiveSelectClasses {
  /** Styles applied to the iOS mode */
  ios: string;
}
export type AdaptiveSelectKey = keyof AdaptiveSelectClasses;

export type AdaptiveSelectItemProps<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = DefaultAdditionalProps,
> = SelectItemProps<RootComponent, AdditionalProps> & {
  classes?: Partial<AdaptiveSelectItemClasses>;
};
export interface AdaptiveSelectItemClasses {
  /** Styles applied to the iOS mode */
  ios: string;
}
export type AdaptiveSelectItemKey = keyof AdaptiveSelectItemClasses;

// See docs\pages\docs\theCodes\codeSplitting.md
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
  AdditionalProps = DefaultAdditionalProps,
>(inProps: AdaptiveSelectItemProps<RootComponent, AdditionalProps>) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSelectItem" });
  const modeContext = useContext(AdaptiveModeContext);

  switch (modeContext.mode) {
    case AdaptiveMode.android:
      return <SelectItemAndroid<RootComponent, AdditionalProps> {...props} />;
    case AdaptiveMode.ios:
      return <SelectItemIOS<RootComponent, AdditionalProps> {...props} />;
    default:
      return <SelectItemDesktop<RootComponent, AdditionalProps> {...props} />;
  }
}

export default function AdaptiveSelect<Value = unknown>(
  inProps: AdaptiveSelectProps<Value>,
) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSelect" });
  const [adaptiveMode, otherProps] = useAdaptiveModeFromProps(props);

  let content: ReactNode;
  switch (adaptiveMode) {
    case AdaptiveMode.android:
      content = <SelectAndroid<Value> {...otherProps} />;
      break;
    case AdaptiveMode.ios:
      content = <SelectIOS<Value> {...otherProps} />;
      break;
    default:
      content = <SelectDesktop<Value> {...otherProps} />;
      break;
  }

  return (
    <AdaptiveModeContext.Provider value={{ mode: adaptiveMode }}>
      {content}
    </AdaptiveModeContext.Provider>
  );
}
