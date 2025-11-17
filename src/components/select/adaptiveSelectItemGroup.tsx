import {
  ListSubheaderClasses,
  listSubheaderClasses,
} from "@mui/material/ListSubheader";
import { StyledComponentProps, useThemeProps } from "@mui/material/styles";
import { lazy, ReactNode, useContext } from "react";
import { AdaptiveModeContext } from "../../adaptiveMode/adaptiveMode";
import { ReplaceComponentInTheme } from "../../shared/replaceComponentInTheme";
import { SelectItemGroupProps } from "./selectProps";

export type AdaptiveSelectItemGroupProps<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
> = SelectItemGroupProps<RootComponent, AdditionalProps> &
  StyledComponentProps<keyof AdaptiveSelectItemGroupClasses>;

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

function AdaptiveSelectItemGroup<
  RootComponent extends React.ElementType = "li",
  AdditionalProps = {},
>(inProps: AdaptiveSelectItemGroupProps<RootComponent, AdditionalProps>) {
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
}

// https://mui.com/material-ui/react-select/#grouping
AdaptiveSelectItemGroup.muiSkipListHighlight = true;

export { AdaptiveSelectItemGroup };
