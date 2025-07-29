import { AdaptiveMode } from "../adaptiveMode";

export function adaptiveModeToString(mode: AdaptiveMode): string {
  return `[AdaptiveMode_${mode.toString()}]`;
}
