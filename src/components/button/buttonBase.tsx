import Button, {
  buttonClasses,
  ButtonOwnProps,
  ButtonProps,
  ButtonPropsSizeOverrides,
} from "@mui/material/Button";
import {
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from "@mui/material/ButtonBase";
import { buttonGroupClasses } from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";
import { OverridableStringUnion } from "@mui/types";

export interface ButtonBaseOwnProps {
  /** Increases the border radius to make the button corners appear rounded */
  round?: boolean;

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<
    "small" | "medium" | "large" | "x-large",
    ButtonPropsSizeOverrides
  >;
}

export type ButtonBaseTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & ButtonOwnProps & ButtonBaseOwnProps;
  defaultComponent: RootComponent;
}>;

export type ButtonBaseProps<
  RootComponent extends
    React.ElementType = ButtonBaseTypeMap["defaultComponent"],
  AdditionalProps = {},
> = ButtonProps<RootComponent, AdditionalProps> & ButtonBaseOwnProps;

const StyledButton = styled(Button)<{
  ownerState: ButtonBaseProps;
}>(({ ownerState, theme }) => {
  const sizeInfoMap = {
    "x-large": { icon: 38, font: 23, padding: "24px 46px" },
  };
  const sizeInfo =
    ownerState.size && ownerState.size in sizeInfoMap
      ? sizeInfoMap[ownerState.size as keyof typeof sizeInfoMap]
      : undefined;

  return {
    fontSize: sizeInfo ? theme.typography.pxToRem(sizeInfo.font) : undefined,
    padding: sizeInfo?.padding,

    [`& .${buttonClasses.startIcon} > *:nth-of-type(1), & .${buttonClasses.endIcon} > *:nth-of-type(1)`]:
      {
        fontSize: sizeInfo?.icon,
      },

    variants: [
      {
        props: (props) => props.round === true,
        style: {
          borderRadius: "2em",

          [`.${buttonGroupClasses.root}:has(&)`]: {
            borderRadius: "2em",
          },
        },
      },
    ],
  };
});

export const ButtonBase: ExtendButtonBase<ButtonBaseTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: ButtonBaseProps<RootComponent, AdditionalProps>) {
  const { round, ...otherProps } = props;

  return <StyledButton ownerState={props} {...otherProps} />;
};
