import {
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from "@mui/material/ButtonBase";
import IconButton, {
  IconButtonOwnProps,
  IconButtonProps,
} from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

export interface IconButtonBaseOwnProps {
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
  const backgroundColor =
    ownerState.color === "inherit"
      ? theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[800]
      : !ownerState.color || ownerState.color === "default"
        ? (theme.vars ?? theme).palette.text.primary
        : (theme.vars ?? theme).palette[ownerState.color].main;

  const hoverColor =
    ownerState.color === "inherit"
      ? theme.palette.mode === "light"
        ? theme.palette.grey.A100
        : theme.palette.grey[700]
      : !ownerState.color || ownerState.color === "default"
        ? (theme.vars ?? theme).palette.text.secondary
        : (theme.vars ?? theme).palette[ownerState.color].dark;

  return {
    variants: [
      {
        props: (props) => props.variant === "contained",
        style: {
          color:
            ownerState.color === "inherit"
              ? "inherit"
              : theme.palette.getContrastText(backgroundColor),
          backgroundColor: backgroundColor,

          "&:hover": {
            backgroundColor: hoverColor,
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
