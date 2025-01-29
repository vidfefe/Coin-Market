import { test, expect } from "@playwright/test";

test.describe("Coin Details Page", () => {
  const coinId = "bitcoin";
  const invalidCoinId = "invalidcoinid";

  test("should display all coin data correctly", async ({ page }) => {
    await page.goto(`/coin/${coinId}`, { timeout: 100000 });

    const coinImage = page.locator("div.ant-image img[alt='BTC']");
    await expect(coinImage).toBeVisible({ timeout: 10000 });

    const coinName = page.locator("h2.ant-typography:has-text('Bitcoin')");
    await expect(coinName).toBeVisible();

    const coinSymbol = page.locator("span.ant-typography:has-text('BTC')");
    await expect(coinSymbol).toBeVisible();

    const coinRank = page.locator("div.ant-card-head-title:has-text('Rank')");
    await expect(coinRank).toBeVisible();

    const coinSupply = page
      .locator("div.ant-card-head-title")
      .filter({ hasText: /^Supply$/ });
    await expect(coinSupply).toBeVisible();

    const coinPrice = page.locator("h2.ant-typography:has-text('$')");
    await expect(coinPrice).toBeVisible();

    const coinMarketCap = page.locator(
      "div.ant-card-head-title:has-text('Market Cap USD')",
    );
    await expect(coinMarketCap).toBeVisible();

    const coinMaxSupply = page.locator(
      "div.ant-card-head-title:has-text('Max Supply')",
    );
    await expect(coinMaxSupply).toBeVisible();

    const coinPriceChart = page.locator(
      "div.ant-card-head-title:has-text('Price Chart')",
    );
    await expect(coinPriceChart).toBeVisible();
  });

  test("should navigate back to Coin Table on button click", async ({
    page,
  }) => {
    await page.goto("/");
    const row = page.locator("tr.ant-table-row").first();
    const coinId = await row.getAttribute("data-row-key");

    await row.click();

    await page.waitForURL(`/coin/${coinId}`, { timeout: 100000 });
    await expect(page).toHaveURL(`/coin/${coinId}`);

    const backButton = page.locator("button:has-text('Back to Coin Table')");
    await backButton.click();

    await page.waitForURL(`/`, { timeout: 100000 });

    await expect(page).toHaveURL("/");
  });

  test("should display error and button for invalid coinId", async ({
    page,
  }) => {
    await page.goto(`/coin/${invalidCoinId}`);

    const errorMessage = page.locator(
      "text=Failed to load coin data. Please try again later",
    );
    await expect(errorMessage).toBeVisible();

    const backButton = page.locator("button:has-text('Back to Coin Table')");
    await expect(backButton).toBeVisible();
  });
});
