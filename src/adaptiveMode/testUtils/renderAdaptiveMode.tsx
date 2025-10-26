import { useThemeProps } from "@mui/material/styles";
import { AdaptiveModeProp, useAdaptiveMode } from "../adaptiveMode";

export function RenderAdaptiveMode(inProps: AdaptiveModeProp) {
  const props = useThemeProps({ props: inProps, name: "AdaptiveSwitch" });
  return useAdaptiveMode(props.adaptiveMode);
}
