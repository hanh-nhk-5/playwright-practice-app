import { expect, Page } from "@playwright/test";
import { PageHelper } from "./pageHelper";

export class TooltipPage extends PageHelper{
    constructor(page: Page){
        super(page);
    }

    async showTooltipPlacements(buttonName: string){        
        await this.page.locator('nb-card', {hasText: 'Tooltip Placements'}).locator(`[nbtooltipplacement="${buttonName.toLowerCase()}"]`).hover();        
    }    

    async verifyTooltip(message: string){
        await expect(this.page.locator('nb-tooltip')).toHaveText(message);
    }

    async showColoredTooltips(buttonName: string){        
        await this.page.locator('nb-card', {hasText: 'Colored Tooltips'}).locator(`[nbtooltipstatus="${buttonName.toLowerCase()}"]`).hover();        
    }   
    
    async verifyTooltipColor(expectedColor: string){
        const backgroundColor= await this.page.locator('nb-tooltip').evaluate(el =>{
            return getComputedStyle(el).backgroundColor;
        });
        console.log("background color: " + backgroundColor);
        expect(backgroundColor).toEqual(expectedColor);
    }
}