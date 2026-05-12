import { Page } from "@playwright/test"
import { FormLayoutsPage } from "./formLayoutPage"
import { NavigationPage } from "./navigationPage"
import { DatePickerPage } from "./datePickerPage";
import { IoTDashboardPage} from "./iotDashboard";
import { SmartTablePage } from "./smartTablePage";


export class PageManager{
    private page: Page;
    private navigationPage: NavigationPage;
    private iotDashboardpage: IoTDashboardPage;
    private formLayoutsPage: FormLayoutsPage;
    private datePickerPage: DatePickerPage;
    private smartTablePage: SmartTablePage;

    constructor(page: Page){
        this.page= page;
        this.navigationPage = new NavigationPage(this.page);
        this.iotDashboardpage = new IoTDashboardPage(this.page);
        this.formLayoutsPage= new FormLayoutsPage(this.page);
        this.datePickerPage= new DatePickerPage(this.page);
        this.smartTablePage= new SmartTablePage(this.page);
    }

    navigate(){
        return this.navigationPage;
    }

    onIoTDashboardPage(){
        return this.iotDashboardpage;
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage;
    }

    onDatePickerPage(){
        return this.datePickerPage;
    }

    onSmartTablePage(){
        return this.smartTablePage;
    }
}