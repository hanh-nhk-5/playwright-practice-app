import  { test, expect } from "@playwright/test";


test.beforeEach(async({page})=>{
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
})

test('locator syntax rules', async({page})=>{
    page.locator('input'); //tag name

    page.locator('#inputEmail1'); //id 

    page.locator('.shape-rectangle'); //class name

    page.locator('[placeholder="Email"]'); //attribute

    page.locator(':text("Using")'); //partial text

    page.locator('text-is("Using the Grid")') //exact text

    page.locator('input.shape-rectangle[nbinput]')//combine multiple selectors

    page.locator('//*[id="inputEmail1"]'); //xpath - not recommended by Playwright
})

test('user facing locators', async ({page})=>{
    await page.getByRole('textbox', {name:"Email"}).first().click();
    await page.getByLabel('Email').first().click();
    await page.getByPlaceholder('Jane Doe').click();
    let option1RadioButton= page.getByRole('radio').first();
    await option1RadioButton.check();
})

test('locating child elements', async({page})=>{
    await page.locator('nb-card nb-radio :text("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text("Option 2")').click();
    await page.locator('nb-card').nth(3).getByRole('button', {name:'Submit'}).click();
})

test('parent element', async({page})=>{
    // await page.locator('nb-card', {has: page.getByText('Using the Grid')}).getByRole('textbox', {name: 'Email'}).click();
    // await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).click();
    // await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({has: page.getByRole('button', {name:'Sign In'})}).getByRole('textbox', {name: 'Email'}).click();
    await page.getByText('Using the Grid').locator('..').getByRole('textbox', {name: 'Email'}).click();
})

test('reusing locators', async({page})=>{
    const basicForm= page.locator('nb-card', {hasText: 'Basic form'});
    const emailField =  basicForm.getByRole('textbox', {name: 'Email'});
    const email= 'test@test.com';
    await emailField.fill(email);
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('pass');
    await basicForm.getByRole('button', {name: 'Submit'}).click();

    expect(emailField).toHaveValue(email);
})

test('extracting value', async({page}) =>{
    

    const values = await page.locator('nb-radio').allTextContents(); //get all text content of the matched web elements
    expect(values, 'message').toContain('Option 1');

    let value: string | null  = await page.locator('nb-card', {hasText: 'Basic form'}).locator('nb-checkbox').textContent(); //get text content of a web element
    expect(value, 'textContent(): value does not match').toEqual('Check me out');

    const emailField = page.locator('nb-card', {hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'});
    const inputEmail= 'test@test.com'
    await emailField.fill(inputEmail);
    value= await emailField.inputValue(); //get input value
    expect(value).toEqual(inputEmail);

    value = await emailField.getAttribute('placeholder');
    expect(value, 'getAttribute(): value does not match').toEqual('Email');
})