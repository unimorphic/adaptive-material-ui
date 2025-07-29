import { useThemeProps } from "@mui/material/styles";
import { AdaptiveModeProp, useAdaptiveMode } from "../adaptiveMode";
import { adaptiveModeToString } from "./adaptiveModeToString";

export function RenderAdaptiveMode(inProps: AdaptiveModeProp) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSwitch" });
  return adaptiveModeToString(useAdaptiveMode(props.adaptiveMode));
}
