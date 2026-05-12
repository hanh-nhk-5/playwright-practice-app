import { test, Page, expect } from "@playwright/test";
import { PageManager } from "../page-object/pageManager";


test.beforeEach(async({page})=>{
    await page.goto('/');
})

test("select date range picker", async({page}) =>{
    const pm = new PageManager(page);
    await pm.navigate().toDatePickerPage();
    const datePickerPage = pm.onDatePickerPage();

    const startDate= 'Jan 14, 2041';
    const endDate= 'Feb 3, 2041';
    await datePickerPage.selectDateRange(startDate, endDate);

    expect(await datePickerPage.dateRangePickerInput.inputValue()).toEqual(`${startDate} - ${endDate}`);

})