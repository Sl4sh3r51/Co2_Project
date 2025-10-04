import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Desktop', width: 1280, height: 800 },
  { name: 'Mobile', width: 375, height: 667 }
];

test.describe('EmissionTable', () => {
  for (const viewport of viewports) {
    test.describe(`${viewport.name} Ansicht`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('http://localhost:8080/');
      });

      test('Datentabelle vollständig geladen (30 Zeilen)', async ({ page }) => {
        await expect(page.locator('table tbody tr')).toHaveCount(30);
      });

      test('Filter "Länder" zeigt nur Länder', async ({ page }) => {
        await page.locator('select.form-select').selectOption('country');
        const types = await page.locator('table tbody tr td:nth-child(2)').allTextContents();
        expect(types.every(t => t.toLowerCase().includes('land') || t.toLowerCase().includes('country'))).toBeTruthy();
      });

      test('Filter "Unternehmen" zeigt nur Unternehmen', async ({ page }) => {
        await page.locator('select.form-select').selectOption('company');
        const types = await page.locator('table tbody tr td:nth-child(2)').allTextContents();
        expect(types.every(t => t.toLowerCase().includes('unternehmen') || t.toLowerCase().includes('company'))).toBeTruthy();
      });

      test('Suche nach "Deutschland" zeigt passende Daten', async ({ page }) => {
        await page.locator('input.form-control').fill('Deutschland');
        const rows = await page.locator('table tbody tr').allTextContents();
        expect(rows.length).toBeGreaterThan(0);
        for (const row of rows) {
          expect(row.toLowerCase()).toContain('deutschland');
        }
      });

      test('Suche nach nicht existierendem Wert zeigt "Keine Daten gefunden."', async ({ page }) => {
        await page.locator('input.form-control').fill('TestNichtVorhanden');
        await expect(page.locator('table tbody tr td')).toContainText('Keine Daten gefunden');
      });
    });
  }
});

