import { Page } from "@playwright/test";
import {PageHelper} from "./pageHelper"

export class NavigationPage extends PageHelper{
    
    constructor(page: Page){
        super(page);
    }

    async toIotDashboardPage(){        
        await this.page.getByTitle('IoT Dashboard').click();        
    }

    async toFromLayoutsPage(){
        await this.expandGroupMenuItem('Forms');
        await this.page.getByTitle('Form Layouts').click();        
    }

    async toDatePickerPage(){
        await this.expandGroupMenuItem('Forms');
        await this.page.getByTitle('Datepicker').click();
    }

    async toSmartTablePage(){
        await this.expandGroupMenuItem('Tables & Data');        
        await this.page.getByTitle('Smart Table').click();
    }

    async expandGroupMenuItem(title: string){
        const groupMenuItem=  this.page.getByTitle(title);
        const isExpanded = await groupMenuItem.getAttribute('aria-expanded');
        if(isExpanded == "false")
            await groupMenuItem.click();
    }
}