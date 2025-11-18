# Contributing

## Code of conduct

We have adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as our code of conduct, and we expect project participants to adhere to it.
Please read [the full text](./CODE_OF_CONDUCT.md) to understand what actions will and will not be tolerated.

## Getting started

- Prerequisites: [pnpm](https://pnpm.io/installation) & [Node.js](https://nodejs.org/en/download) >= v22.20.0
- Fork the repository [GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
- Create a new branch [GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository)
- Run `pnpm install` in the project root directory to install the dependencies

## Docs site

To run the docs site locally, run `pnpm run start-docs`. This will start watch builds of both the library
and the docs site. The site is then available at http://localhost:3000

### Playground

A playground file docs\shared\playground.tsx is available when running the docs site locally at
http://localhost:3000/docs/playground.html

## Adding a new component

- Add a new folder under src\components with the component source code, see the existing components for examples
- Update src\themes\themeAugmentation.ts
- If it has device specific versions update src\components\android.ts, desktop.ts, & ios.ts
- Update src\index.ts
- Add a new documentation page under docs\pages\docs\components
- Update docs\shared\componentsList.tsx
- If it replaces a MUI component, update src\eslintRule.ts

## Creating a pull request

- First run the following commands on your local branch
  - `pnpm run format` and commit any changed files
  - `pnpm run lint` and fix any reported errors
- Commit your changes & push to your fork [GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/committing-changes-to-a-pull-request-branch-created-from-a-fork)
- Create a pull request [GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request#creating-the-pull-request)
