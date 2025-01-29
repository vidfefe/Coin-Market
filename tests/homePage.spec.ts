import { test, expect } from "@playwright/test";

test.describe("SearchBar", () => {
  test("filter coins by name", async ({ page }) => {
    await page.goto("/");

    const searchInput = page.locator(
      "input[placeholder='Search coin by name']",
    );
    await searchInput.fill("Bitcoin");
    await searchInput.press("Enter");

    await page.waitForSelector("table");

    const coinRow = page.locator("tr[data-row-key='bitcoin']");
    await expect(coinRow).toBeVisible();
  });
});

test.describe("Coin table", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("table");
  });

  test("display of the columns of the table", async ({ page }) => {
    const headers = [
      "Symbol",
      "Logo",
      "Price",
      "Market Cap USD",
      "Change in 24h",
      "Action",
    ];

    for (const header of headers) {
      await expect(page.locator(`th:has-text("${header}")`)).toBeVisible();
    }
  });

  test("display of Coin data", async ({ page }) => {
    const firstRow = page.locator("tr.ant-table-row").first();

    await expect(firstRow.locator("td:nth-child(1)")).not.toBeEmpty();
    await expect(firstRow.locator("td:nth-child(2) img")).toBeVisible();
    await expect(firstRow.locator("td:nth-child(3)")).not.toBeEmpty();
    await expect(firstRow.locator("td:nth-child(4)")).not.toBeEmpty();
    await expect(firstRow.locator("td:nth-child(5)")).not.toBeEmpty();
    await expect(
      firstRow.locator("td:nth-child(6) button:has-text('Add')"),
    ).toBeVisible();
  });

  test("sort price by ascending", async ({ page }) => {
    const priceHeader = page.locator("th:has-text('Price')");
    await priceHeader.click();

    const firstPrice = await page
      .locator("tr:nth-child(2) td:nth-child(3)")
      .textContent();
    const secondPrice = await page
      .locator("tr:nth-child(3) td:nth-child(3)")
      .textContent();

    expect(parseFloat(firstPrice!.replace(/[$,]/g, ""))).toBeLessThanOrEqual(
      parseFloat(secondPrice!.replace(/[$,]/g, "")),
    );
  });

  test("sort by Market Cap USD ascending", async ({ page }) => {
    const marketCapHeader = page.locator("th:has-text('Market Cap USD')");
    await marketCapHeader.click();

    const firstMarketCap = await page
      .locator("tr:nth-child(2) td:nth-child(4)")
      .textContent();
    const secondMarketCap = await page
      .locator("tr:nth-child(3) td:nth-child(4)")
      .textContent();

    expect(
      parseFloat(firstMarketCap!.replace(/[$,]/g, "")),
    ).toBeLessThanOrEqual(parseFloat(secondMarketCap!.replace(/[$,]/g, "")));
  });

  test("sort on a change in price in 24 hours (Change in 24H) by descending", async ({
    page,
  }) => {
    const changeHeader = page.locator("th:has-text('Change in 24h')");
    await changeHeader.dblclick();

    const firstChange = await page
      .locator("tr:nth-child(2) td:nth-child(5)")
      .textContent();
    const secondChange = await page
      .locator("tr:nth-child(3) td:nth-child(5)")
      .textContent();

    expect(parseFloat(secondChange!.replace(/%/g, ""))).toBeLessThanOrEqual(
      parseFloat(firstChange!.replace(/%/g, "")),
    );
  });

  test("go to the coin page when you click on a table row", async ({
    page,
  }) => {
    const row = page.locator("tr.ant-table-row").first();
    const coinId = await row.getAttribute("data-row-key");

    await row.click();

    await page.waitForURL(`/coin/${coinId}`, { timeout: 100000 });
    await expect(page).toHaveURL(`/coin/${coinId}`);
  });
});
