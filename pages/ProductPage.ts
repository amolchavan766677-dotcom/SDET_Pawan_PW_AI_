import { Page, Locator } from '@playwright/test';
import { ShoppingCartPage } from './ShoppingCartPage';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly headingProductName: Locator;
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly msgSuccess: Locator;
    private readonly lnkShoppingCart: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingProductName = page.locator('#content h1');
        this.txtQuantity = page.locator('#input-quantity');
        this.btnAddToCart = page.locator('#button-cart');
        this.msgSuccess = page.locator('#alert .alert-success');
        this.lnkShoppingCart = page.locator('#top').getByRole('link', { name: 'Shopping Cart' });
    }

    /**
     * Gets the product name shown on the product details page
     * @returns Promise<string> - Product name
     */
    async getProductName(): Promise<string> {
        await this.page.waitForURL(/route=product\/product/);
        return await this.headingProductName.innerText();
    }

    /**
     * Sets the quantity to add to the cart
     * @param quantity - Quantity to enter
     */
    async setQuantity(quantity: string): Promise<void> {
        await this.txtQuantity.fill(quantity);
    }

    /**
     * Clicks the "Add to Cart" button
     */
    async addToCart(): Promise<void> {
        await this.btnAddToCart.click();
    }

    /**
     * Gets the success message shown after adding a product to the cart
     * @returns Promise<string> - Success message text
     */
    async getConfirmationMessage(): Promise<string> {
        await this.msgSuccess.waitFor();
        return (await this.msgSuccess.innerText()).trim();
    }

    /**
     * Opens the shopping cart from the top navigation
     * @returns Promise<ShoppingCartPage> - Instance of the shopping cart page
     */
    async clickShoppingCart(): Promise<ShoppingCartPage> {
        await this.lnkShoppingCart.click();
        return new ShoppingCartPage(this.page);
    }
}
