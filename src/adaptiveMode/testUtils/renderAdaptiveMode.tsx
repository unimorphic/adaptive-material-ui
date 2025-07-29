import { useThemeProps } from "@mui/material/styles";
import { AdaptiveModeProp, resolveAdaptiveMode } from "../adaptiveMode";
import { adaptiveModeToString } from "./adaptiveModeToString";

export function RenderAdaptiveMode(inProps: AdaptiveModeProp) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSwitch" });
  return adaptiveModeToString(resolveAdaptiveMode(props.adaptiveMode));
}
