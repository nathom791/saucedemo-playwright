import { expect, test } from '@playwright/test';
import LoginPage from '../page-objects/LoginPage';
import SwagOverviewPage from '../page-objects/SwagOverviewPage';
import { LOGIN_USERS } from '../configs/e2eConstants';

test.describe('LoginPage', () => {
  let loginPage: LoginPage;
  let swagOverviewPage: SwagOverviewPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    swagOverviewPage = new SwagOverviewPage(page);

    await page.goto('');
    await page.context().clearCookies();
    await page.evaluate(() => {
      window.localStorage.clear();
    });

    await page.goto('');
    await loginPage.waitForIsShown();
  });

  test('should be able to test loading of login page', async () => {
    expect(await loginPage.waitForIsShown()).toBe(true);
  });

  test('should be able to login with a standard user', async () => {
    await loginPage.signIn(LOGIN_USERS.STANDARD);
    expect(await swagOverviewPage.waitForIsShown()).toBe(true);
  });

  test('should not be able to login with a locked user', async () => {
    await loginPage.signIn(LOGIN_USERS.LOCKED);

    expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
    expect(await loginPage.getErrorMessage()).toContain(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});
