import type { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class SwagOverviewPage extends BasePage {
  constructor(page: Page) {
    super(page, '.inventory_list');
  }

  private get swagItems(): Locator {
    return this.page.locator('.inventory_item');
  }

  async getAmount(): Promise<number> {
    return this.swagItems.count();
  }

  private swag(needle: number | string): Locator {
    if (typeof needle === 'string') {
      return this.swagItems.filter({ hasText: needle }).first();
    }

    return this.swagItems.nth(needle);
  }

  async getSwagText(needle: number | string): Promise<string> {
    return (await this.swag(needle).textContent())?.trim() ?? '';
  }

  async addSwagToCart(needle: number | string): Promise<void> {
    await this.swag(needle).locator('.btn_primary.btn_inventory').click();
  }

  async removeSwagFromCart(needle: number | string): Promise<void> {
    await this.swag(needle).locator('.btn_secondary.btn_inventory').click();
  }

  async openSwagDetails(needle: number | string): Promise<void> {
    await this.swag(needle).locator('.inventory_item_name').click();
  }
}
