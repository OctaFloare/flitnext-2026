import { test as setup } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('http://localhost:3000/movies');
  await page.waitForURL('http://localhost:3000/login');
  await page.getByPlaceholder('Login').fill('admin');
  await page.getByPlaceholder('Password').fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('http://localhost:3000/');
  await page.context().storageState({ path: authFile });
});
