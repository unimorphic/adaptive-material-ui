import { createTheme, ThemeProvider } from "@mui/material/styles";
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { AdaptiveMode, configureAdaptiveMode, resolveAdaptiveMode } from "./adaptiveMode";
import { adaptiveModeToString } from "./testUtils/adaptiveModeToString";
import { RenderAdaptiveMode } from "./testUtils/renderAdaptiveMode";

afterEach(() => {
  configureAdaptiveMode("");
  cleanup();
});

test("Theme", () => {
  const theme = createTheme({
    components: {
      AdaptiveSwitch: {
        defaultProps: { adaptiveMode: AdaptiveMode.ios },
      },
    },
  });

  const result = render(
    <ThemeProvider theme={theme}>
      <RenderAdaptiveMode />
    </ThemeProvider>,
  );

  const adaptiveMode = result.getByText(adaptiveModeToString(AdaptiveMode.ios));
  expect(adaptiveMode).toBeDefined();
});

test("Config - Mode", () => {
  configureAdaptiveMode(AdaptiveMode.android);

  expect(resolveAdaptiveMode()).toEqual(AdaptiveMode.android);
});

test("Config - User Agent", () => {
  configureAdaptiveMode(
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Mobile/15E148 Safari/604.1",
  );

  expect(resolveAdaptiveMode()).toEqual(AdaptiveMode.ios);
});

test("Prop", () => {
  expect(resolveAdaptiveMode(AdaptiveMode.android)).toEqual(
    AdaptiveMode.android,
  );
});
