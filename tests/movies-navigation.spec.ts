import { test, expect } from '@playwright/test';
import movies from '../mock.json';

const activeMovies = movies.filter(m => !m.deleted);
const deletedMovies = movies.filter(m => m.deleted);

for (const movie of activeMovies) {
  test(`cartonasul "${movie.title}" (id=${movie.id}) navigheaza corect`, async ({ page }) => {
    await page.goto('http://localhost:3000/movies');

    await page.locator(`a[href="/movies/${movie.id}"]`).click();

    await expect(page).toHaveURL(`http://localhost:3000/movies/${movie.id}`);

    await expect(
      page.getByRole('heading', { name: `Movie id: ${movie.id}` })
    ).toBeVisible();
  });
}

for (const movie of deletedMovies) {
  test(`filmul sters "${movie.title}" (id=${movie.id}) nu apare in catalog`, async ({ page }) => {
    await page.goto('http://localhost:3000/movies');

    await expect(page.locator(`a[href="/movies/${movie.id}"]`)).not.toBeVisible();
  });
}
