import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Desktop', width: 1280, height: 800 },
  { name: 'Mobile', width: 375, height: 667 }
];

test.describe('Modal Tests', () => {
  for (const viewport of viewports) {
    test.describe(`${viewport.name} Ansicht`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('http://localhost:8080/');
      });

      test('Impressum Modal', async ({ page }) => {
        await page.click('text=Impressum');
        await page.waitForSelector('.modal', { timeout: 10000 });
        await expect(page.locator('.modal-title')).toHaveText('Impressum', { timeout: 10000 });
      });

      test('Datenschutzerklärung Modal', async ({ page }) => {
        await page.click('text=Datenschutzerklärung');
        await page.waitForSelector('.modal', { timeout: 10000 });
        await expect(page.locator('.modal-title')).toHaveText('Datenschutzerklärung', { timeout: 10000 });
      });

      test('Nutzungsbedingungen Modal', async ({ page }) => {
        await page.click('text=Nutzungsbedingungen');
        await page.waitForSelector('.modal', { timeout: 10000 });
        await expect(page.locator('.modal-title')).toHaveText('Nutzungsbedingungen', { timeout: 10000 });
      });
    });
  }
});
