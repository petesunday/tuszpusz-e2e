import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env["CI"],
  retries: process.env["CI"] ? 2 : 0,
  workers: process.env["CI"] ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:4200",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "pnpm start",
      cwd: "../client",
      url: "http://localhost:4200",
      reuseExistingServer: !process.env["CI"],
    },
    {
      command: "bash start_server.sh",
      cwd: "../server/5050pl-server",
      url: "http://localhost:8000",
      reuseExistingServer: !process.env["CI"],
    },
  ],
});
