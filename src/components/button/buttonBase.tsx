import Button, { ButtonOwnProps, ButtonProps } from "@mui/material/Button";
import {
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from "@mui/material/ButtonBase";
import { buttonGroupClasses } from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";

export interface ButtonBaseOwnProps {
  /** Increases the border radius to make the button corners appear rounded */
  round?: boolean;
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
}>(() => ({
  variants: [
    {
      props: (props) => props.round === true,
      style: {
        borderRadius: 1000,

        [`.${buttonGroupClasses.root}:has(&)`]: {
          borderRadius: 1000,
        },
      },
    },
  ],
}));

export const ButtonBase: ExtendButtonBase<ButtonBaseTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: ButtonBaseProps<RootComponent, AdditionalProps>) {
  const { round, ...otherProps } = props;

  return <StyledButton ownerState={props} {...otherProps} />;
};
