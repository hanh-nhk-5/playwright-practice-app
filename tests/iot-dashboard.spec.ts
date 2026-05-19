import { test, expect } from "../my-fixtures";


test('adjust temperature', async({iotDashboardPage})=>{    
    await iotDashboardPage.adjustTemperature(264.58840363466516, 99.51877373688187);
    let temperature = Math.ceil(Number(await iotDashboardPage.tempBox.getAttribute('ng-reflect-set-value')));
    expect(temperature).toEqual(26);

    await iotDashboardPage.adjustTemperatureUsingBounding(100, 200);
    temperature = Math.ceil(Number(await iotDashboardPage.tempBox.getAttribute('ng-reflect-set-value')));
    expect(temperature).toEqual(13);
})