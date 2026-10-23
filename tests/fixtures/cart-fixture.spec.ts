import {test,expect} from '../../fixtures/cart-fixtures';
test('remove item from from prefilledcart', async ({page, cartWithProducts}) => {
    //Cart already has 2 items
    let itemCount = await cartWithProducts.getCartItemCount();
    expect(itemCount).toBe(2);
    await cartWithProducts.removeItemByName('Sauce Labs Backpack');
    itemCount = await cartWithProducts.getCartItemCount();
    expect(itemCount).toBe(1);
});