import type { Locator, Page } from '@playwright/test';
import { DEFAULT_TIMEOUT } from '../configs/e2eConstants';

export default class BasePage {
  protected readonly page: Page;
  private readonly selector: string;

  constructor(page: Page, selector: string) {
    this.page = page;
    this.selector = selector;
  }

  protected get root(): Locator {
    return this.page.locator(this.selector);
  }

  async waitForIsShown(isShown = true): Promise<boolean> {
    try {
      await this.root.waitFor({
        state: isShown ? 'visible' : 'hidden',
        timeout: DEFAULT_TIMEOUT,
      });
      return true;
    } catch (error) {
      return !isShown;
    }
  }

  async isDisplayed(): Promise<boolean> {
    return this.root.isVisible();
  }
}
