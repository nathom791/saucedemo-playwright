import { expect, test } from '@playwright/test';
import CartSummaryPage from '../page-objects/CartSummaryPage';
import CheckoutPersonalInfoPage from '../page-objects/CheckoutPersonalInfoPage';
import CheckoutSummaryPage from '../page-objects/CheckoutSummaryPage';
import { LOGIN_USERS, PAGES, PERSONAL_INFO } from '../configs/e2eConstants';
import { setTestContext } from '../helpers';

test.describe('Checkout - Personal info', () => {
  let cartSummaryPage: CartSummaryPage;
  let checkoutPersonalInfoPage: CheckoutPersonalInfoPage;
  let checkoutSummaryPage: CheckoutSummaryPage;

  test.beforeEach(async ({ page }) => {
    cartSummaryPage = new CartSummaryPage(page);
    checkoutPersonalInfoPage = new CheckoutPersonalInfoPage(page);
    checkoutSummaryPage = new CheckoutSummaryPage(page);

    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.CHECKOUT_PERSONAL_INFO,
    });

    await checkoutPersonalInfoPage.waitForIsShown();
  });

  test('should validate we get an error if we do not provide all personal information', async () => {
    await checkoutPersonalInfoPage.submitPersonalInfo(PERSONAL_INFO.NO_POSTAL_CODE);

    expect(await checkoutPersonalInfoPage.waitForIsShown()).toBe(true);
    expect(await checkoutPersonalInfoPage.getErrorMessage()).toBe('Error: Postal Code is required');
  });

  test('should validate that we can cancel the first checkout', async () => {
    expect(await cartSummaryPage.isDisplayed()).toBe(false);

    await checkoutPersonalInfoPage.cancelCheckout();

    expect(await cartSummaryPage.waitForIsShown()).toBe(true);
  });

  test('should be able to continue the checkout', async () => {
    await checkoutPersonalInfoPage.submitPersonalInfo(PERSONAL_INFO.STANDARD);

    expect(await checkoutSummaryPage.waitForIsShown()).toBe(true);
  });
});
