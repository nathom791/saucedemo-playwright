import type { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class CartSummaryPage extends BasePage {
  constructor(page: Page) {
    super(page, '#cart_contents_container');
  }

  private get checkoutButton() {
    return this.page.locator('.checkout_button');
  }

  private get continueShoppingButton() {
    return this.page.locator('.btn_secondary');
  }

  private get items(): Locator {
    return this.page.locator('.cart_item');
  }

  async getSwagAmount(): Promise<number> {
    return this.items.count();
  }

  private swag(needle: number | string): Locator {
    if (typeof needle === 'string') {
      return this.items.filter({ hasText: needle }).first();
    }

    return this.items.nth(needle);
  }

  async getSwagText(needle: number | string): Promise<string> {
    return (await this.swag(needle).textContent())?.trim() ?? '';
  }

  async removeSwag(needle: number | string): Promise<void> {
    await this.swag(needle).locator('.btn_secondary.cart_button').click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async goToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
