import { Page, Locator} from "@playwright/test";
import { PageHelper } from "./pageHelper";

enum monthInNumber {
    'Jan'= 'JANUARY',
    'Feb'= 'FEBRUARY'
}

export class DatePickerPage extends PageHelper{
    dateRangePickerInput: Locator;

    constructor(page: Page){
        super(page);
        this.dateRangePickerInput = this.page.locator('input[placeholder="Range Picker"]');
    }
    
    /**
     * 
     * @param fullStartDate eg. May 8, 2026
     * @param fullEndDate eg. Jun 11, 2026
     */
    async selectDateRange(fullStartDate: string, fullEndDate: string){        
        await this.dateRangePickerInput.click();

        await this.selectADateInDateRangePickerselectDateRange(fullStartDate);
        await this.selectADateInDateRangePickerselectDateRange(fullEndDate);
    }

    async selectADateInDateRangePickerselectDateRange(fullDate: string){
        let parts = fullDate.trim().split(' ');
        let month = parts[0].toUpperCase();
        let day= Number(parts[1].substring(0, parts[1].length-1));
        let year= Number(parts[2]);
        
        const calenderRangeSelectionArea= this.page.locator('nb-calendar-range');
        const monthYearDropdown = calenderRangeSelectionArea.locator('nb-calendar-view-mode').getByRole('button');

        let text= (await monthYearDropdown.textContent());
        if(!text)
            throw new Error('Could find text in the Month Year dropdown')
        
        parts= text.trim().split(' ');
        let monthTemp= parts[0].substring(0, 3).toUpperCase();
        let yearTemp= Number(parts[1]);              

        if(year != yearTemp || month != monthTemp){
            let navigateButton= calenderRangeSelectionArea.locator('nb-calendar-pageable-navigation').locator('.prev-month');
            if(year > yearTemp)
                navigateButton= calenderRangeSelectionArea.locator('nb-calendar-pageable-navigation').locator('.next-month');
            
            await monthYearDropdown.click();

            let expectedYearLocator = calenderRangeSelectionArea.locator('nb-calendar-range-year-cell').filter({hasText: year.toString()});
            while(!(await expectedYearLocator.isVisible())){
                await navigateButton.click();
                expectedYearLocator = calenderRangeSelectionArea.locator('nb-calendar-range-year-cell').filter({hasText: year.toString()});                    
            }
            await expectedYearLocator.click();                
            await calenderRangeSelectionArea.locator('nb-calendar-range-month-cell').filter({hasText: month}).click();                
            
        }      
        
        await calenderRangeSelectionArea.locator('nb-calendar-range-day-cell[class="range-cell day-cell ng-star-inserted"]').filter({hasText: new RegExp(`^${day.toString()}$`) }, ).click();    
    }

    
}