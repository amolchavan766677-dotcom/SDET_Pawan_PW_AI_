import { Page, Locator } from '@playwright/test';
import { RegistrationPage } from './RegistrationPage';
import { LoginPage } from './LoginPage';
import { SearchResultsPage } from './SearchResultsPage';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly lnkLogin: Locator;
    private readonly txtSearchBox: Locator;
    private readonly btnSearch: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lnkMyAccount = page.getByRole('button', { name: 'My Account' });
        this.lnkRegister = page.locator('#top').getByRole('link', { name: 'Register' });
        this.lnkLogin = page.locator('#top').getByRole('link', { name: 'Login' });
        this.txtSearchBox = page.locator('header').getByPlaceholder('Search');
        this.btnSearch = page.locator('header form button[type="submit"]');
    }

    /**
     * Verifies the home page exists
     * @returns Promise<boolean> - true if the home page is displayed
     */
    async isHomePageExists(): Promise<boolean> {
        try {
            const title = await this.page.title();
            return title === 'Your Store';
        } catch (error) {
            console.log(`Error checking home page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the "My Account" menu in the top navigation
     */
    async clickMyAccount(): Promise<void> {
        await this.lnkMyAccount.click();
    }

    /**
     * Clicks the "Register" option under "My Account"
     * @returns Promise<RegistrationPage> - Instance of the registration page
     */
    async clickRegister(): Promise<RegistrationPage> {
        await this.lnkRegister.click();
        return new RegistrationPage(this.page);
    }

    /**
     * Clicks the "Login" option under "My Account"
     * @returns Promise<LoginPage> - Instance of the login page
     */
    async clickLogin(): Promise<LoginPage> {
        await this.lnkLogin.click();
        return new LoginPage(this.page);
    }

    /**
     * Enters a product name in the header search box
     * @param productName - Product name to search for
     */
    async enterProductName(productName: string): Promise<void> {
        await this.txtSearchBox.fill(productName);
    }

    /**
     * Clicks the header search button
     * @returns Promise<SearchResultsPage> - Instance of the search results page
     */
    async clickSearch(): Promise<SearchResultsPage> {
        await this.btnSearch.click();
        return new SearchResultsPage(this.page);
    }
}
