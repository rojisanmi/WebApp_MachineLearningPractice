/**
 * E2E Tests — Critical user flows
 */

import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load dashboard with hero and module cards', async ({ page }) => {
    // Check hero
    await expect(page.locator('h1')).toContainText('ML Lab');
    await expect(page.locator('text=Visualisasi. Eksperimen. Paham.')).toBeVisible();

    // Check stats
    await expect(page.locator('text=4 Modul')).toBeVisible();
    await expect(page.locator('text=23 Soal')).toBeVisible();

    // Check module cards
    await expect(page.locator('text=Clustering')).toBeVisible();
    await expect(page.locator('text=Reinforcement Learning')).toBeVisible();
    await expect(page.locator('text=Ensemble Learning')).toBeVisible();
    await expect(page.locator('text=Latihan Terstruktur')).toBeVisible();
  });

  test('should navigate to Clustering module', async ({ page }) => {
    await page.click('ml-link[href="/clustering"]');
    await expect(page).toHaveURL(/\/clustering/);
    await expect(page.locator('h1')).toContainText('Clustering');
  });

  test('should navigate to Exercises', async ({ page }) => {
    await page.click('ml-link[href="/exercises"]');
    await expect(page).toHaveURL(/\/exercises/);
    await expect(page.locator('h1')).toContainText('Latihan Terstruktur');
  });

  test('theme toggle should work', async ({ page }) => {
    const themeToggle = page.locator('ml-theme-toggle');
    await expect(themeToggle).toBeVisible();

    // Click toggle
    await themeToggle.click();
    await page.waitForTimeout(100);

    // Check theme changed (data-theme attribute on html)
    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    expect(['light', 'dark']).toContain(theme);
  });
});

test.describe('Clustering Module', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/clustering/kmeans');
    await page.waitForLoadState('networkidle');
  });

  test('should load K-Means page with sidebar navigation', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('K-Means');
    await expect(page.locator('text=Overview')).toBeVisible();
    await expect(page.locator('text=K-Means')).toBeVisible();
    await expect(page.locator('text=DBSCAN')).toBeVisible();
  });

  test('should have canvas element', async ({ page }) => {
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
    await expect(canvas).toHaveAttribute('width');
    await expect(canvas).toHaveAttribute('height');
  });

  test('should have control panel', async ({ page }) => {
    await expect(page.locator('text=Kontrol K-Means')).toBeVisible();
    await expect(page.locator('text=Jumlah Cluster (K)')).toBeVisible();
  });
});

test.describe('Exercises', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/exercises/ahc');
    await page.waitForLoadState('networkidle');
  });

  test('should load AHC exercise with progress header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('AHC Exercise');
    await expect(page.locator('text=Deadline')).toBeVisible();
    await expect(page.locator('text=Progress')).toBeVisible();
  });

  test('should show question list in sidebar', async ({ page }) => {
    await expect(page.locator('text=Daftar Soal')).toBeVisible();
    await expect(page.locator('text=Soal 1')).toBeVisible();
    await expect(page.locator('text=Soal 2')).toBeVisible();
  });

  test('should show question content', async ({ page }) => {
    await expect(page.locator('text=Soal 3')).toBeVisible();
    await expect(page.locator('text=Complete Linkage')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('should have skip link', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.locator('.skip-link');
    await expect(skipLink).toBeHidden(); // hidden by default

    // Focus should reveal it
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1); // Only one h1 per page
  });

  test('buttons should have accessible names', async ({ page }) => {
    await page.goto('/clustering/kmeans');
    const buttons = page.locator('ml-button, button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const btn = buttons.nth(i);
      const accessibleName = await btn.getAttribute('aria-label') ||
                            await btn.textContent() ||
                            await btn.getAttribute('title');
      expect(accessibleName?.trim()).toBeTruthy();
    }
  });
});

test.describe('Responsive', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Hero should be visible
    await expect(page.locator('h1')).toBeVisible();

    // Module cards should stack vertically
    const cards = page.locator('.module-card');
    await expect(cards.first()).toBeVisible();
  });

  test('should work on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/clustering/kmeans');
    await page.waitForLoadState('networkidle');

    // Sidebar should be visible on tablet
    await expect(page.locator('text=Overview')).toBeVisible();
  });
});