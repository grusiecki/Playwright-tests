import { Page } from '@playwright/test'

export class PanelPage {
    constructor(private page: Page) { }
    quickTransfer = this.page.locator("#quick_btn");
    phoneTopUp = this.page.locator("#phone_btn");
    privateAccount = this.page.locator('#privaccounts_btn');
    payments = this.page.locator('#payments_btn');
    reports = this.page.locator('#reports_btn');
    reportsIframe = this.page.locator('#reports_iframe_btn');
    charts = this.page.locator('#charts_btn;');
    tables = this.page.locator('#tables_btn');
    settings = this.page.locator('#settings_btn');
}