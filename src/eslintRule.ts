const componentMap = [
  { old: "Button", new: "AdaptiveButton" },
  { old: "Checkbox", new: "AdaptiveCheckbox" },
  { old: "Dialog", new: "AdaptiveDialog" },
  { old: "DialogActions", new: "AdaptiveDialogActions" },
  { old: "Fab", new: "AdaptiveFab" },
  { old: "FilledInput", new: "AdaptiveFilledInput" },
  { old: "IconButton", new: "AdaptiveIconButton" },
  { old: "Input", new: "AdaptiveInput" },
  { old: "Menu", new: "AdaptiveMenu" },
  { old: "OutlinedInput", new: "AdaptiveOutlinedInput" },
  { old: "Radio", new: "AdaptiveRadio" },
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
  { old: "Snackbar", new: "AdaptiveSnackbar" },
  { old: "Switch", new: "AdaptiveSwitch" },
  {
    old: "TextField",
    new: "AdaptiveTextField",
    rules: [
      {
        selector:
          "JSXElement[openingElement.name.name='AdaptiveTextField'] JSXElement[openingElement.name.name='MenuItem']",
        message: "Use <AdaptiveSelectItem> instead",
      },
    ],
  },
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
