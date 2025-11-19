/* eslint-disable @typescript-eslint/unbound-method */
import { test, expect } from "@playwright/experimental-ct-react";
import { RenderAdaptiveMode } from "./testUtils/renderAdaptiveMode";

test("User Agent", async ({ mount }, workerInfo) => {
  const projectName = workerInfo.project.name;

  let expectedMode = "desktop";
  switch (projectName.substring(0, projectName.indexOf(" "))) {
    case "Android":
      expectedMode = "android";
      break;
    case "iOS":
      expectedMode = "ios";
      break;
  }

  const component = await mount(<RenderAdaptiveMode />);
  await expect(component).toContainText(expectedMode);
});
