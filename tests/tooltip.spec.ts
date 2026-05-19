import {test, expect} from "../my-fixtures";

test('test tooltip message', async({tooltipPage})=>{
    await tooltipPage.showTooltipPlacements('Right');
    await tooltipPage.verifyTooltip('This is a tooltip')
})

test('test tooltip color', async({tooltipPage})=>{
    await tooltipPage.showColoredTooltips('primary');
    await tooltipPage.verifyTooltipColor('rgb(51, 102, 255)');
})
