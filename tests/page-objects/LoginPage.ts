import type { Page } from '@playwright/test';
import BasePage from './BasePage';
import type { LoginUser } from '../configs/e2eConstants';
import { DEFAULT_TIMEOUT } from '../configs/e2eConstants';

export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page, '#login_button_container');
  }

  private get username() {
    return this.page.locator('#user-name');
  }

  private get password() {
    return this.page.locator('#password');
  }

  private get loginButton() {
    return this.page.locator('.btn_action');
  }

  private get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  async signIn(userDetails: LoginUser): Promise<void> {
    const { password, username } = userDetails;

    await this.waitForIsShown();
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  async isErrorMessageDisplayed(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
