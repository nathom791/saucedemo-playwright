import type { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class CheckoutSummaryPage extends BasePage {
  constructor(page: Page) {
    super(page, '#checkout_summary_container');
  }

  private get cancelButton() {
    return this.page.locator('.cart_cancel_link');
  }

  private get finishButton() {
    return this.page.locator('.cart_button');
  }

  private get items(): Locator {
    return this.page.locator('.cart_item');
  }

  title(needle: number | string): Locator {
    return this.swag(needle).locator('.inventory_item_name');
  }

  description(needle: number | string): Locator {
    return this.swag(needle).locator('.inventory_item_desc');
  }

  price(needle: number | string): Locator {
    return this.swag(needle).locator('.inventory_item_price');
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
    const [titleText, descText, priceText] = await Promise.all([
      this.title(needle).textContent(),
      this.description(needle).textContent(),
      this.price(needle).textContent(),
    ]);

    return `${titleText?.trim() ?? ''} ${descText?.trim() ?? ''} ${priceText?.trim() ?? ''}`.trim();
  }

  async cancelCheckout(): Promise<void> {
    await this.cancelButton.click();
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }
}
