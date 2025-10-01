import { expect, test } from '@playwright/test';
import CheckoutCompletePage from '../page-objects/CheckoutCompletePage';
import { setTestContext } from '../helpers';
import { LOGIN_USERS, PAGES } from '../configs/e2eConstants';

test.describe('Checkout - Complete', () => {
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    checkoutCompletePage = new CheckoutCompletePage(page);
  });

  test('should be able to test loading of login page', async ({ page }) => {
    await setTestContext(page, {
      user: LOGIN_USERS.STANDARD,
      path: PAGES.CHECKOUT_COMPLETE,
    });

    expect(await checkoutCompletePage.waitForIsShown()).toBe(true);
  });
});
