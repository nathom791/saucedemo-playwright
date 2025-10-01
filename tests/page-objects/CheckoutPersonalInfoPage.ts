import type { Page } from '@playwright/test';
import BasePage from './BasePage';
import type { PersonalInfo } from '../configs/e2eConstants';
import { DEFAULT_TIMEOUT } from '../configs/e2eConstants';

export default class CheckoutPersonalInfoPage extends BasePage {
  constructor(page: Page) {
    super(page, '#checkout_info_container');
  }

  private get cancelButton() {
    return this.page.locator('.cart_cancel_link');
  }

  private get continueCheckoutButton() {
    return this.page.locator('.cart_button');
  }

  private get firstName() {
    return this.page.locator('[data-test="firstName"]');
  }

  private get lastName() {
    return this.page.locator('[data-test="lastName"]');
  }

  private get postalCode() {
    return this.page.locator('[data-test="postalCode"]');
  }

  private get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  async submitPersonalInfo(personalInfo: PersonalInfo): Promise<void> {
    const { firstName, lastName, zip } = personalInfo;

    await this.waitForIsShown();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(zip);
    await this.continueCheckoutButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await this.errorMessage.textContent())?.trim() ?? '';
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }
}
