import { test, expect } from '@playwright/test';


test.describe("User login", () => {
// test.describe('navigation', () => {
// test.beforeEach(async ({ page }) => {
//     // Go to the starting url before each test.
//     await page.goto('https://demo-bank.vercel.app/');
// });

test('login with correct credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('gruter08');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('resteqwo');
  await page.getByTestId('login-button').click();
  await page.getByTestId('user-name').click();
  await expect (page.getByTestId('user-name')).toHaveText("Jan Demobankowy");
})

test('login with incorrect credentials', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('gru');
  await page.getByTestId('password-input').click();
  await expect (page.getByTestId('error-login-id')).toHaveText("identyfikator ma min. 8 znaków");
})
test('correct login and logout', async ({ page }) =>{
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('gruter08');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('resteqwo');
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();
    await expect (page.getByTestId('user-name')).toHaveText("Jan Demobankowy");
    await page.getByTestId('logout-button').click();
    await expect (page.getByRole('heading', { name: 'Wersja demonstracyjna serwisu Demobank' })).toHaveText("Wersja demonstracyjna serwisu Demobank");
    })
//await page.waitForLoadState("domcontentloaded") wait till page will full loaded
});
