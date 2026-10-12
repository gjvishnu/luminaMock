import { defineConfig } from '@playwright/test';

/** No backend, no auth setup — specs hit the Vite dev server directly. */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:5173',
  },
});
