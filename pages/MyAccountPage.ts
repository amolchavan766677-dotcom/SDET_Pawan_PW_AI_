import { Page, Locator } from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly headingMyAccount: Locator;
    private readonly lnkLogout: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingMyAccount = page.locator('#content').getByRole('heading', { name: 'My Account', exact: true });
        this.lnkLogout = page.locator('#column-right').getByRole('link', { name: 'Logout' });
    }

    /**
     * Verifies the My Account page exists
     * @returns Promise<boolean> - true if the My Account page is displayed
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            await this.page.waitForURL(/route=account\/account/);
            return await this.headingMyAccount.isVisible();
        } catch (error) {
            console.log(`Error checking My Account page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the Logout link in the account side menu
     * @returns Promise<LogoutPage> - Instance of the logout page
     */
    async clickLogout(): Promise<LogoutPage> {
        await this.lnkLogout.click();
        return new LogoutPage(this.page);
    }
}
