import { expect, test } from '@playwright/test';
import AppHeaderPage from '../page-objects/AppHeaderPage';
import SwagDetailsPage from '../page-objects/SwagDetailsPage';
import { setTestContext } from '../helpers';
import { LOGIN_USERS, PAGES, PRODUCTS } from '../configs/e2eConstants';

test.describe('Swag Item Details', () => {
  let appHeaderPage: AppHeaderPage;
  let swagDetailsPage: SwagDetailsPage;

  test.beforeEach(async ({ page }) => {
    appHeaderPage = new AppHeaderPage(page);
    swagDetailsPage = new SwagDetailsPage(page);
  });

  test('should validate that we can go back from the details to the inventory page', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });

    await page.goto(`${PAGES.SWAG_DETAILS}?id=${PRODUCTS.BACKPACK}`);
    await swagDetailsPage.waitForIsShown();

    await swagDetailsPage.goBack();

    expect(await swagDetailsPage.waitForIsShown(false)).toBe(true);
  });

  test('should validate that a product can be added to a cart', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
    });

    await page.goto(`${PAGES.SWAG_DETAILS}?id=${PRODUCTS.BACKPACK}`);
    await swagDetailsPage.waitForIsShown();

    expect(await appHeaderPage.getCartAmount()).toBe('');

    await swagDetailsPage.addToCart();

    expect(await appHeaderPage.getCartAmount()).toBe('1');
  });

  test('should validate that a product can be removed from the cart', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.SWAG_ITEMS,
      products: [PRODUCTS.BACKPACK],
    });

    await page.goto(`${PAGES.SWAG_DETAILS}?id=${PRODUCTS.BACKPACK}`);
    await swagDetailsPage.waitForIsShown();

    expect(await appHeaderPage.getCartAmount()).toBe('1');

    await swagDetailsPage.removeFromCart();

    expect(await appHeaderPage.getCartAmount()).toBe('');
  });
});
