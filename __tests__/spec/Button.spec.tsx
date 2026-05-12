import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the test page before each test
    await page.goto('/test/button');
  });

  test('renders default button with correct text', async ({ page }) => {
    const button = page.getByTestId('default-btn').getByRole('button');
    await expect(button).toContainText('Default Button');
  });

  test('applies destructive variant', async ({ page }) => {
    const button = page.getByTestId('destructive-btn').getByRole('button');
    // Check for background class
    await expect(button).toHaveClass(/bg-destructive\/10/);
  });

  test('handles click', async ({ page }) => {
    // You'd need to set up a click counter on the test page to verify
    const button = page.getByTestId('default-btn').getByRole('button');
    await button.click();
    // Then assert something changed (e.g., a console log or text update)
  });

  test('disables button when disabled prop is true', async ({ page }) => {
    const button = page.getByTestId('disabled-btn').getByRole('button');
    await expect(button).toBeDisabled();
    await expect(button).toHaveClass(/disabled:opacity-50/);
  });

  test('renders as child component using Slot', async ({ page }) => {
    const link = page.getByTestId('aschild-btn').getByRole('link');
    await expect(link).toHaveAttribute('href', '/home');
    await expect(link).toContainText('Link Button');
  });

  test('renders icon slots correctly', async ({ page }) => {
    const button = page.getByTestId('icon-btn').getByRole('button');
    const hasIconClass = await button.getAttribute('class');
    expect(hasIconClass).toContain('has-data-[icon=inline-start]:pl-2');
  });
});
