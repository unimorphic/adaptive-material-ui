declare namespace React {
  // Support generic components https://stackoverflow.com/a/71017028/264921
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function lazy<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>,
  ): T;
}
