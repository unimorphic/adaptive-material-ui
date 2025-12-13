import { purple } from "@mui/material/colors";
import { createTheme, useTheme } from "@mui/material/styles";
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";
import { AdaptiveThemeProvider } from "./adaptiveThemeProvider";

afterEach(cleanup);

function RenderPrimaryContainerColor() {
  return useTheme().palette.primary.container;
}

test("Hex Color", () => {
  const theme = createTheme({ palette: { primary: { main: "#63A002" } } });

  const result = render(
    <AdaptiveThemeProvider theme={theme}>
      <RenderPrimaryContainerColor />
    </AdaptiveThemeProvider>,
  );

  expect(result.getByText("#b2f65f")).toBeDefined();
});

test("RGB Color", () => {
  const theme = createTheme({
    palette: { primary: { main: "rgb(99, 160, 2)" } },
  });

  const result = render(
    <AdaptiveThemeProvider theme={theme}>
      <RenderPrimaryContainerColor />
    </AdaptiveThemeProvider>,
  );

  expect(result.getByText("#b2f65f")).toBeDefined();
});

test("HSL Color", () => {
  const theme = createTheme({
    palette: { primary: { main: "hsl(83.16, 97.53%, 31.76%)" } },
  });

  const result = render(
    <AdaptiveThemeProvider theme={theme}>
      <RenderPrimaryContainerColor />
    </AdaptiveThemeProvider>,
  );

  expect(result.getByText("#b2f65f")).toBeDefined();
});

test("Color Object", () => {
  const theme = createTheme({ palette: { primary: purple } });

  const result = render(
    <AdaptiveThemeProvider theme={theme}>
      <RenderPrimaryContainerColor />
    </AdaptiveThemeProvider>,
  );

  expect(result.getByText("#ffd6fe")).toBeDefined();
});
