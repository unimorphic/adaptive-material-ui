/* eslint-disable @typescript-eslint/unbound-method */
import { test, expect } from "@playwright/experimental-ct-react";
import { CssVariablesTest } from "./adaptiveThemeProvider.story";

test("CSS Variables", async ({ mount }) => {
  const component = await mount(<CssVariablesTest />);

  await expect(component).toContainText("Button", { timeout: 30 * 1000 });
});
