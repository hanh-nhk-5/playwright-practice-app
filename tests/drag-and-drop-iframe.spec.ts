import { test, Page , expect} from "@playwright/test";

test.beforeEach(async({page})=>{
    await page.goto(process.env.globalsqaURL!);
})

test('drag and drop within iFrame', async({page})=>{
    const iFrame = page.frameLocator('[rel-title="Photo Manager"] iframe');
    const trash = iFrame.locator('div#trash');
    await iFrame.locator('ul#gallery li').filter({hasText: 'High Tatras 2'}).dragTo(trash);

    await iFrame.locator('ul#gallery li').filter({hasText: 'High Tatras 4'}).hover();
    await page.mouse.down();
    await trash.hover();
    await page.mouse.up()

    await expect(trash.locator('li h5')).toHaveText(['High Tatras 2', 'High Tatras 4']);
})