import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";

test.describe("Panel operations", () => {
    
    const userLogin = loginData.userId;
    const userPassword = loginData.password;
    


    test.beforeEach("open page", async ({ page }) => {
        await page.goto("/");
        await page.waitForLoadState("domcontentloaded"); //wait till page will full loaded
        await page.getByTestId("login-input").fill(userLogin);
        await page.getByTestId("password-input").fill(userPassword);
        await page.getByTestId("login-button").click();
        await page.getByTestId("user-name").click();
      });
      test('Money transfer', async ({ page }) => {
        const moneyReceiver = "2";
        const moneyAmount = "1004";
        const transferTitle = "Thank you";
        const confirmationText = `Przelew wykonany! Chuck Demobankowy - ${moneyAmount},00PLN - ${transferTitle}`;

      await page.locator('#widget_1_transfer_receiver').selectOption(moneyReceiver);
      await page.locator('#widget_1_transfer_amount').fill(moneyAmount);
      await page.locator('#widget_1_transfer_title').fill(transferTitle);
      await page.getByRole('button', { name: 'wykonaj' }).click();
      await page.waitForLoadState("domcontentloaded");
      await page.getByTestId('close-button').click();
      
      await expect (page.getByRole('link', { name: confirmationText })).toHaveText(confirmationText);
      });
});