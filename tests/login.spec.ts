import { test, expect } from '@playwright/test';


test.describe("User login", () => {

//Arrange
const userLogin = 'gruter08';
const userPassword = 'resteqwo';
const expectedUserName = "Jan Demobankowy";
const tooShortUserLogin = 'gru';
const tooShortUserNameAlert = "identyfikator ma min. 8 znaków";
const tooShortPassword = '12345';
const tooShortPasswordAlert = "hasło ma min. 8 znaków";
const expectedSignInScreenText = "Wersja demonstracyjna serwisu Demobank";

//Act
test.beforeEach("open page",async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.waitForLoadState("domcontentloaded") //wait till page will full loaded
    await page.getByTestId('login-input').click();
});


test('login with correct credentials', async ({ page }) => {
  await page.getByTestId('login-input').fill(userLogin);
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill(userPassword);
  await page.getByTestId('login-button').click();
  await page.getByTestId('user-name').click();
  //Assert
  await expect (page.getByTestId('user-name')).toHaveText(expectedUserName);
})

test('login with too short login', async ({ page }) => {
  await page.getByTestId('login-input').fill(tooShortUserLogin);
  await page.getByTestId('password-input').click();
  //Assert
  await expect (page.getByTestId('error-login-id')).toHaveText(tooShortUserNameAlert);
})
test('login with too short password', async ({ page }) => {

  await page.getByTestId('login-input').fill(userLogin);
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill(tooShortPassword);
  await page.getByTestId('login-button').click({ force: true });
  //Assert
  await expect (page.getByTestId('error-login-password')).toHaveText(tooShortPasswordAlert);
})
test('correct login and logout', async ({ page }) =>{
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();
    await expect (page.getByTestId('user-name')).toHaveText(expectedUserName);
    await page.getByTestId('logout-button').click();
    //Assert
    await expect (page.getByRole('heading', { name: expectedSignInScreenText })).toHaveText(expectedSignInScreenText);
    })

});