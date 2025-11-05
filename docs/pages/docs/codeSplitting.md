# Code Splitting

Each device type is split into it's own file using React [lazy](https://react.dev/reference/react/lazy) so a Android device won't load iOS styles.
The imports are destructured so only the referenced components are included in the build (tree shaking) while keeping a single import per device type to reduce network calls.
The build tool has to support this feature to work, those known with support:

- Webpack [issue](https://github.com/webpack/webpack/issues/16872)
- Rspack [issue](https://github.com/web-infra-dev/rspack/pull/7230)
- Vite/Rollup [issue](https://github.com/rollup/rollup/issues/4951)

Example import code
```tsx pure
const SelectDesktop = lazy(async () => {
  const { SelectDesktop } = await import("./desktop");
  return { default: SelectDesktop };
});
```
