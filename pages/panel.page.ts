import { Page } from '@playwright/test'

export class PanelPage {
    constructor(private page: Page) {}
widgetTransferReceiver = this.page.locator('#widget_1_transfer_receiver');
transferAmountInput = this.page.locator('#widget_1_transfer_amount');
transferTitleInput = this.page.locator('#widget_1_transfer_title');
sendMoneyButton = this.page.getByRole('button', { name: 'wykonaj' });
transferConfirmationPopUp = this.page.getByTestId('close-button');

}