import {test, expect} from "../my-fixtures";


test.describe('group', ()=>{
    test.describe.configure({retries: 1});        

    test('test delete records based on filter', async({smartTablePage}, testinfo)=>{
        if(testinfo.retry > 0){            
            console.log("Retrying")
        }
        await smartTablePage.delete('ID', '3');
    })
})

test('test filter', async({smartTablePage})=>{
                
        await smartTablePage.filterBy('E-mail', '@gmail.com');
        await smartTablePage.checkResultsAfterFiltering('E-mail', '@gmail.com');

        await smartTablePage.filterBy('Username', '@mdo'); 
        await smartTablePage.checkResultsAfterFiltering('Username', '@mdo');
    })

