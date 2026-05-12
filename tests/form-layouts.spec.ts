import { test, Page , expect} from "@playwright/test";
import { PageManager } from "../page-object/pageManager";

test.beforeEach(async({page})=>{
    await page.goto('/');
})

test("submit Inline Form", async({page})=>{
    const name= 'Hanh';
    const email= 'test@test.com'
    const rememberMe = true;

    const pm = new PageManager(page);
    await pm.navigate().toFromLayoutsPage();
    const formLayoutsPage = pm.onFormLayoutsPage();  
    await formLayoutsPage.submitInlineForm(name, email, rememberMe);

    await expect(formLayoutsPage.inlineForm_nameInput).toHaveValue(name);
    await expect(formLayoutsPage.inlineForm_emailInput).toHaveValue(email);
    if(rememberMe)
        expect(formLayoutsPage.inlineForm_rememberMeCheckbox).toBeTruthy();
    else
        expect(formLayoutsPage.inlineForm_rememberMeCheckbox).toBeFalsy();
})


test("signin Using the Grid", async({page})=>{
    const name= 'Hanh';
    const email= 'test@test.com'
    const radio = "Option 2";

    const pm= new PageManager(page);
    await pm.navigate().toFromLayoutsPage();
    const formLayoutsPage = pm.onFormLayoutsPage(); 
    await formLayoutsPage.signinUsingTheGrid(name, email, radio);

    await expect(formLayoutsPage.usingTheGrid_nameInput).toHaveValue(name);
    await expect(formLayoutsPage.usingTheGrid_emailInput).toHaveValue(email);
    expect(formLayoutsPage.usingTheGrid_radioGroups.filter({hasText: radio}).getByRole('radio')).toBeTruthy();
})