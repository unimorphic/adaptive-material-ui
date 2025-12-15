import { createTheme, CSSObject, Theme, useTheme } from "@mui/material/styles";
import { cleanup, render } from "@testing-library/react";
import { ReactNode } from "react";
import { afterEach, expect, test } from "vitest";
import { AdaptiveThemeProvider } from "../theme/adaptiveThemeProvider";
import { ReplaceComponentInTheme } from "./replaceComponentInTheme";

afterEach(cleanup);

function RenderThemeProp(props: { render: (theme: Theme) => ReactNode }) {
  const theme = useTheme();
  return <div>{props.render(theme)}</div>;
}

test("Style is copied", () => {
  const color = "blue";
  const theme = createTheme({
    components: {
      AdaptiveButton: { styleOverrides: { root: { backgroundColor: color } } },
    },
  });

  const result = render(
    <AdaptiveThemeProvider theme={theme}>
      <ReplaceComponentInTheme
        sourceComponentName="AdaptiveButton"
        targetComponentName="MuiButton"
      >
        <RenderThemeProp
          render={(t) =>
            (t.components?.MuiButton?.styleOverrides?.root as CSSObject)
              .backgroundColor
          }
        />
      </ReplaceComponentInTheme>
    </AdaptiveThemeProvider>,
  );

  expect(result.getByText(color)).toBeDefined();
});

test("Props are not copied", () => {
  const noSize = "no-size";
  const theme = createTheme({
    components: { AdaptiveButton: { defaultProps: { size: "large" } } },
  });

  const result = render(
    <AdaptiveThemeProvider theme={theme}>
      <ReplaceComponentInTheme
        sourceComponentName="AdaptiveButton"
        targetComponentName="MuiButton"
      >
        <RenderThemeProp
          render={(t) => t.components?.MuiButton?.defaultProps?.size ?? noSize}
        />
      </ReplaceComponentInTheme>
    </AdaptiveThemeProvider>,
  );

  expect(result.getByText(noSize)).toBeDefined();
});

test("No theme", () => {
  const noSize = "no-size";
  const result = render(
    <ReplaceComponentInTheme
      sourceComponentName="AdaptiveButton"
      targetComponentName="MuiButton"
    >
      <RenderThemeProp
        render={(t) => t.components?.MuiButton?.defaultProps?.size ?? noSize}
      />
    </ReplaceComponentInTheme>,
  );

  expect(result.getByText(noSize)).toBeDefined();
});
