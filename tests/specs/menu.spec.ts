import { expect, test } from '@playwright/test';
import AppHeaderPage from '../page-objects/AppHeaderPage';
import SwagOverviewPage from '../page-objects/SwagOverviewPage';
import LoginPage from '../page-objects/LoginPage';
import CartSummaryPage from '../page-objects/CartSummaryPage';
import MenuPage from '../page-objects/MenuPage';
import { setTestContext } from '../helpers';
import { LOGIN_USERS, PAGES, PRODUCTS } from '../configs/e2eConstants';

const skipAboutPageTest = !!process.env.REGION;

test.describe('Menu', () => {
  let appHeaderPage: AppHeaderPage;
  let swagOverviewPage: SwagOverviewPage;
  let loginPage: LoginPage;
  let cartSummaryPage: CartSummaryPage;
  let menuPage: MenuPage;

  test.beforeEach(async ({ page }) => {
    appHeaderPage = new AppHeaderPage(page);
    swagOverviewPage = new SwagOverviewPage(page);
    loginPage = new LoginPage(page);
    cartSummaryPage = new CartSummaryPage(page);
    menuPage = new MenuPage(page);

    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.CART,
      products: [PRODUCTS.BACKPACK],
    });

    await cartSummaryPage.waitForIsShown();
    await menuPage.open();
  });

  test('should be able to the swag items overview page', async () => {
    await menuPage.openInventoryList();

    expect(await swagOverviewPage.waitForIsShown()).toBe(true);
  });

  test('should be able to open the about page', async () => {
    test.skip(skipAboutPageTest, 'The saucelabs.com url is not available in the EU DC');

    await menuPage.openAboutPage();

    expect(await cartSummaryPage.waitForIsShown(false)).toBe(true);
  });

  test('should be able to log out', async () => {
    await menuPage.logout();

    expect(await loginPage.waitForIsShown()).toBe(true);
  });

  test('should be able to clear the cart', async () => {
    expect(await appHeaderPage.getCartAmount()).toBe('1');

    await menuPage.restAppState();

    expect(await appHeaderPage.getCartAmount()).toBe('');
  });
});
