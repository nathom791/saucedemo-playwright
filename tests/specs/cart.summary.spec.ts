import { expect, test } from '@playwright/test';
import AppHeaderPage from '../page-objects/AppHeaderPage';
import SwagOverviewPage from '../page-objects/SwagOverviewPage';
import CartSummaryPage from '../page-objects/CartSummaryPage';
import CheckoutPersonalInfoPage from '../page-objects/CheckoutPersonalInfoPage';
import { setTestContext } from '../helpers';
import { LOGIN_USERS, PAGES, PRODUCTS } from '../configs/e2eConstants';

test.describe('Cart Summary page', () => {
  let appHeaderPage: AppHeaderPage;
  let swagOverviewPage: SwagOverviewPage;
  let cartSummaryPage: CartSummaryPage;
  let checkoutPersonalInfoPage: CheckoutPersonalInfoPage;

  test.beforeEach(async ({ page }) => {
    appHeaderPage = new AppHeaderPage(page);
    swagOverviewPage = new SwagOverviewPage(page);
    cartSummaryPage = new CartSummaryPage(page);
    checkoutPersonalInfoPage = new CheckoutPersonalInfoPage(page);
  });

  test('should validate that we can continue shopping', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.CART,
    });

    expect(await cartSummaryPage.waitForIsShown()).toBe(true);

    await cartSummaryPage.continueShopping();

    expect(await swagOverviewPage.waitForIsShown()).toBe(true);
  });

  test('should validate that we can go from the cart to the checkout page', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.CART,
    });

    expect(await cartSummaryPage.waitForIsShown()).toBe(true);

    await cartSummaryPage.goToCheckout();

    expect(await checkoutPersonalInfoPage.waitForIsShown()).toBe(true);
  });

  test('should validate that a product can be removed from the cart', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.CART,
      products: [PRODUCTS.BACKPACK],
    });

    expect(await cartSummaryPage.waitForIsShown()).toBe(true);

    expect(await appHeaderPage.getCartAmount()).toBe('1');
    expect(await cartSummaryPage.getSwagAmount()).toBe(1);

    await cartSummaryPage.removeSwag(0);

    expect(await appHeaderPage.getCartAmount()).toBe('');
    expect(await cartSummaryPage.getSwagAmount()).toBe(0);
  });
});
