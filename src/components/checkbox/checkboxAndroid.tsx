import { buttonBaseClasses } from "@mui/material/ButtonBase";
import Checkbox, {
  checkboxClasses,
  CheckboxProps,
} from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { materialDesign } from "../../shared/android/materialDesign";

function CheckedIcon() {
  return (
    <div className={svgIconClasses.root}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 18 18"
      >
        <rect className="mark short" fill="currentColor"></rect>
        <rect className="mark long" fill="currentColor"></rect>
      </svg>
    </div>
  );
}

function UncheckedIcon() {
  return (
    <div className={svgIconClasses.root}>
      <div />
    </div>
  );
}

/**
 * MD3 https://m3.material.io/components/checkbox
 * https://material-web.dev/components/checkbox/
 */
const StyledCheckbox = styled(Checkbox, {
  name: "AdaptiveCheckbox",
  slot: "android",
})<{ ownerState: CheckboxProps }>(({ ownerState, theme }) => {
  const currentColor =
    ownerState.color === "default"
      ? (theme.vars ?? theme).palette.text.secondary
      : (theme.vars ?? theme).palette[ownerState.color ?? "primary"].main;
  const fontSize = { small: "1.25rem", medium: "1.5rem", large: "2.1875rem" }[
    ownerState.size ?? "medium"
  ];

  return {
    ...materialDesign.focusRipple(theme, ownerState),

    [`&.${buttonBaseClasses.focusVisible}`]: materialDesign.focusRippleVisible(
      theme,
      ownerState,
    ),
    [`& .${svgIconClasses.root}`]: {
      fontSize: fontSize,

      "& svg": {
        display: "block",
      },
    },
    [`&:not(.${checkboxClasses.checked}, .${checkboxClasses.indeterminate}) .${svgIconClasses.root}`]:
      {
        height: "1em",
        padding: "0.125em",
        width: "1em",

        "& > div": {
          border: "2px solid currentColor",
          borderRadius: 2,
          height: "100%",
        },
      },
    [`&.${checkboxClasses.checked} .${svgIconClasses.root}`]: {
      height: "1em",
      padding: "0.125em",
      width: "1em",

      "& svg": {
        backgroundColor: "currentColor",
        borderRadius: 2,

        "& .mark": {
          color: theme.palette.getContrastText(currentColor),
          transform: "scaleY(-1) translate(7px, -14px) rotate(45deg)",

          "&.short": {
            height: 5.65685,
            width: 2,
          },
          "&.long": {
            height: 2,
            width: 11.3137,
          },
        },
      },
    },
  };
});

export function CheckboxAndroid(props: CheckboxProps) {
  const { className, disableFocusRipple, ...otherProps } = props;
  const ownerState = materialDesign.useButtonBaseRippleProps(props);

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveCheckbox", s),
    props.classes,
  );

  return (
    <StyledCheckbox
      checkedIcon={<CheckedIcon />}
      className={clsx(composedClasses.android, className)}
      disableFocusRipple
      icon={<UncheckedIcon />}
      ownerState={ownerState}
      {...otherProps}
    />
  );
}
