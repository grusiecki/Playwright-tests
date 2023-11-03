import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';


test.describe("User login", () => {
  let loginPage: LoginPage;


  test.beforeEach("open page", async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState("domcontentloaded") //wait till page will full loaded
    loginPage = new LoginPage(page);
  });

  test('login with correct credentials', async ({ page }) => {
    //Arrange
    const userLogin = 'gruter08';
    const userPassword = 'resteqwo';
    const expectedUserName = "Jan Demobankowy";
    //Act
    await loginPage.login(userLogin, userPassword);
    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  })

  test('login with too short login', async ({ page }) => {
    //Arrange
    const tooShortUserLogin = 'gru';
    const tooShortUserNameAlert = "identyfikator ma min. 8 znaków";
    //Act
    await loginPage.loginInput.fill(tooShortUserLogin);
    await loginPage.passwordInput.click();
    //Assert
    await expect(loginPage.loginError).toHaveText(tooShortUserNameAlert);
  })
  test('login with too short password', async ({ page }) => {
    //Arrange
    const userLogin = 'gruter08';
    const tooShortPassword = '12345';
    const tooShortPasswordAlert = "hasło ma min. 8 znaków";
    //Act
    await loginPage.loginInput.fill(userLogin);
    await loginPage.passwordInput.fill(tooShortPassword);
    await loginPage.loginButton.click({ force: true });
    //Assert
    await expect(loginPage.passwordError).toHaveText(tooShortPasswordAlert);
  })
  test('correct login and logout', async ({ page }) => {
    //Arrange
    const userLogin = 'gruter08';
    const userPassword = 'resteqwo';
    const expectedUserName = "Jan Demobankowy";
    const expectedSignInScreenText = "Wersja demonstracyjna serwisu Demobank";
    //Act
    await page.getByTestId('login-input').fill(userLogin);
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    await page.getByTestId('user-name').click();
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
    await page.getByTestId('logout-button').click();
    //Assert
    await expect(page.getByRole('heading', { name: expectedSignInScreenText })).toHaveText(expectedSignInScreenText);
  })
  const loginsAndPasswords = [{
    login: "qwertyui",
    password: "12345678"
  },
  {
    login: "asdfghjk",
    password: "87654321"
  },
  {
    login: "zxcvbnmm",
    password: "23456789"
  },
  {
    login: "lokijuhy",
    password: "98765432"
  }, {
    login: "qawsedrf",
    password: "11111111"
  }
  ]
  loginsAndPasswords.forEach(data => {
    test(`multiple logins with ${data.login} account`, async ({ page }) => {
      //Arrange
      const expectedUserName = "Jan Demobankowy";
      //Act
      loginPage.login(data.login, data.password);
      //Assert
      await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);

    })
  });
});

