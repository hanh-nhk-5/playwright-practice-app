import test from "@playwright/test";
import { PageManager } from "../page-object/pageManager";

test.beforeEach(async({page})=>{
    page.goto('/');
})

test('test tooltip message', async({page})=>{
    const pm= new PageManager(page);
    pm.navigate().toTooltipPage();
    await pm.onTooltipPage().showTooltipPlacements('Right');
    await pm.onTooltipPage().verifyTooltip('This is a tooltip')
})

test('test tooltip color', async({page})=>{
    const pm= new PageManager(page);
    pm.navigate().toTooltipPage();
    await pm.onTooltipPage().showColoredTooltips('primary');
    await pm.onTooltipPage().verifyTooltipColor('rgb(51, 102, 255)');
})
