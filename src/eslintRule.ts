const componentMap = [
  { old: "Button", new: "AdaptiveButton" },
  { old: "Dialog", new: "AdaptiveDialog" },
  { old: "DialogActions", new: "AdaptiveDialogActions" },
  { old: "Menu", new: "AdaptiveMenu" },
  {
    old: "Select",
    new: "AdaptiveSelect",
    rules: [
      {
        selector:
          "JSXElement[openingElement.name.name='AdaptiveSelect'] JSXElement[openingElement.name.name='MenuItem']",
        message: "Use <AdaptiveSelectItem> instead",
      },
    ],
  },
  { old: "Slider", new: "AdaptiveSlider" },
  { old: "Switch", new: "AdaptiveSwitch" },
];

export function warnNonAdaptiveComponents(excludeComponentNames?: string[]) {
  if (
    excludeComponentNames !== undefined &&
    !Array.isArray(excludeComponentNames)
  ) {
    throw new Error("excludeAdaptiveComponentNames must be an array");
  }

  return componentMap
    .filter((c) => !excludeComponentNames?.includes(c.old))
    .flatMap((c) => [
      {
        selector: `JSXElement[openingElement.name.name='${c.old}']`,
        message: `Use <${c.new}> instead`,
      },
      {
        selector: `CallExpression[callee.name='styled'][arguments.0.name='${c.old}']`,
        message: `Use ${c.new} instead`,
      },
      ...(c.rules ?? []),
    ]);
}
