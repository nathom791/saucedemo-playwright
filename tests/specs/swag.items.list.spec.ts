import { expect, test } from '@playwright/test';
import AppHeaderPage from '../page-objects/AppHeaderPage';
import SwagOverviewPage from '../page-objects/SwagOverviewPage';
import SwagDetailsPage from '../page-objects/SwagDetailsPage';
import CartSummaryPage from '../page-objects/CartSummaryPage';
import { setTestContext } from '../helpers';
import { LOGIN_USERS, PAGES, PRODUCTS } from '../configs/e2eConstants';

test.describe('Swag items list', () => {
  let appHeaderPage: AppHeaderPage;
  let swagOverviewPage: SwagOverviewPage;
  let swagDetailsPage: SwagDetailsPage;
  let cartSummaryPage: CartSummaryPage;

  test.beforeEach(async ({ page }) => {
    appHeaderPage = new AppHeaderPage(page);
    swagOverviewPage = new SwagOverviewPage(page);
    swagDetailsPage = new SwagDetailsPage(page);
    cartSummaryPage = new CartSummaryPage(page);
  });

  test('should validate that all products are present', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });

    await swagOverviewPage.waitForIsShown();

    expect(await swagOverviewPage.getAmount()).toBe(6);
  });

  test('should be able to sort the items', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });

    await swagOverviewPage.waitForIsShown();

    expect(await swagOverviewPage.getSwagText(0)).toContain('Sauce Labs Backpack');

    await appHeaderPage.selectProductOrder('Price (high to low)');

    expect(await swagOverviewPage.getSwagText(0)).toContain('Sauce Labs Fleece Jacket');
  });

  test('should validate that the details of a product can be opened', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });

    await swagOverviewPage.waitForIsShown();

    const product = 'Sauce Labs Backpack';

    await swagOverviewPage.openSwagDetails(product);

    expect(await swagDetailsPage.waitForIsShown()).toBe(true);
    expect(await swagDetailsPage.getText()).toContain(product);
  });

  test('should validate that a product can be added to the cart', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });

    await swagOverviewPage.waitForIsShown();

    expect(await appHeaderPage.getCartAmount()).toBe('');

    await swagOverviewPage.addSwagToCart(0);

    expect(await appHeaderPage.getCartAmount()).toBe('1');
  });

  test('should validate that a product can be removed from the cart', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
      products: [PRODUCTS.BACKPACK],
    });

    await swagOverviewPage.waitForIsShown();

    expect(await appHeaderPage.getCartAmount()).toBe('1');

    await swagOverviewPage.removeSwagFromCart(0);

    expect(await appHeaderPage.getCartAmount()).toBe('');
  });

  test('should be able to open the cart summary page', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });

    await swagOverviewPage.waitForIsShown();

    await appHeaderPage.openCart();

    expect(await cartSummaryPage.waitForIsShown()).toBe(true);
  });
});
