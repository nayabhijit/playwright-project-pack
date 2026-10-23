import {test as base} from '@playwright/test';
import { LoginPage } from '../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../page-objects/saucedemo/ProductsPage';
import { CartPage } from '../page-objects/saucedemo/CartPage';
import { SauceDemoUsers } from '../utils/test-data';
type CartFixtures = {
    cartWithProducts: CartPage;

};

 export const test = base.extend<CartFixtures>({
    cartWithProducts: async({page},use) => {
        //Setup: Login and add products
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login (
            SauceDemoUsers.standard.username,
            SauceDemoUsers.standard.password
        );
        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.addProductToCartByName('Sauce Labs Bike Light');
        await productsPage.goToCart();
        const cartPage = new CartPage(page);

        //Provide cartPage to test

        await use(cartPage);
        //Teardown: Clear cart (if needed)
        //This runs after test is complete
        console.log ('Test completed, cart can be cleaned up here');
        
    },

 });
 export {expect} from '@playwright/test';
 