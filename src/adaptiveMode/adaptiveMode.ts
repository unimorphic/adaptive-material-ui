export enum AdaptiveMode {
  android = 1,
  desktop = 2,
  ios = 3,
}

export interface AdaptiveModeProp {
  /** The mode to render the component in. If undefined it chooses a mode based on the current device */
  adaptiveMode?: AdaptiveMode;
}

let adaptiveModeConfig = {
  mode: undefined as AdaptiveMode | undefined,
  userAgent: undefined as string | undefined,
};

function isIOS(userAgent: string) {
  const isIOS13 =
    userAgent.includes("Macintosh") && window.navigator.maxTouchPoints >= 1;

  return /iPad|iPhone|iPod/.test(userAgent) || isIOS13;
}

/**
 * Configures adaptive mode to use a specific user agent
 * @param userAgent The user agent string used to determine the adaptive mode
 */
export function configureAdaptiveMode(userAgent: string): void;
/**
 * Configures adaptive mode to always use a specific mode
 * @param mode The adaptive mode to use
 */
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function configureAdaptiveMode(mode: AdaptiveMode): void;
export function configureAdaptiveMode(
  userAgentOrMode: string | AdaptiveMode,
): void {
  if (typeof userAgentOrMode === "string") {
    adaptiveModeConfig = { userAgent: userAgentOrMode, mode: undefined };
  } else {
    adaptiveModeConfig = { userAgent: undefined, mode: userAgentOrMode };
  }
}

/**
 * Resolves the current adaptive mode based on the current config & device
 * @param adaptiveMode The adaptive mode component prop
 * @returns The adaptive mode to use and the rest of the props
 */
export function resolveAdaptiveModeFromProps<T>(
  adaptiveModeProps: AdaptiveModeProp & T,
): [AdaptiveMode, Omit<T, "adaptiveMode">] {
  const { adaptiveMode, ...rest } = adaptiveModeProps;
  return [resolveAdaptiveMode(adaptiveMode), rest];
}

/**
 * Resolves the current adaptive mode based on the current config & device
 * @param adaptiveMode Adaptive mode override
 * @returns The adaptive mode to use
 */
export function resolveAdaptiveMode(
  adaptiveMode?: AdaptiveMode,
): AdaptiveMode {
  if (adaptiveMode) {
    return adaptiveMode;
  }

  if (adaptiveModeConfig.mode) {
    return adaptiveModeConfig.mode;
  }

  const userAgent = adaptiveModeConfig.userAgent ?? window.navigator.userAgent;

  if (isIOS(userAgent)) {
    return AdaptiveMode.ios;
  }

  if (/(android)/i.test(userAgent)) {
    return AdaptiveMode.android;
  }

  return AdaptiveMode.desktop;
}
