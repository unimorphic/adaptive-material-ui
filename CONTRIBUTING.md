# Contributing

TODO

## Playground

A playground file docs\shared\playground.tsx is available when running locally at
http://localhost:3000/docs/playground.html

## Adding a new component

- Add a new folder under src\components with the component source code, see the existing components for examples
- Update src\themes\themeAugmentation.ts
- If it has device specific versions update src\components\android.ts, desktop.ts, & ios.ts
- Update src\components\index.ts
- Add a new documentation page under docs\pages\docs\components
- If it replaces a MUI component, update src\eslintRule.ts
