import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
    private readonly page: Page;

    // Locators
    private readonly headingRegister: Locator;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly chkPrivacyPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingRegister = page.getByRole('heading', { name: 'Register Account' });
        this.txtFirstName = page.getByRole('textbox', { name: '* First Name' });
        this.txtLastName = page.getByRole('textbox', { name: '* Last Name' });
        this.txtEmail = page.getByRole('textbox', { name: '* E-Mail' });
        this.txtPassword = page.getByRole('textbox', { name: '* Password' });
        this.chkPrivacyPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.locator('#content').getByRole('button', { name: 'Continue' });
        this.msgConfirmation = page.locator('#content h1');
    }

    /**
     * Verifies the registration page exists
     * @returns Promise<boolean> - true if the registration page is displayed
     */
    async isRegistrationPageExists(): Promise<boolean> {
        try {
            return await this.headingRegister.isVisible();
        } catch (error) {
            console.log(`Error checking registration page: ${error}`);
            return false;
        }
    }

    /**
     * Enters the first name
     * @param firstName - First name to enter
     */
    async setFirstName(firstName: string): Promise<void> {
        await this.txtFirstName.fill(firstName);
    }

    /**
     * Enters the last name
     * @param lastName - Last name to enter
     */
    async setLastName(lastName: string): Promise<void> {
        await this.txtLastName.fill(lastName);
    }

    /**
     * Enters the email address
     * @param email - Email address to enter
     */
    async setEmail(email: string): Promise<void> {
        await this.txtEmail.fill(email);
    }

    /**
     * Enters the password
     * @param password - Password to enter
     */
    async setPassword(password: string): Promise<void> {
        await this.txtPassword.fill(password);
    }

    /**
     * Accepts the Privacy Policy
     */
    async setPrivacyPolicy(): Promise<void> {
        await this.chkPrivacyPolicy.check();
    }

    /**
     * Clicks the Continue button to submit the registration form
     */
    async clickContinue(): Promise<void> {
        await this.btnContinue.click();
    }

    /**
     * Gets the confirmation heading shown after registration
     * @returns Promise<string> - Confirmation message text
     */
    async getConfirmationMsg(): Promise<string> {
        return await this.msgConfirmation.innerText();
    }

    /**
     * Fills and submits the registration form
     * @param userData - Customer details used for registration
     */
    async completeRegistration(userData: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }): Promise<void> {
        try {
            await this.setFirstName(userData.firstName);
            await this.setLastName(userData.lastName);
            await this.setEmail(userData.email);
            await this.setPassword(userData.password);
            await this.setPrivacyPolicy();
            await this.clickContinue();
            await this.page.waitForURL(/route=account\/success/);
        } catch (error) {
            console.log(`Error completing registration: ${error}`);
            throw error;
        }
    }
}
