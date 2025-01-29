import { test, expect } from "@playwright/test";

test.describe("Add Coin Modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("open and close Add Coin modal by clicking Add button", async ({
    page,
  }) => {
    const addButton = page.locator("button:has-text('Add')").first();
    await addButton.click();
    const modal = page.locator(".ant-modal");
    await expect(modal).toBeVisible();

    const closeButton = modal.locator("button[aria-label='Close']");
    await closeButton.click();
    await expect(modal).not.toBeVisible();
  });

  test("open and close Add Coin modal using Cancel button", async ({
    page,
  }) => {
    const addButton = page.locator("button:has-text('Add')").first();
    await addButton.click();
    const modal = page.locator(".ant-modal");
    await expect(modal).toBeVisible();

    const cancelButton = modal.locator("button:has-text('Cancel')");
    await cancelButton.click();
    await expect(modal).not.toBeVisible();
  });

  test("open and close Add Coin modal by clicking outside the modal", async ({
    page,
  }) => {
    const addButton = page.locator("button:has-text('Add')").first();
    await addButton.click();
    const modal = page.locator(".ant-modal");
    await expect(modal).toBeVisible();

    await page.locator("body").click();
    await expect(modal).not.toBeVisible();
  });

  test("should correct negative quantity to 1 when pressing Enter", async ({
    page,
  }) => {
    const addButton = page.locator("button:has-text('Add')").first();
    await addButton.click();
    const modal = page.locator(".ant-modal");
    await expect(modal).toBeVisible();

    const quantityInput = modal.locator(".ant-input-number-input");
    await quantityInput.fill("-2");

    await quantityInput.press("Enter");

    await expect(quantityInput).toHaveValue("1");
  });
});

test.describe("Portfolio Modal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("open and close Portfolio modal by clicking Portfolio button", async ({
    page,
  }) => {
    const portfolioButton = page.locator("button:has-text('Portfolio:')");
    await portfolioButton.click();
    const modal = page.locator(".ant-modal");
    await expect(modal).toBeVisible();

    const closeButton = modal.locator("button[aria-label='Close']");
    await closeButton.click();
    await expect(modal).not.toBeVisible();
  });

  test("open and close Portfolio modal by clicking outside the modal", async ({
    page,
  }) => {
    const portfolioButton = page.locator("button:has-text('Portfolio:')");
    await portfolioButton.click();
    const modal = page.locator(".ant-modal");
    await expect(modal).toBeVisible();

    await page.mouse.click(0, 0);

    await expect(modal).not.toBeVisible();
  });
  test("add and remove a coin to the portfolio", async ({ page }) => {
    const addButton = page.locator("button:has-text('Add')");
    await addButton.first().click();

    const modal = page.locator(".ant-modal");
    await expect(modal).toBeVisible();

    const quantityInput = modal.locator("input");
    await quantityInput.fill("2");

    const confirmButton = modal.locator("button:has-text('Add to Portfolio')");
    await confirmButton.click();

    const portfolioButton = page.locator("button:has-text('Portfolio:')");
    await portfolioButton.click();

    const portfolioTable = page.locator(".ant-modal-body .ant-table");
    await expect(portfolioTable).toBeVisible();

    const coinRow = portfolioTable.locator("tr[data-row-key='bitcoin']");
    await expect(coinRow).toBeVisible();

    const removeButton = page.locator("button:has-text('Remove')");
    await removeButton.first().click();

    await expect(portfolioTable).not.toContainText("Bitcoin");
  });

  test("should correctly calculate portfolio value after adding coins", async ({
    page,
  }) => {
    const initialValue = page.locator('[data-testid="portfolio-value"]');
    await expect(initialValue).toBeVisible();

    const initialAmountText = await initialValue.textContent();
    const initialAmount =
      parseFloat(initialAmountText!.replace(/[$,]/g, "")) || 0;

    const addButton = page.locator("button:has-text('Add')");
    await addButton.first().click();

    const modal = page.locator(".ant-modal");
    await expect(modal).toBeVisible();

    const coinPriceElement = page.locator("tr:nth-child(2) td:nth-child(3)");
    await expect(coinPriceElement).toBeVisible();

    const coinPriceText = await coinPriceElement.textContent();
    const coinPrice = parseFloat(coinPriceText!.replace(/[$,]/g, ""));

    const quantityInput = modal.locator(".ant-input-number-input");
    await quantityInput.fill("2");

    const confirmButton = modal.locator("button:has-text('Add to Portfolio')");
    await confirmButton.click();

    const updatedValue = page.locator('[data-testid="portfolio-value"]');
    await expect(updatedValue).toBeVisible();

    const updatedAmountText = await updatedValue.textContent();
    const updatedAmount = parseFloat(updatedAmountText!.replace(/[$,]/g, ""));

    const expectedAmount = initialAmount + coinPrice * 2;
    const tolerance = 0.02;
    expect(updatedAmount).toBeGreaterThanOrEqual(expectedAmount - tolerance);
    expect(updatedAmount).toBeLessThanOrEqual(expectedAmount + tolerance);
  });
});
