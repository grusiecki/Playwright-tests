import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('asdadsas');
  await page.getByTestId('password-input').fill('d');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('ddffsdfd');
  await page.getByTestId('login-button').click();
  await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
  await page.locator('#widget_1_topup_receiver').click();
  await page.locator('#widget_1_topup_amount').click();
  await page.locator('#widget_1_topup_amount').fill('30');
  await page.getByText('doładowanie telefonu do 500 xxx xxx wybierz telefon do doładowania 500 xxx xxx 5').click();
  await page.locator('#uniform-widget_1_topup_agreement span').click();
  await page.locator('#uniform-widget_1_topup_agreement span').click();
  await page.locator('#uniform-widget_1_topup_agreement span').click();
  await page.getByRole('button', { name: 'doładuj telefon' }).click();
  await page.getByTestId('close-button').click();
  await page.getByRole('link', { name: 'Doładowanie wykonane! 30,00PLN na numer 500 xxx xxx' }).click();
});