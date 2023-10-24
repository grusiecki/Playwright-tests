import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PanelPage } from "../pages/panel.page";

test.describe("Panel operations", () => {
  let loginPage: LoginPage;
  let panelPage: PanelPage;
  const userLogin = loginData.userId;
  const userPassword = loginData.password;
  
  test.beforeEach("open page", async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState("domcontentloaded") //wait till page will full loaded
    loginPage = new LoginPage(page);
    panelPage = new PanelPage(page);
    await loginPage.login(userLogin, userPassword); 
    await page.waitForLoadState("domcontentloaded") //wait till page will full loaded

  });
  test('Money transfer', async ({ page }) => {
    const moneyReceiver = "2";
    const moneyAmount = "1004";
    const transferTitle = "Thank you";
    const confirmationText = `Przelew wykonany! Chuck Demobankowy - ${moneyAmount},00PLN - ${transferTitle}`;
    
    await panelPage.widgetTransferReceiver.selectOption(moneyReceiver);
    await panelPage.transferAmountInput.fill(moneyAmount);
    await panelPage.transferTitleInput.fill(transferTitle);
    await panelPage.sendMoneyButton.click();
    await page.waitForLoadState("domcontentloaded");
    await panelPage.transferConfirmationPopUp.click();

    await expect(page.getByRole('link', { name: confirmationText })).toHaveText(confirmationText);
  });
});