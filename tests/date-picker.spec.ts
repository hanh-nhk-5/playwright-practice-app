import {test, expect} from "../my-fixtures"

test("select date range picker", async({datePickerPage}) =>{
    
    const startDate= 'Jan 14, 2041';
    const endDate= 'Feb 3, 2041';
    await datePickerPage.selectDateRange(startDate, endDate);

    expect(await datePickerPage.dateRangePickerInput.inputValue()).toEqual(`${startDate} - ${endDate}`);

})