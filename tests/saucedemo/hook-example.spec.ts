import { test , expect } from '@playwright/test';
import { SauceDemoUsers } from '../../utils/test-data';
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';
import { beforeEach, only } from 'node:test';

test.describe('SauceDemo Login Tests', () => {
  
   //ARRANGE- Setting the stage
   let loginPage:LoginPage;
   let productsPage:ProductsPage;
   test.beforeAll (async () =>{
      console.log('Starting products test suite');
   });

   test.beforeEach (async({page}) =>{
   loginPage = new LoginPage(page);
   productsPage = new ProductsPage(page);
   //Login before each test
   await loginPage.goto();
   await loginPage.login(SauceDemoUsers.standard.username, SauceDemoUsers.standard.password);
   });

   test.afterEach(async({page}, testInfo) => {
      if (testInfo.status != testInfo.expectedStatus) {
         await page.screenshot({
            path: `test-results/${testInfo.title}-failure.png`
         });
      }
   });
   test.afterAll(async() =>{
      console.log('Products test suite completed');
   });

/*test('displays all product', async ({page}) => {
   //await expect (page).toHaveURL(/inventory/);
   const productCount = await productsPage.getProductCount();
    expect(productCount).toBe(6);
});
test('can add product to cart', async ({page})=> {
   //await expect (page).toHaveURL(/.*\.com\/inventory\.html/);
   await productsPage.addProductToCartByName('Sauce Labs Backpack');
   const cartCount = await productsPage.getCartItemCount();
   expect(cartCount).toBe('1');
});

test('multiple validations with soft assertions', async({page}) =>{
   //soft assertions-test continues even if it fails

   await expect.soft(page).toHaveURL(/inventory/);
   await expect.soft(productsPage.pageTitle).toHaveText('Products');
   const productCount = await productsPage.getProductCount();
   expect(productCount).toBe(6);
   //Note soft assertions work best with locator-based expects

   //All soft assertion failures reported at end

})
test('visual test - login page', async ({page}) => {
   
   await expect(page).toHaveScreenshot('login-page.png');
});
*/
test('visual-test - product card', async ({page}) => {
   const productCard = page.locator('.inventory_item').first();
   await expect(productCard).toHaveScreenshot('product-card.png');
});

test('visual test - full products page', async ({page}) => {
   await expect(page).toHaveScreenshot('products-page-full.png', { 
      fullPage: true,
      maxDiffPixels: 2500,
      threshold: 0.1,
      animations: 'disabled',
   });
});

});

