import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { AdaptiveModeContext } from "./adaptiveMode";
import { RenderAdaptiveMode } from "./testUtils/renderAdaptiveMode";

afterEach(() => {
  cleanup();
});

test("Context - Mode", () => {
  let result = render(
    <AdaptiveModeContext.Provider value={{ mode: "ios" }}>
      <RenderAdaptiveMode />
    </AdaptiveModeContext.Provider>,
  );

  let adaptiveMode = result.getByText("ios");
  expect(adaptiveMode).toBeDefined();

  result = render(
    <AdaptiveModeContext.Provider value={{ mode: "android" }}>
      <RenderAdaptiveMode />
    </AdaptiveModeContext.Provider>,
  );

  adaptiveMode = result.getByText("android");
  expect(adaptiveMode).toBeDefined();
});

test("Context - User Agent", () => {
  let result = render(
    <AdaptiveModeContext.Provider
      value={{
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1",
      }}
    >
      <RenderAdaptiveMode />
    </AdaptiveModeContext.Provider>,
  );

  let adaptiveMode = result.getByText("ios");
  expect(adaptiveMode).toBeDefined();

  result = render(
    <AdaptiveModeContext.Provider
      value={{
        userAgent:
          "Mozilla/5.0 (Linux; Android 16) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.7204.158 Mobile Safari/537.36",
      }}
    >
      <RenderAdaptiveMode />
    </AdaptiveModeContext.Provider>,
  );

  adaptiveMode = result.getByText("android");
  expect(adaptiveMode).toBeDefined();
});
