import test from "@playwright/test";
import { PageManager } from "../page-object/pageManager";

test.beforeEach(async({page})=>{
     await page.goto('/');
})

test('test filter', async({page})=>{
    const pm = new PageManager(page);
    await pm.navigate().toSmartTablePage();
    
    // await pm.onSmartTablePage().paging.waitFor({state: 'visible'});
    
    await pm.onSmartTablePage().filterBy('E-mail', '@gmail.com');
    await pm.onSmartTablePage().checkResultsAfterFiltering('E-mail', '@gmail.com');

    await pm.onSmartTablePage().filterBy('Username', '@mdo'); 
    await pm.onSmartTablePage().checkResultsAfterFiltering('Username', '@mdo');
})

test('test delete records based on filter', async({page})=>{
    const pm= new PageManager(page);
    pm.navigate().toSmartTablePage();
    await pm.onSmartTablePage().delete('ID', '3');
})