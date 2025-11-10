import Radio, { RadioProps } from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import composeClasses from "@mui/utils/composeClasses";
import generateUtilityClass from "@mui/utils/generateUtilityClass";
import { clsx } from "clsx";
import { IosCheckedIcon, IosUncheckedIcon } from "../../shared/ios/iosIcons";

const StyledRadio = styled(Radio, {
  name: "AdaptiveRadio",
  slot: "ios",
})<{ ownerState: RadioProps }>(({ ownerState }) => ({
  [`& .${svgIconClasses.root}`]: {
    border: "1px solid currentColor",
    borderRadius: "50%",
    fontSize: ownerState.size === "small" ? "21px" : "24px",
    height: "0.92em",
    width: "0.92em",
  },
}));

export function RadioIOS(props: RadioProps) {
  const { className, ...otherProps } = props;

  const composedClasses = composeClasses(
    { ios: ["ios"] },
    (s) => generateUtilityClass("AdaptiveRadio", s),
    props.classes,
  );

  return (
    <StyledRadio
      checkedIcon={<IosCheckedIcon />}
      className={clsx(composedClasses.ios, className)}
      disableTouchRipple
      icon={<IosUncheckedIcon />}
      ownerState={props}
      {...otherProps}
    />
  );
}
