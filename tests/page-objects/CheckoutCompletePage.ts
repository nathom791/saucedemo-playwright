import type { Page } from '@playwright/test';
import BasePage from './BasePage';

export default class CheckoutCompletePage extends BasePage {
  constructor(page: Page) {
    super(page, '#checkout_complete_container');
  }
}
