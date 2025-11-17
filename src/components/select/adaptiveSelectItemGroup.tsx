import {
  ListSubheaderClasses,
  listSubheaderClasses,
} from "@mui/material/ListSubheader";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { lazy, ReactNode, useContext } from "react";
import { AdaptiveModeContext } from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
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

// See docs\pages\docs\codeSplitting.md
const SelectItemGroupAndroid = lazy(async () => {
  const { SelectItemGroupAndroid } = await import("../android");
  return { default: SelectItemGroupAndroid };
});
const SelectItemGroupDesktop = lazy(async () => {
  const { SelectItemGroupDesktop } = await import("../desktop");
  return { default: SelectItemGroupDesktop };
});
const SelectItemGroupIOS = lazy(async () => {
  const { SelectItemGroupIOS } = await import("../ios");
  return { default: SelectItemGroupIOS };
});

const AdaptiveSelectItemGroup: OverridableComponent<AdaptiveSelectItemGroupTypeMap> & {
  muiSkipListHighlight?: boolean;
} = function <RootComponent extends React.ElementType, AdditionalProps = {}>(
  inProps: AdaptiveSelectItemGroupProps<RootComponent, AdditionalProps>,
) {
  const props = useThemeProps({
    props: inProps,
    name: "AdaptiveSelectItemGroup",
  });
  const modeContext = useContext(AdaptiveModeContext);

  let content: ReactNode;
  switch (modeContext.mode) {
    case "android":
      content = (
        <SelectItemGroupAndroid<RootComponent, AdditionalProps> {...props} />
      );
      break;
    case "ios":
      content = (
        <SelectItemGroupIOS<RootComponent, AdditionalProps> {...props} />
      );
      break;
    default:
      content = (
        <SelectItemGroupDesktop<RootComponent, AdditionalProps> {...props} />
      );
      break;
  }

  return (
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveSelectItemGroup"
      targetComponentName="MuiListSubheader"
    >
      {content}
    </ReplaceComponentInTheme>
  );
};

// https://mui.com/material-ui/react-select/#grouping
AdaptiveSelectItemGroup.muiSkipListHighlight = true;

export { AdaptiveSelectItemGroup };
