import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Desktop', width: 1280, height: 800 },
  { name: 'Mobile', width: 375, height: 667 }
];

test.describe('Kontaktformular', () => {
  for (const viewport of viewports) {
    test.describe(`${viewport.name} Ansicht`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('http://localhost:8080/contact');
      });

      test('Absenden Button ist initial disabled', async ({ page }) => {
        await expect(page.locator('button[type="submit"]')).toBeDisabled();
      });

      test('Absenden Button nach Eingabe klickbar und Modal erscheint', async ({ page }) => {
        await page.waitForSelector('#name', { timeout: 10000 });
        await page.waitForSelector('#email', { timeout: 10000 });
        await page.waitForSelector('textarea', { timeout: 10000 });
        await page.fill('#name', 'Max Mustermann');
        await page.fill('#email', 'max@example.com');
        await page.fill('textarea', 'Testnachricht');
        await expect(page.locator('button[type="submit"]')).toBeEnabled({ timeout: 10000 });
        await page.click('button[type="submit"]');
        await page.waitForSelector('.modal', { timeout: 10000 });
        await expect(page.locator('.modal')).toContainText('Vielen Dank!', { timeout: 10000 });
      });
    });
  }
});
