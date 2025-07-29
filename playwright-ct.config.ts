import { defineConfig, devices } from "@playwright/experimental-ct-react";

export default defineConfig({
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  reporter: "html",
  retries: process.env.CI ? 2 : 0,
  snapshotDir: "./__snapshots__",
  testDir: "./src",
  testMatch: "**/*.e2e.?(c|m)[jt]s?(x)",
  timeout: 10 * 1000,
  workers: process.env.CI ? 1 : undefined,
  use: {
    trace: "on-first-retry",
    ctPort: 3100,
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Desktop Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "Desktop Safari",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Android Pixel 7",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "iOS iPhone 12",
      use: { ...devices["iPhone 12"] },
    },
    {
      name: "iOS iPad (gen 11)",
      use: { ...devices["iPad (gen 11)"] },
    },
  ],
});
