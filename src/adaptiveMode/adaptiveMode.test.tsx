import { createTheme, ThemeProvider } from "@mui/material/styles";
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { AdaptiveMode, AdaptiveModeContext } from "./adaptiveMode";
import { adaptiveModeToString } from "./testUtils/adaptiveModeToString";
import { RenderAdaptiveMode } from "./testUtils/renderAdaptiveMode";

afterEach(() => {
  cleanup();
});

test("Theme", () => {
  let theme = createTheme({
    components: {
      AdaptiveSwitch: { defaultProps: { adaptiveMode: AdaptiveMode.ios } },
    },
  });
  let result = render(
    <ThemeProvider theme={theme}>
      <RenderAdaptiveMode />
    </ThemeProvider>,
  );

  let adaptiveMode = result.getByText(adaptiveModeToString(AdaptiveMode.ios));
  expect(adaptiveMode).toBeDefined();

  theme = createTheme({
    components: {
      AdaptiveSwitch: { defaultProps: { adaptiveMode: AdaptiveMode.android } },
    },
  });
  result = render(
    <ThemeProvider theme={theme}>
      <RenderAdaptiveMode />
    </ThemeProvider>,
  );

  adaptiveMode = result.getByText(adaptiveModeToString(AdaptiveMode.android));
  expect(adaptiveMode).toBeDefined();
});

test("Context - Mode", () => {
  let result = render(
    <AdaptiveModeContext.Provider value={{ mode: AdaptiveMode.ios }}>
      <RenderAdaptiveMode />
    </AdaptiveModeContext.Provider>,
  );

  let adaptiveMode = result.getByText(adaptiveModeToString(AdaptiveMode.ios));
  expect(adaptiveMode).toBeDefined();

  result = render(
    <AdaptiveModeContext.Provider value={{ mode: AdaptiveMode.android }}>
      <RenderAdaptiveMode />
    </AdaptiveModeContext.Provider>,
  );

  adaptiveMode = result.getByText(adaptiveModeToString(AdaptiveMode.android));
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

  let adaptiveMode = result.getByText(adaptiveModeToString(AdaptiveMode.ios));
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

  adaptiveMode = result.getByText(adaptiveModeToString(AdaptiveMode.android));
  expect(adaptiveMode).toBeDefined();
});

test("Prop", () => {
  let result = render(<RenderAdaptiveMode adaptiveMode={AdaptiveMode.ios} />);

  let adaptiveMode = result.getByText(adaptiveModeToString(AdaptiveMode.ios));
  expect(adaptiveMode).toBeDefined();

  result = render(<RenderAdaptiveMode adaptiveMode={AdaptiveMode.android} />);

  adaptiveMode = result.getByText(adaptiveModeToString(AdaptiveMode.android));
  expect(adaptiveMode).toBeDefined();
});
