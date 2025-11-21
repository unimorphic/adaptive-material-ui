import Button, { ButtonOwnProps, ButtonProps } from "@mui/material/Button";
import {
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from "@mui/material/ButtonBase";
import { buttonGroupClasses } from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";

export interface ButtonRoundOwnProps {
  /** Increases the border radius to make the button corners appear rounded */
  round?: boolean;
}

export type ButtonRoundTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = "button",
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & ButtonOwnProps & ButtonRoundOwnProps;
  defaultComponent: RootComponent;
}>;

export type ButtonRoundProps<
  RootComponent extends
    React.ElementType = ButtonRoundTypeMap["defaultComponent"],
  AdditionalProps = {},
> = ButtonProps<RootComponent, AdditionalProps> & ButtonRoundOwnProps;

const StyledButton = styled(Button)<{
  ownerState: ButtonRoundProps;
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

export const ButtonRound: ExtendButtonBase<ButtonRoundTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: ButtonRoundProps<RootComponent, AdditionalProps>) {
  const { round, ...otherProps } = props;

  return <StyledButton ownerState={props} {...otherProps} />;
};
