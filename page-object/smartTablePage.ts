import { Page, Locator, expect } from "@playwright/test";
import { PageHelper } from "./pageHelper";


const filterFields: Record<string, number>= {
    'ID': 1,
    'First Name':2,
    'Last Name' : 3,
    'Username' : 4,
    'E-mail' : 5,
    'Age' : 6
};

type Placeholder_ColumnIndex= {placeholder: string, columnIndex: number}

const filterFieldInfo: Record<string, Placeholder_ColumnIndex>= {
    'ID': {placeholder: 'ID', columnIndex: 1},
    'First Name': {placeholder: 'First Name', columnIndex: 2},
    'Last Name': {placeholder: 'Last Name', columnIndex: 3},
    'Username': {placeholder: 'Username', columnIndex: 4},
    'E-mail': {placeholder: 'E-mail', columnIndex: 5},
    'Age': {placeholder: 'Age', columnIndex: 6}
};

export class SmartTablePage extends PageHelper{    
    paging: Locator;
    constructor(page: Page){
        super(page);
        this.paging= this.page.locator('ng2-smart-table-pager');
    }
    
    async filterBy(filterName: string, value: string){
        await this.page.locator('input-filter').getByPlaceholder(filterFieldInfo[filterName].placeholder).fill(value);    
        await this.page.waitForTimeout(1000);    
    }

    async checkResultsAfterFiltering(filterName: string, value: string){
        const rows= await this.page.locator('ng2-smart-table tbody tr').all();
        
        let i=0;
        for(let tr of rows){            
            await expect(tr.locator('td').nth(filterFieldInfo[filterName].columnIndex)).toContainText(value);
        }  
    }

    async delete(filterName: string, value: string){

        //handle the browser alert popup when deleting a record in the grid
        this.page.on('dialog', (dialog)=>{            
            dialog.accept();
        });

        await this.filterBy(filterName, value);

        const regEx= new RegExp(`^${value}$`); //matching value
        let count=0;
        let rows= this.page.locator('tbody tr').filter({has: this.page.locator('td').nth(filterFieldInfo[filterName].columnIndex).filter({hasText: regEx})});        
        while(await rows.count() > 0){        
            await rows.nth(0).locator('.ng2-smart-action-delete-delete').click({timeout:3000});
            rows= this.page.locator('tbody tr').filter({has: this.page.locator('td').nth(filterFieldInfo[filterName].columnIndex).filter({hasText: regEx})});        
            count++;
        }        

        console.log(`Number of records were deleted: ${count}`);
    }
}