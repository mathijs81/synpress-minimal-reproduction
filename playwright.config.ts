import { defineConfig, devices } from "@playwright/test";

//console.log(devices);

export default defineConfig({
  webServer: { command: "pnpm run serve", port: 4173 },
  testDir: "e2e",
//  reporter: "html",
  use: {
    baseURL: "http://localhost:4173",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: 'chrome-for-testing',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
});
