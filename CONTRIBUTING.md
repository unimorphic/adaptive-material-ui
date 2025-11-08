# Contributing

## Docs site

To run the docs site locally, run `npm run start-docs`. This will start watch builds of both the library
and the docs site. The site is available at http://localhost:3000

### Playground

A playground file docs\shared\playground.tsx is available when running the docs site locally at
http://localhost:3000/docs/playground.html

## Adding a new component

- Add a new folder under src\components with the component source code, see the existing components for examples
- Update src\themes\themeAugmentation.ts
- If it has device specific versions update src\components\android.ts, desktop.ts, & ios.ts
- Update src\components\index.ts
- Add a new documentation page under docs\pages\docs\components
- If it replaces a MUI component, update src\eslintRule.ts

## Before creating a pull request

- Run the following commands on your local branch
  - `npm run format` and commit any changes
  - `npm run lint` and fix any reported errors
