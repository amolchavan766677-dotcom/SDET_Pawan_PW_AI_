import { Page, Locator } from '@playwright/test';

export class ShoppingCartPage {
    private readonly page: Page;

    // Locators
    private readonly headingShoppingCart: Locator;
    private readonly cartRows: Locator;
    private readonly totalRows: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingShoppingCart = page.locator('#content h1');
        this.cartRows = page.locator('#shopping-cart tbody tr');
        this.totalRows = page.locator('#checkout-total tr');
    }

    /**
     * Verifies the shopping cart page exists
     * @returns Promise<boolean> - true if the shopping cart page is displayed
     */
    async isShoppingCartPageExists(): Promise<boolean> {
        try {
            await this.page.waitForURL(/route=checkout\/cart/);
            const heading = await this.headingShoppingCart.innerText();
            return heading.startsWith('Shopping Cart');
        } catch (error) {
            console.log(`Error checking shopping cart page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the name of the product in the given cart row
     * @param productName - Product name used to find the cart row
     * @returns Promise<string> - Product name shown in the cart
     */
    async getProductName(productName: string): Promise<string> {
        return await this.getProductRow(productName).locator('td').nth(1).getByRole('link').innerText();
    }

    /**
     * Gets the quantity of the given product in the cart
     * @param productName - Product name used to find the cart row
     * @returns Promise<string> - Quantity value
     */
    async getProductQuantity(productName: string): Promise<string> {
        return await this.getProductRow(productName).locator('input[name="quantity"]').inputValue();
    }

    /**
     * Gets the unit price of the given product in the cart
     * @param productName - Product name used to find the cart row
     * @returns Promise<string> - Unit price text (e.g. "$602.00")
     */
    async getProductPrice(productName: string): Promise<string> {
        return (await this.getProductRow(productName).locator('td').nth(3).innerText()).trim();
    }

    /**
     * Gets the line total of the given product in the cart
     * @param productName - Product name used to find the cart row
     * @returns Promise<string> - Line total text (e.g. "$602.00")
     */
    async getProductTotal(productName: string): Promise<string> {
        return (await this.getProductRow(productName).locator('td').nth(4).innerText()).trim();
    }

    /**
     * Gets the cart's grand total from the totals table
     * @returns Promise<string> - Total price text (e.g. "$602.00")
     */
    async getTotalPrice(): Promise<string> {
        const totalRow = this.totalRows.filter({ has: this.page.getByText('Total', { exact: true }) });
        return (await totalRow.locator('td').last().innerText()).trim();
    }

    /**
     * Finds the cart row for the given product
     * @param productName - Product name
     * @returns Locator - Cart table row containing the product
     */
    private getProductRow(productName: string): Locator {
        return this.cartRows.filter({
            has: this.page.getByRole('link', { name: productName, exact: true }),
        });
    }
}
