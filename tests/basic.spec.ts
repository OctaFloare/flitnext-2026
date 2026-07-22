// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Flitnext/);
});

test('check movies page', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('link', { name: 'Movies' }).click();

  await expect(page).toHaveURL('http://localhost:3000/movies');
  await expect(page.getByTestId('movie-card').first()).toBeVisible();
});

