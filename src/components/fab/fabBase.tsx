import {
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from "@mui/material/ButtonBase";
import Fab, {
  FabOwnProps,
  FabProps,
  FabPropsSizeOverrides,
} from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { OverridableStringUnion } from "@mui/types";
import { slotShouldForwardProp } from "../../shared/slotShouldForwardProp";

export interface FabBaseOwnProps {
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'large'
   */
  size?: OverridableStringUnion<
    "small" | "medium" | "large" | "x-large" | "xx-large",
    FabPropsSizeOverrides
  >;
}

export type FabBaseTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & FabOwnProps & FabBaseOwnProps;
  defaultComponent: RootComponent;
}>;

export type FabBaseProps<
  RootComponent extends React.ElementType = FabBaseTypeMap["defaultComponent"],
  AdditionalProps = {},
> = FabProps<RootComponent, AdditionalProps> & FabBaseOwnProps;

const StyledFab = styled(Fab, {
  name: "AdaptiveFab",
  slot: "root",
  shouldForwardProp: slotShouldForwardProp,
})<{ ownerState: FabProps }>(({ ownerState }) => {
  const infoBySize = {
    "x-large": { width: 80, extendedHeight: 72, icon: "1.75rem" },
    "xx-large": { width: 96, extendedHeight: 88, icon: "2.25rem" },
  };
  const sizeInfo =
    ownerState.size && ownerState.size in infoBySize
      ? infoBySize[ownerState.size as keyof typeof infoBySize]
      : undefined;

  return {
    borderRadius:
      ownerState.variant === "extended" && sizeInfo
        ? sizeInfo.extendedHeight / 2
        : undefined,
    height:
      ownerState.variant === "extended"
        ? sizeInfo?.extendedHeight
        : sizeInfo?.width,
    width: ownerState.variant === "extended" ? undefined : sizeInfo?.width,

    [`& .${svgIconClasses.root}`]: {
      fontSize: sizeInfo?.icon,
    },
  };
});

export const FabBase: ExtendButtonBase<FabBaseTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: FabBaseProps<RootComponent, AdditionalProps>) {
  return <StyledFab ownerState={props} {...props} />;
};
