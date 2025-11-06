import Button, { ButtonProps, ButtonTypeMap } from "@mui/material/Button";
import { buttonGroupClasses } from "@mui/material/ButtonGroup";
import { styled } from "@mui/material/styles";

export type ButtonRoundProps<
  RootComponent extends React.ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
> = Omit<ButtonProps<RootComponent, AdditionalProps>, "component"> & {
  component?: RootComponent;

  /** Increases the border radius to make the button corners appear rounded */
  round?: boolean;
};

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
})) as unknown as typeof Button;

export function ButtonRound<
  RootComponent extends React.ElementType = ButtonTypeMap["defaultComponent"],
  AdditionalProps = {},
>(props: ButtonRoundProps<RootComponent, AdditionalProps>) {
  const { round, ...otherProps } = props;

  return <StyledButton ownerState={props} {...otherProps} />;
}
