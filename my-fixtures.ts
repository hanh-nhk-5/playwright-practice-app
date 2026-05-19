import {test as base} from '@playwright/test'
import { DatePickerPage } from './page-object/datePickerPage'
import { PageManager } from './page-object/pageManager'
import { FormLayoutsPage } from './page-object/formLayoutPage'
import { IoTDashboardPage } from './page-object/iotDashboard'
import { SmartTablePage } from './page-object/smartTablePage'
import { TooltipPage } from './page-object/tooltipPage'

type MyFixtures = {
    pageManager: PageManager,
    datePickerPage: DatePickerPage,
    formLayoutsPage: FormLayoutsPage,
    iotDashboardPage: IoTDashboardPage,
    smartTablePage: SmartTablePage,
    tooltipPage: TooltipPage
}

export const test= base.extend<MyFixtures>({
    pageManager: async({page}, use)=>{
        await page.goto('/');
        const pageManager = new PageManager(page);
        await use(pageManager);
    },
    datePickerPage: async({pageManager}, use) =>{
        await pageManager.navigate().toDatePickerPage();
        const datePickerPage = pageManager.onDatePickerPage();
        await use(datePickerPage);
    },
    formLayoutsPage: async({pageManager}, use) =>{
        await pageManager.navigate().toFromLayoutsPage();
        const formLayoutsPage = pageManager.onFormLayoutsPage();
        await use(formLayoutsPage);
    },
    iotDashboardPage: async({pageManager}, use) =>{
        await pageManager.navigate().toIotDashboardPage();
        const iotDashboardPage = pageManager.onIoTDashboardPage();
        await use(iotDashboardPage);
    },
    smartTablePage: async({pageManager}, use)=>{
        await pageManager.navigate().toSmartTablePage();
        const smartTablePage = pageManager.onSmartTablePage();
        await use(smartTablePage);
    },
    tooltipPage: async({pageManager}, use)=>{
        await pageManager.navigate().toTooltipPage();
        const tooltipPage = pageManager.onTooltipPage();
        await use(tooltipPage);
    }
});

export { expect } from '@playwright/test';