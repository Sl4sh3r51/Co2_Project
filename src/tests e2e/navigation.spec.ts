import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Desktop', width: 1280, height: 800 },
  { name: 'Mobile', width: 375, height: 667 }
];

test.describe('Seiten-Navigation und Views', () => {
  for (const viewport of viewports) {
    test.describe(`${viewport.name} Ansicht`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('http://localhost:8080/');
      });

      test('Über uns Seite', async ({ page }) => {
        if (viewport.name === 'Mobile') {
          const burger = page.locator('button[aria-label="Navigation öffnen"]');
          if (await burger.isVisible({ timeout: 3000 })) {
            await burger.click();
            await page.waitForSelector('.offcanvas.show', { timeout: 5000 });
          }
        }
        const aboutLink = page.locator('text=Über uns');
        await expect(aboutLink).toBeVisible({ timeout: 10000 });
        await aboutLink.click();
        await expect(page.locator('h1, h2')).toContainText('Über uns', { timeout: 10000 });
      });

      test('Methodik Seite', async ({ page }) => {
        if (viewport.name === 'Mobile') {
          const burger = page.locator('button[aria-label="Navigation öffnen"]');
          if (await burger.isVisible({ timeout: 3000 })) {
            await burger.click();
            await page.waitForSelector('.offcanvas.show', { timeout: 5000 });
          }
        }
        const methodologyLink = page.getByRole('link', { name: 'Methodik' });
        await expect(methodologyLink).toBeVisible({ timeout: 10000 });
        await methodologyLink.click();
        await expect(page.getByRole('heading', { name: 'Methodik' })).toBeVisible({ timeout: 10000 });
      });

      test('Kontakt Seite', async ({ page }) => {
        if (viewport.name === 'Mobile') {
          const burger = page.locator('button[aria-label="Navigation öffnen"]');
          if (await burger.isVisible({ timeout: 3000 })) {
            await burger.click();
            await page.waitForSelector('.offcanvas.show', { timeout: 5000 });
          }
        }
        const contactLink = page.locator('text=Kontakt');
        await expect(contactLink).toBeVisible({ timeout: 10000 });
        await contactLink.click();
        await expect(page.locator('h1, h2')).toContainText('Kontakt', { timeout: 10000 });
      });
    });
  }
});
