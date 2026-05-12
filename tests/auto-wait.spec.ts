import { expect, test } from "@playwright/test";

test('auto wait', async({page})=>{
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByRole('button', {name:'Button Triggering AJAX Request'}).click();
        
    // await page.waitForSelector('.bg-success');// Wait for selector
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata');//Wait for url response - NOT Recommend

    
    const responseLabel = page.locator('.bg-success');
    // await responseLabel.waitFor({state: 'visible', timeout:16000})//wait for element state
    await expect(responseLabel).toBeVisible({timeout: 16000});//wait using assertion 
    const value = await responseLabel.textContent();

    expect(value).toEqual('Data loaded with AJAX get request.');
    
})