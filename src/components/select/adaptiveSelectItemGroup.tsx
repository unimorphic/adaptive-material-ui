import ListSubheader, {
  ListSubheaderClasses,
  listSubheaderClasses,
} from "@mui/material/ListSubheader";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { useContext } from "react";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { SelectContext, SelectItemGroupNative } from "./selectBase";
import { SelectItemGroupOwnProps, SelectItemGroupProps } from "./selectProps";

type AdaptiveSelectItemGroupOwnProps = StyledComponentProps<
  keyof AdaptiveSelectItemGroupClasses
>;

interface AdaptiveSelectItemGroupTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "li",
> {
  props: AdditionalProps &
    SelectItemGroupOwnProps &
    AdaptiveSelectItemGroupOwnProps;
  defaultComponent: RootComponent;
}

export type AdaptiveSelectItemGroupProps<
  RootComponent extends
    React.ElementType = AdaptiveSelectItemGroupTypeMap["defaultComponent"],
  AdditionalProps = {},
> = SelectItemGroupProps<RootComponent, AdditionalProps> &
  AdaptiveSelectItemGroupOwnProps;

export interface AdaptiveSelectItemGroupClasses extends ListSubheaderClasses {}

export const adaptiveSelectItemGroupClasses = listSubheaderClasses;

const AdaptiveSelectItemGroup: OverridableComponent<AdaptiveSelectItemGroupTypeMap> & {
  muiSkipListHighlight?: boolean;
} = function <RootComponent extends React.ElementType, AdditionalProps = {}>(
  inProps: AdaptiveSelectItemGroupProps<RootComponent, AdditionalProps>,
) {
  const props = useThemeProps({
    props: inProps,
    name: "AdaptiveSelectItemGroup",
  });
  const { children, label, ...otherProps } = props;
  const isNative = useContext(SelectContext).native;

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveSelectItemGroup"
      targetComponentName="MuiListSubheader"
    >
      {isNative ? (
        <SelectItemGroupNative {...props} />
      ) : (
        <ListSubheader {...otherProps}>{label}</ListSubheader>
      )}
    </ReplaceComponentInTheme>
  );
};

// https://mui.com/material-ui/react-select/#grouping
AdaptiveSelectItemGroup.muiSkipListHighlight = true;

export { AdaptiveSelectItemGroup };
