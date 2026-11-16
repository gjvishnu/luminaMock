import { test, expect, type Page } from '@playwright/test';

const testUser = {
  userUuid: 'test-user-uuid',
  email: 'placement.officer@lumina.edu',
  role: 'PLACEMENT_OFFICER',
  status: 'ACTIVE',
  createdAt: '2026-10-27T18:56:42.858Z',
  updatedAt: '2026-10-27T18:56:42.858Z',
};

async function mockAuthApi(page: Page) {
  await page.route('**/api/users/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Login successful',
        user: testUser,
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
        tokenType: 'Bearer',
      }),
    });
  });

  await page.route('**/api/users/logout', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Logout successful' }),
    });
  });
}

async function login(page: Page) {
  await mockAuthApi(page);
  await page.goto('/login');
  await page.getByLabel('Email address').fill(testUser.email);
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/\/dashboard/);
}

test('root redirects to the dashboard after login', async ({ page }) => {
  await login(page);
  await page.goto('/');

  await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });
  await expect(page.locator('text=Total Students').first()).toBeVisible({ timeout: 5000 });
});

test('login protects the application and all main sections render', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login/);

  await login(page);
  const sections = [
    '/dashboard',
    '/actions',
    '/students',
    '/campusdrive',
    '/jdrecommendation',
    '/reports',
    '/profile',
  ];

  for (const route of sections) {
    await page.goto(route);
    await expect(page).toHaveURL(new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), {
      timeout: 5000,
    });
  }
});

test('header menu only exposes logout', async ({ page }) => {
  await login(page);

  const profileButton = page.locator('button[aria-haspopup="menu"]').first();
  await profileButton.click();

  await expect(page.getByRole('menuitem')).toHaveCount(1);
  await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
  await expect(page.getByText('Switch view')).not.toBeVisible();
});

test('logout clears the session and returns to login', async ({ page }) => {
  await login(page);

  await page.locator('button[aria-haspopup="menu"]').first().click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('heading', { name: 'Sign in to Lumina' })).toBeVisible();
});
