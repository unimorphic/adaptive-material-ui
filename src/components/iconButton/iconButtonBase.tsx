import {
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from "@mui/material/ButtonBase";
import IconButton, {
  IconButtonOwnProps,
  IconButtonProps,
  IconButtonPropsSizeOverrides,
} from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { OverridableStringUnion } from "@mui/types";

export interface IconButtonBaseOwnProps {
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<
    "small" | "medium" | "large" | "x-large",
    IconButtonPropsSizeOverrides
  >;

  /** Adds a background to the button when set to `contained` */
  variant?: "contained" | "default";
}

export type IconButtonBaseTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & IconButtonOwnProps & IconButtonBaseOwnProps;
  defaultComponent: RootComponent;
}>;

export type IconButtonBaseProps<
  RootComponent extends
    React.ElementType = IconButtonBaseTypeMap["defaultComponent"],
  AdditionalProps = {},
> = IconButtonProps<RootComponent, AdditionalProps> & IconButtonBaseOwnProps;

const StyledIconButton = styled(IconButton)<{
  ownerState: IconButtonBaseProps;
}>(({ ownerState, theme }) => {
  const sizeInfoMap = {
    "x-large": { font: 32, padding: 28 },
  };
  const sizeInfo =
    ownerState.size && ownerState.size in sizeInfoMap
      ? sizeInfoMap[ownerState.size as keyof typeof sizeInfoMap]
      : undefined;

  const containedColors =
    ownerState.color === "inherit"
      ? theme.palette.mode === "light"
        ? {
            contrastText: "inherit",
            dark: theme.palette.grey.A100,
            main: theme.palette.grey[300],
          }
        : {
            contrastText: "inherit",
            dark: theme.palette.grey[700],
            main: theme.palette.grey[800],
          }
      : !ownerState.color || ownerState.color === "default"
        ? {
            contrastText: (theme.vars ?? theme).palette.background.default,
            dark: (theme.vars ?? theme).palette.text.secondary,
            main: (theme.vars ?? theme).palette.text.primary,
          }
        : (theme.vars ?? theme).palette[ownerState.color];

  return {
    padding: sizeInfo?.padding,

    "& > *": {
      fontSize: sizeInfo ? theme.typography.pxToRem(sizeInfo.font) : undefined,
    },

    variants: [
      {
        props: (props) => props.variant === "contained",
        style: {
          backgroundColor: containedColors.main,
          color: containedColors.contrastText,

          "&:hover": {
            backgroundColor: containedColors.dark,
          },
        },
      },
    ],
  };
});

export const IconButtonBase: ExtendButtonBase<IconButtonBaseTypeMap> =
  function <RootComponent extends React.ElementType, AdditionalProps = {}>(
    props: IconButtonBaseProps<RootComponent, AdditionalProps>,
  ) {
    const { variant, ...otherProps } = props;

    return <StyledIconButton ownerState={props} {...otherProps} />;
  };
