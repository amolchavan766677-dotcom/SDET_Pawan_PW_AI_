import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly headingSearch: Locator;
    private readonly productTitles: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingSearch = page.locator('#content h1');
        this.productTitles = page.locator('.product-thumb h4 a');
    }

    /**
     * Verifies the search results page exists
     * @returns Promise<boolean> - true if the search results page is displayed
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            await this.page.waitForURL(/route=product\/search/);
            const heading = await this.headingSearch.innerText();
            return heading.startsWith('Search');
        } catch (error) {
            console.log(`Error checking search results page: ${error}`);
            return false;
        }
    }

    /**
     * Checks whether a product with the exact name is listed in the results
     * @param productName - Product name to look for
     * @returns Promise<boolean> - true if the product is listed
     */
    async isProductExist(productName: string): Promise<boolean> {
        const titles = await this.productTitles.allInnerTexts();
        return titles.includes(productName);
    }

    /**
     * Opens the product details page for the given product
     * @param productName - Product name to open
     * @returns Promise<ProductPage> - Instance of the product page
     */
    async selectProduct(productName: string): Promise<ProductPage> {
        await this.productTitles.filter({ hasText: new RegExp(`^${productName}$`) }).first().click();
        return new ProductPage(this.page);
    }
}
