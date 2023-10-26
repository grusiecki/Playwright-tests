import { Page } from '@playwright/test'

export class PanelPage {
    constructor(private page: Page) { }
    widgetTransferReceiver = this.page.locator('#widget_1_transfer_receiver');
    transferAmountInput = this.page.locator('#widget_1_transfer_amount');
    transferTitleInput = this.page.locator('#widget_1_transfer_title');
    sendMoneyButton = this.page.getByRole('button', { name: 'wykonaj' });
    transferConfirmationPopUp = this.page.getByTestId('close-button');

    topUpReceiver = this.page.locator('#widget_1_topup_receiver');
    topUpAmount = this.page.locator('#widget_1_topup_amount');
    termsTopUpCheckbox = this.page.locator('#uniform-widget_1_topup_agreement span');
    topUpConfirmationButton = this.page.getByRole('button', { name: 'doładuj telefon' });

    async topUp(topUpReceiver: string, topUpAmount: string): Promise<void> {
        
        await this.topUpReceiver.click();
        await this.topUpReceiver.selectOption(topUpReceiver);
        await this.topUpAmount.fill(topUpAmount);
        await this.termsTopUpCheckbox.click();
        await this.topUpConfirmationButton.click();
        await this.transferConfirmationPopUp.click();
    }

}