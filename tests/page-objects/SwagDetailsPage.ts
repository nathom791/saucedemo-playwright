import type { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class SwagDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page, '.inventory_details');
  }

  private get title() {
    return this.page.locator('.inventory_details_name');
  }

  private get description() {
    return this.page.locator('.inventory_details_desc');
  }

  private get price() {
    return this.page.locator('.inventory_details_price');
  }

  private get addButton() {
    return this.page.locator('.btn_primary.btn_inventory');
  }

  private get removeButton() {
    return this.page.locator('.btn_secondary.btn_inventory');
  }

  private get goBackButton() {
    return this.page.locator('.inventory_details_back_button');
  }

  async getText(): Promise<string> {
    const [titleText, descriptionText, priceText] = await Promise.all([
      this.title.textContent(),
      this.description.textContent(),
      this.price.textContent(),
    ]);

    return `${titleText?.trim() ?? ''} ${descriptionText?.trim() ?? ''} ${priceText?.trim() ?? ''}`.trim();
  }

  async addToCart(): Promise<void> {
    await this.addButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async goBack(): Promise<void> {
    await this.goBackButton.click();
  }
}
