import {
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from "@mui/material/ButtonBase";
import MenuItem, {
  menuItemClasses,
  MenuItemClasses,
} from "@mui/material/MenuItem";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { useContext } from "react";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { SelectContext, SelectItemNative } from "./selectBase";
import { SelectItemOwnProps, SelectItemProps } from "./selectProps";

export type AdaptiveSelectItemOwnProps = StyledComponentProps<
  keyof AdaptiveSelectItemClasses
>;

export type AdaptiveSelectItemTypeMap<
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

export const AdaptiveSelectItem: ExtendButtonBase<AdaptiveSelectItemTypeMap> =
  function <RootComponent extends React.ElementType, AdditionalProps = {}>(
    inProps: AdaptiveSelectItemProps<RootComponent, AdditionalProps>,
  ) {
    const props = useThemeProps({ props: inProps, name: "AdaptiveSelectItem" });
    const isNative = useContext(SelectContext).native;

    return (
      <ReplaceComponentInTheme
        sourceComponentName="AdaptiveSelectItem"
        targetComponentName="MuiMenuItem"
      >
        {isNative ? <SelectItemNative {...props} /> : <MenuItem {...props} />}
      </ReplaceComponentInTheme>
    );
  };
