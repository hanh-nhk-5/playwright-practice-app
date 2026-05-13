import test from "@playwright/test";
import { PageManager } from "../page-object/pageManager";
import {faker} from "@faker-js/faker"

test.beforeEach(async({page})=>{
     await page.goto('/');
})

test.describe('group', ()=>{
    test.describe.configure({retries: 1});        

    test('test delete records based on filter', async({page}, testinfo)=>{
        if(testinfo.retry > 0){            
            console.log("Retrying")
        }
        const pm= new PageManager(page);
        pm.navigate().toSmartTablePage();
        await pm.onSmartTablePage().delete('ID', '3');
    })
})

test('test filter', async({page})=>{
        const pm = new PageManager(page);
        await pm.navigate().toSmartTablePage();   
        
        
        await pm.onSmartTablePage().filterBy('E-mail', '@gmail.com');
        await pm.onSmartTablePage().checkResultsAfterFiltering('E-mail', '@gmail.com');

        await pm.onSmartTablePage().filterBy('Username', '@mdo'); 
        await pm.onSmartTablePage().checkResultsAfterFiltering('Username', '@mdo');
    })

