import Checkbox, {
  checkboxClasses,
  CheckboxProps,
} from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import {
  IosCheckedIcon,
  IosIndeterminateIcon,
  IosUncheckedIcon,
} from "../../shared/ios/iosIcons";

const StyledCheckbox = styled(Checkbox, {
  name: "AdaptiveCheckbox",
  slot: "ios",
})<{ ownerState: CheckboxProps }>(({ ownerState, theme }) => {
  const currentColor =
    ownerState.color === "default"
      ? (theme.vars ?? theme).palette.text.secondary
      : (theme.vars ?? theme).palette[ownerState.color ?? "primary"].main;

  return {
    [`& .${svgIconClasses.root}`]: {
      border: "1px solid currentColor",
      borderRadius: "50%",
      fontSize: ownerState.size === "small" ? "21px" : "24px",
      height: "0.92em",
      width: "0.92em",

      "& svg": {
        display: "block",
      },
    },
    [`&.${checkboxClasses.checked}, &.${checkboxClasses.indeterminate}`]: {
      [`.${svgIconClasses.root}`]: {
        backgroundColor: "currentColor",
        borderColor: "transparent",

        "& svg": {
          color: theme.palette.getContrastText(currentColor),
        },
      },
    },
  };
});

export function CheckboxIOS(props: CheckboxProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveCheckbox", s),
    props.classes,
  );

  return (
    <StyledCheckbox
      checkedIcon={<IosCheckedIcon />}
      className={clsx(composedClasses.ios, className)}
      disableTouchRipple
      icon={<IosUncheckedIcon />}
      indeterminateIcon={<IosIndeterminateIcon />}
      ownerState={props}
      {...otherProps}
    />
  );
}
