import IconButton, {
  IconButtonProps,
  IconButtonTypeMap,
} from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

export type IconButtonContainedProps<
  RootComponent extends
    React.ElementType = IconButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
> = IconButtonProps<RootComponent, AdditionalProps> & {
  /** Adds a background to the button when set to `contained` */
  variant?: "contained" | "default";
};

const StyledIconButton = styled(IconButton)<{
  ownerState: IconButtonContainedProps;
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

export function IconButtonContained<
  RootComponent extends
    React.ElementType = IconButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
>(props: IconButtonContainedProps<RootComponent, AdditionalProps>) {
  const { variant, ...otherProps } = props;

  return <StyledIconButton ownerState={props} {...otherProps} />;
}
