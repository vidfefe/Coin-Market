import { test, expect } from "@playwright/test";

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("display of top 3 cryptocurrency prices and user`s portfolio", async ({
    page,
  }) => {
    const coinElements = page.locator('[data-testid="top-coins"] .ant-col');
    await expect(coinElements).toHaveCount(3);

    const firstCoin = await coinElements.nth(0).innerText();
    expect(firstCoin).toMatch(/#\d+/);
    expect(firstCoin).toMatch(/\$/);

    const portfolioButton = page.locator("button:has-text('Portfolio:')");
    await expect(portfolioButton).toBeVisible();
  });
});
