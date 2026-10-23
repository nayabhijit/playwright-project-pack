import {test, expect} from '@playwright/test';
import { SauceDemoUsers } from '../../utils/test-data';
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';
import { CartPage } from '../../page-objects/saucedemo/CartPage';
import { beforeEach, only } from 'node:test';
test.describe('Cart Item Display Details', () => {
    
     let loginPage:LoginPage;
     let productsPage:ProductsPage;
     let cartPage: CartPage;
    
    test.beforeEach (async ({page}) => {
  
       loginPage = new LoginPage(page);
       productsPage = new ProductsPage(page);
       cartPage= new CartPage(page);

      //login before each test
      await loginPage.goto();
      await loginPage.login(SauceDemoUsers.standard.username, SauceDemoUsers.standard.password);
  
     });

     test('should display correct quantity for each cart item', async() => {
        //Add multiple items

      await productsPage.addProductToCartByName('Sauce Labs Backpack');
      await productsPage.addProductToCartByName('Sauce Labs Bike Light');
      await productsPage.addProductToCartByName('Sauce Labs Bolt T-Shirt');
      await productsPage.clickShoppingCart();

      //Each item should have should have quantity of 1

      const backpackDetails = await cartPage.getCartItemdetails('Sauce Labs Backpack');
      const bikeLightDetails = await cartPage.getCartItemdetails('Sauce Labs Bike Light');
      const tshirtDetails = await cartPage.getCartItemdetails('Sauce Labs Bolt T-Shirt');

      //Verify quantities
      expect(backpackDetails.quantity).toBe(1);
      expect(bikeLightDetails.quantity).toBe(1);
      expect(tshirtDetails.quantity).toBe(1);

      //Verify names match expected
      expect(backpackDetails.name).toBe('Sauce Labs Backpack');
      expect(bikeLightDetails.name).toBe('Sauce Labs Bike Light');
      expect(tshirtDetails.name).toBe('Sauce Labs Bolt T-Shirt');

        
     });

     test('should display product descriptions in cart', async() =>{
        //Add items with known descriptions
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.addProductToCartByName('Sauce Labs Onesie');
        await productsPage.clickShoppingCart();

        //Get descriptions from cart
        const backpackDescription = await cartPage.getProductDescription('Sauce Labs Backpack');
        const onesieDescription = await cartPage.getProductDescription('Sauce Labs Onesie');

        //Verify descriptions and have content
        expect(backpackDescription).toBeTruthy();
        expect(backpackDescription.length).toBeGreaterThan(0);
        expect(backpackDescription).toContain('carry.allTheThings()');
        expect(onesieDescription).toBeTruthy();
        expect(onesieDescription.length).toBeGreaterThan(0);
        expect(onesieDescription).toContain('junior automation engineer');
     });

})