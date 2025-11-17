import {
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from "@mui/material/ButtonBase";
import { menuItemClasses, MenuItemClasses } from "@mui/material/MenuItem";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { lazy, ReactNode, useContext } from "react";
import { AdaptiveModeContext } from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { SelectItemOwnProps, SelectItemProps } from "./selectProps";

type AdaptiveSelectItemOwnProps = StyledComponentProps<
  keyof AdaptiveSelectItemClasses
>;

type AdaptiveSelectItemTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "li",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & SelectItemOwnProps & AdaptiveSelectItemOwnProps;
  defaultComponent: RootComponent;
}>;

export type AdaptiveSelectItemProps<
  RootComponent extends
    React.ElementType = AdaptiveSelectItemTypeMap["defaultComponent"],
  AdditionalProps = {},
> = SelectItemProps<RootComponent, AdditionalProps> &
  AdaptiveSelectItemOwnProps;

export interface AdaptiveSelectItemClasses extends MenuItemClasses {}

export const adaptiveSelectItemClasses = menuItemClasses;

// See docs\pages\docs\codeSplitting.md
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

export const AdaptiveSelectItem: ExtendButtonBase<AdaptiveSelectItemTypeMap> =
  function <RootComponent extends React.ElementType, AdditionalProps = {}>(
    inProps: AdaptiveSelectItemProps<RootComponent, AdditionalProps>,
  ) {
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
  };
