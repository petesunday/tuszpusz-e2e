import { expect, test } from "@playwright/test";

test("should load the app", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Tuszpusz");
});
