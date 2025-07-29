/* eslint-disable @typescript-eslint/unbound-method */
import { test, expect } from "@playwright/experimental-ct-react";
import { AdaptiveMode } from "./adaptiveMode";
import { adaptiveModeToString } from "./testUtils/adaptiveModeToString";
import { RenderAdaptiveMode } from "./testUtils/renderAdaptiveMode";

test("User Agent", async ({ mount }, workerInfo) => {
  let expectedMode = AdaptiveMode.desktop;
  switch (
    workerInfo.project.name.substring(0, workerInfo.project.name.indexOf(" "))
  ) {
    case "Android":
      expectedMode = AdaptiveMode.android;
      break;
    case "iOS":
      expectedMode = AdaptiveMode.ios;
      break;
  }

  const component = await mount(<RenderAdaptiveMode />);
  await expect(component).toContainText(adaptiveModeToString(expectedMode));
});
