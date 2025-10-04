import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: [['html', { open: 'always' }], ['list'], ['junit', { outputFile: 'test-results/results.xml' }]],
});