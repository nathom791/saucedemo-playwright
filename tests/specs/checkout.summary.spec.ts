import { expect, test } from '@playwright/test';
import SwagOverviewPage from '../page-objects/SwagOverviewPage';
import CheckoutCompletePage from '../page-objects/CheckoutCompletePage';
import CheckoutSummaryPage from '../page-objects/CheckoutSummaryPage';
import { setTestContext } from '../helpers';
import { LOGIN_USERS, PAGES, PRODUCTS } from '../configs/e2eConstants';

test.describe('Checkout - Summary', () => {
  let swagOverviewPage: SwagOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;
  let checkoutSummaryPage: CheckoutSummaryPage;

  test.beforeEach(async ({ page }) => {
    swagOverviewPage = new SwagOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
    checkoutSummaryPage = new CheckoutSummaryPage(page);

    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.CHECKOUT_SUMMARY,
      products: [PRODUCTS.BACKPACK],
    });

    await checkoutSummaryPage.waitForIsShown();
  });

  test('should validate that we can continue shopping', async () => {
    await checkoutSummaryPage.finishCheckout();

    expect(await checkoutCompletePage.waitForIsShown()).toBe(true);
  });

  test('should validate that we can cancel checkout and go to the inventory page', async () => {
    await checkoutSummaryPage.cancelCheckout();

    expect(await swagOverviewPage.waitForIsShown()).toBe(true);
  });

  test('should validate that we have 1 product in our checkout overview', async () => {
    expect(await checkoutSummaryPage.getSwagAmount()).toBe(1);
  });
});
