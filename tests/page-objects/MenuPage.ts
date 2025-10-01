import type { Page } from '@playwright/test';

export default class MenuPage {
  constructor(private readonly page: Page) {}

  private get menuButton() {
    return this.page.locator('.bm-burger-button button, .bm-burger-button');
  }

  private get inventoryListButton() {
    return this.page.locator('#inventory_sidebar_link');
  }

  private get aboutButton() {
    return this.page.locator('#about_sidebar_link');
  }

  private get logoutButton() {
    return this.page.locator('#logout_sidebar_link');
  }

  private get resetButton() {
    return this.page.locator('#reset_sidebar_link');
  }

  async open(): Promise<void> {
    await this.menuButton.first().click();
    await this.page.waitForTimeout(500);
  }

  async openInventoryList(): Promise<void> {
    await this.inventoryListButton.click();
  }

  async openAboutPage(): Promise<void> {
    await this.aboutButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }

  async restAppState(): Promise<void> {
    await this.resetButton.click();
  }
}
