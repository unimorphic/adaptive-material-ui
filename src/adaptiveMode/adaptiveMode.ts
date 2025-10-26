import { createContext, useContext } from "react";

export type AdaptiveMode = "android" | "desktop" | "ios";

export interface AdaptiveModeProp {
  /** The mode to render the component in. If undefined it chooses a mode based on the current device */
  adaptiveMode?: AdaptiveMode;
}

/**
 * Context that can be used to configure the adaptive mode to use a specific user agent or mode
 */
export const AdaptiveModeContext = createContext<{
  mode?: AdaptiveMode;
  userAgent?: string;
}>({
  mode: undefined,
  userAgent: undefined,
});

function isIOS(userAgent: string) {
  const isIOS13 =
    userAgent.includes("Macintosh") &&
    typeof window !== "undefined" &&
    window.navigator.maxTouchPoints >= 1;

  return /iPad|iPhone|iPod/.test(userAgent) || isIOS13;
}

/**
 * Resolves the current adaptive mode based on the current context & device
 * @param adaptiveMode The adaptive mode component prop
 * @returns The adaptive mode to use and the rest of the props
 */
export function useAdaptiveModeFromProps<T>(
  adaptiveModeProps: AdaptiveModeProp & T,
): [AdaptiveMode, Omit<T, "adaptiveMode">] {
  const { adaptiveMode, ...rest } = adaptiveModeProps;
  return [useAdaptiveMode(adaptiveMode), rest];
}

/**
 * Resolves the current adaptive mode based on the current context & device
 * @param adaptiveMode Adaptive mode override
 * @returns The adaptive mode to use
 */
export function useAdaptiveMode(adaptiveMode?: AdaptiveMode): AdaptiveMode {
  const modeContext = useContext(AdaptiveModeContext);

  if (adaptiveMode) {
    return adaptiveMode;
  }

  if (modeContext.mode) {
    return modeContext.mode;
  }

  const userAgent =
    modeContext.userAgent ??
    (typeof window !== "undefined" ? window.navigator.userAgent : "");

  if (!userAgent) {
    console.warn("AdaptiveMode: No user agent found");
  }

  if (isIOS(userAgent)) {
    return "ios";
  }

  if (/(android)/i.test(userAgent)) {
    return "android";
  }

  return "desktop";
}
