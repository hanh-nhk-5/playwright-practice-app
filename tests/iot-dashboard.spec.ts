import test, { expect } from "@playwright/test";
import { PageManager } from "../page-object/pageManager";

test.beforeEach(async({page})=>{
    await page.goto('/');
})


test('adjust temperature', async({page})=>{
    const pm = new PageManager(page);
    await pm.navigate().toIotDashboardPage();
    await pm.onIoTDashboardPage().adjustTemperature(264.58840363466516, 99.51877373688187);
    let temperature = Math.ceil(Number(await pm.onIoTDashboardPage().tempBox.getAttribute('ng-reflect-set-value')));
    expect(temperature).toEqual(26);

    await pm.onIoTDashboardPage().adjustTemperatureUsingBounding(100, 200);
    temperature = Math.ceil(Number(await pm.onIoTDashboardPage().tempBox.getAttribute('ng-reflect-set-value')));
    expect(temperature).toEqual(12);
})