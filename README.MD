# Playwright Project Pack

## Setup
```bash
 
npm install
 
```
```bash
 
npx playwright install
 
```
### Running Tests
```bash
 
# Run all tests
 
npm test
```
# Run specific Test

```bash
npm run test:saucedemo
 
npm run test:todomvc
```

# Run in headed
```bash
npm run test:headed
 
# Run specific browser
 
npm run test:chromium
 
npm run test:firefox
 
```
```
 
├── tests/ # Test files
 
│ ├── saucedemo.spec.ts
 
│ └── todomvc.spec.ts
 
├── page-objects/ # Page object models
 
├── test-data/ # Test data
 
├── utils/ # Helper functions
 
│ └── test-data.ts
 
├── .env.example # Environment variables template


