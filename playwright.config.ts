import { defineConfig, devices } from '@playwright/test';

//const getBaseURL = () => {
 // const site = process.env.SITE || 'saucedemo';

 // const urls = {
 //   saucedemo: 'https://www.saucedemo.com/',
 //   todomvc: 'https://demo.playwright.dev/todomvc',
 //   automationexercise: 'https://automationexercise.com/',
 //   theinternet: 'https://the-internet.herokuapp.com/',
 // };

//  return urls[site as keyof typeof urls] || urls.saucedemo;
//};

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import * as dotenv from 'dotenv';
// Load environment variables
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
 reporter: [
    
["html", {open:"never"}], 
["@azure/playwright/reporter"],
  ],

  // Global test timeout
  timeout: 30 * 1000, // 30 seconds

  // Global expect timeout
  expect: {
    timeout: 5000, // 5 seconds
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    //{
     // name: 'firefox',
    //  use: { ...devices['Desktop Firefox'] },
    //},

   // {
     // name: 'webkit',
      //use: { ...devices['Desktop Safari'] },
    //},

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
     //  use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

//In test files:
//import { test, expect } from '@playwright/test';
///test ('login with environment variabes', async ({ page }) => {
 // await page.goto('/');
  //Use credentials from .env file
  //await page.locator('#user-name').fill(process.env.SAUCEDEMO_STANDARD_USER!);
  //await page.locator('#password').fill(process.env.SAUCEDEMO_PASSWORD!);
  //await page.locator('#login-button').click();
  //await expect(page).toHaveURL('**/inventory.html');
//});