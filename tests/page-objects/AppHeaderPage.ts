import type { Page } from '@playwright/test';

export default class AppHeaderPage {
  constructor(private readonly page: Page) {}

  private get cart() {
    return this.page.locator('.shopping_cart_link');
  }

  private get productFilter() {
    return this.page.locator('.product_sort_container');
  }

  async getCartAmount(): Promise<string> {
    await this.page.waitForTimeout(500);
    return (await this.cart.textContent())?.trim() ?? '';
  }

  async openCart(): Promise<void> {
    await this.cart.click();
  }

  async selectProductOrder(text: string): Promise<void> {
    await this.productFilter.selectOption({ label: text });
  }
}
