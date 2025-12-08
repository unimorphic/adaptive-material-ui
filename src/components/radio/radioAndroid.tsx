import { buttonBaseClasses } from "@mui/material/ButtonBase";
import Radio, { RadioProps } from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { materialDesign } from "../../shared/android/materialDesign";

const StyledRadio = styled(Radio, {
  name: "AdaptiveRadio",
  slot: "android",
})<{ ownerState: RadioProps }>(({ ownerState, theme }) => ({
  [`& .${svgIconClasses.root}:first-of-type`]: {
    borderRadius: "50%",
    ...materialDesign.focusRipple(theme, ownerState),
  },
  [`&.${buttonBaseClasses.focusVisible} .${svgIconClasses.root}:first-of-type`]:
    materialDesign.focusRippleVisible(theme, ownerState),
}));

export function RadioAndroid(props: RadioProps) {
  const { className, disableFocusRipple, ...otherProps } = props;
  const ownerState = materialDesign.useButtonBaseRippleProps(props);

  const composedClasses = composeClasses(
    { android: ["android"] },
    (s) => generateUtilityClass("AdaptiveRadio", s),
    props.classes,
  );

  return (
    <StyledRadio
      className={clsx(composedClasses.android, className)}
      disableFocusRipple
      ownerState={ownerState}
      {...otherProps}
    />
  );
}
