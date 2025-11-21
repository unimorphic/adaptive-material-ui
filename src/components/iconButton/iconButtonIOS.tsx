import { ExtendButtonBase } from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import {
  IconButtonContained,
  IconButtonContainedProps,
  IconButtonContainedTypeMap,
} from "./iconButtonContained";

/**
 * iOS 26 https://www.sketch.com/s/f63aa308-1f82-498c-8019-530f3b846db9/symbols?g=Buttons
 */
const StyledIconButtonContained = styled(IconButtonContained, {
  name: "AdaptiveIconButton",
  slot: "ios",
})<{ ownerState: IconButtonContainedProps }>(({ ownerState }) => ({
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

export const IconButtonIOS: ExtendButtonBase<IconButtonContainedTypeMap> =
  function <RootComponent extends React.ElementType, AdditionalProps = {}>(
    props: IconButtonContainedProps<RootComponent, AdditionalProps>,
  ) {
    const { className, ...otherProps } = props;

    const composedClasses = composeClasses(
      { ios: ["ios"] },
      (s) => generateUtilityClass("AdaptiveIconButton", s),
      props.classes,
    );

    return (
      <StyledIconButtonContained
        className={clsx(composedClasses.ios, className)}
        disableTouchRipple
        ownerState={props}
        {...otherProps}
      />
    );
  };
