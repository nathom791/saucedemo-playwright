import type { Page } from '@playwright/test';
import type { LoginUser } from '../configs/e2eConstants';

interface TestContextOptions {
  user: LoginUser;
  path: string;
  products?: number[];
}

export async function setTestContext(page: Page, options: TestContextOptions): Promise<void> {
  const { path, products = [], user } = options;
  const username = user.username;
  const productsString = products.length > 0 ? `[${products.join(',')}]` : '';

  await page.goto('');
  await page.context().clearCookies();
  await page.evaluate(() => {
    window.localStorage.clear();
  });

  await page.evaluate(({ username: name, productsString: storage }) => {
    document.cookie = `session-username=${name}`;
    if (storage) {
      window.localStorage.setItem('cart-contents', storage);
    }
  }, { username, productsString });

  await page.waitForTimeout(1000);
  await page.goto(path);
}
