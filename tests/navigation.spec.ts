import { test, expect } from '@playwright/test';

/**
 * Login API removed: the app opens straight into the dashboard.
 * These specs verify every section renders with no login step.
 */
test('root redirects straight to the dashboard', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });
  await expect(page.locator('text=Total Students').first()).toBeVisible({ timeout: 5000 });
});

test('all main sections render without login', async ({ page }) => {
  const sections = [
    '/dashboard',
    '/dashboard/actions',
    '/dashboard/students',
    '/dashboard/campusdrive',
    '/dashboard/jdrecommendation',
    '/dashboard/reports',
    '/dashboard/profile',
  ];

  for (const route of sections) {
    await page.goto(route);
    await page.waitForLoadState('networkidle');
    // No redirect to /login — every page renders directly.
    await expect(page).toHaveURL(new RegExp(route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), {
      timeout: 5000,
    });
  }
});

test('role switch dropdown has all three views', async ({ page }) => {
  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('text=Total Students').first()).toBeVisible({ timeout: 5000 });

  const profileButton = page.locator('button[aria-haspopup="menu"]').first();
  await profileButton.click();
  await page.waitForTimeout(500);

  await expect(page.locator('text=Student').first()).toBeVisible();
  await expect(page.locator('text=Placement Officer').first()).toBeVisible();
  await expect(page.locator('text=Admin').first()).toBeVisible();
});

test('role switch dropdown changes views', async ({ page }) => {
  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('text=Total Students').first()).toBeVisible({ timeout: 5000 });

  const profileButton = page.locator('button[aria-haspopup="menu"]').first();
  await expect(profileButton).toBeVisible();
  await profileButton.click();
  await page.waitForTimeout(500);

  const placementOfficerOption = page.locator('text=Placement Officer').first();
  await expect(placementOfficerOption).toBeVisible({ timeout: 3000 });
  await placementOfficerOption.click();
  await page.waitForTimeout(500);

  await expect(page.locator('text=Welcome, Vikram')).toBeVisible({ timeout: 3000 });
  await expect(page.locator('text=Placement Officer Dashboard')).toBeVisible({ timeout: 3000 });
});
