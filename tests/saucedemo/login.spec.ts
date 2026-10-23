import { test , expect } from '@playwright/test';
import { SauceDemoUsers } from '../../utils/test-data';
import { LoginPage } from '../../page-objects/saucedemo/LoginPage';
import { ProductsPage } from '../../page-objects/saucedemo/ProductsPage';
import { beforeEach, only } from 'node:test';
/*test('Login with test data helper', async ({ page }) => {

    //Go to the saucedemo website
    await page.goto('/');

    // Fill in username
    await page.locator('#user-name').fill(SauceDemoUsers.standard.username);

    // Fill in password
    await page.locator('#password').fill(SauceDemoUsers.standard.password);

    // Click login button
    await page.locator('#login-button').click();

    //Wait for Inventory page to load
    await expect(page).toHaveURL('/inventory.html');

    //Verify we're on the products page
   // await expect (page.getByText('Products')).toBeVisible();

    //screenshot test
   // await page.screenshot({ path: 'saucedemo-login.png' });
});
*/
test.describe('SauceDemo Login Tests', () => {
  
   //ARRANGE- Setting the stage
   let loginPage:LoginPage;
   let productsPage:ProductsPage;
   test.beforeEach (async({page}) =>{
   loginPage = new LoginPage(page);
   productsPage = new ProductsPage(page);
   await loginPage.goto();
   });

test('successful login with standard user', async ({page}) => {
    
    //ACT - Perform the action
    await loginPage.login(SauceDemoUsers.standard.username, SauceDemoUsers.standard.password);
    
    //ASSERT - verfify the results
    await expect(page).toHaveURL(/inventory\.html/);
    const productsPage = new ProductsPage(page);
    await expect (productsPage.pageTitle).toHaveText('Products');

    //Verify we see products
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
});

 test('login fails with invalid credentials', async ({page}) => {
   
    await loginPage.login(SauceDemoUsers.invalid.username, SauceDemoUsers.invalid.password);
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match');
 });

 test('login fails with loacked out user', async ({page})=> {
  
    await loginPage.login(SauceDemoUsers.locked.username, SauceDemoUsers.locked.password);
    const errortext = await loginPage.getErrorMessage();
    expect(errortext).toContain('Sorry, this user has been locked out');
 });

test('can clear error message', async ({page})=> {

    await loginPage.login(SauceDemoUsers.invalid.username, SauceDemoUsers.invalid.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await loginPage.clearError();
    await expect(loginPage.errorMessage).not.toBeVisible();
 });

});

