import { test , expect } from '@playwright/test';
import { SauceDemoUsers } from '../utils/test-data';
test('Login with test data helper', async ({ page }) => {

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
