import { Locator, Page } from "@playwright/test";
import { PageHelper } from "./pageHelper";
import { Exception } from "sass";

export class IoTDashboardPage extends PageHelper{
    tempBox : Locator; 
    constructor(page: Page){
        super(page);
        this.tempBox = this.page.locator('nb-tab[tabtitle="Temperature"] ngx-temperature-dragger'); 
    }
    
    async adjustTemperature(cx: number, cy: number){    
        const tempGauge= this.tempBox.locator('circle');
        await tempGauge.evaluate((node, values) =>{
            node.setAttribute('cx', values.cx.toString());
            node.setAttribute('cy', values.cy.toString());
        }, {cx, cy})
        await tempGauge.click();
    }

    /**
     * 
     * @param x : relative position within the temperature box
     * @param y : relative position within the temperature box
     */
    async adjustTemperatureUsingBounding(x: number, y: number){                
        this.tempBox.scrollIntoViewIfNeeded();
        const boundingBox= await this.tempBox.boundingBox();

        if(boundingBox){
            if(x < 0 || x > boundingBox.width || y < 0 || y > boundingBox.height)
                throw new Error('The mouse is not within the bounding temperature box');            

            x+= boundingBox.x;
            y+= boundingBox.y;
            console.log (`x= ${x}, y = ${y}`);
                    
            await this.page.mouse.move(x,y);
            await this.page.mouse.down();
            await this.page.mouse.up();            
        }
        
    }
}