import { ExtendButtonBase } from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import {
  IconButtonBase,
  IconButtonBaseProps,
  IconButtonBaseTypeMap,
} from "./iconButtonBase";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Buttons
 */
const StyledIconButtonBase = styled(IconButtonBase, {
  name: "AdaptiveIconButton",
  slot: "ios",
})<{ ownerState: IconButtonBaseProps }>(({ ownerState }) => ({
  padding:
    ownerState.size === "large"
      ? "13px"
      : ownerState.size === "small"
        ? "3px"
        : "5px",

  "& > *": {
    fontSize: ownerState.size === "small" ? "1.4rem" : undefined,
  },
}));

export const IconButtonIOS: ExtendButtonBase<IconButtonBaseTypeMap> = function <
  RootComponent extends React.ElementType,
  AdditionalProps = {},
>(props: IconButtonBaseProps<RootComponent, AdditionalProps>) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveIconButton", s),
    props.classes,
  );

  return (
    <StyledIconButtonBase
      className={clsx(composedClasses.ios, className)}
      disableTouchRipple
      ownerState={props}
      {...otherProps}
    />
  );
};
