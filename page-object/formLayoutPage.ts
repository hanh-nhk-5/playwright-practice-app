import { Locator, Page } from "@playwright/test";
import { PageHelper } from "./pageHelper";


export class FormLayoutsPage extends PageHelper{
    readonly inlineForm_nameInput: Locator;
    readonly inlineForm_emailInput: Locator;
    readonly inlineForm_rememberMeCheckbox: Locator;
    readonly inlineForm_submitButton: Locator;
    readonly usingTheGrid_nameInput: Locator;
    readonly usingTheGrid_emailInput: Locator;
    readonly usingTheGrid_radioGroups: Locator;
    readonly usingTheGrid_signinButton: Locator;

    constructor(page: Page){
        super(page);
        //Inline form
        const inlineForm= this.page.locator('nb-card', {hasText: 'Inline form'});        
        this.inlineForm_nameInput= inlineForm.getByPlaceholder('Jane Doe');
        this.inlineForm_emailInput= inlineForm.getByPlaceholder('Email');
        this.inlineForm_rememberMeCheckbox= inlineForm.locator('nb-checkbox', {hasText: 'Remember me'}).getByRole('checkbox');        
        this.inlineForm_submitButton= inlineForm.getByRole('button');

        //Using the Grid
        const usingTheGrid= this.page.locator('nb-card', {hasText: 'Using the Grid'});
        this.usingTheGrid_nameInput =  usingTheGrid.getByRole('textbox', {name: 'Email'});
        this.usingTheGrid_emailInput =  usingTheGrid.getByRole('textbox', {name: 'Password'});
        this.usingTheGrid_radioGroups= usingTheGrid.locator('nb-radio');
        this.usingTheGrid_signinButton= usingTheGrid.getByRole('button');
    }

    async submitInlineForm(name: string, email: string, remember: boolean){
        await this.inlineForm_nameInput.fill(name);
        await this.inlineForm_emailInput.fill(email);
        await this.inlineForm_rememberMeCheckbox.check({force: true});        
        await this.inlineForm_submitButton.click();
    }

    async signinUsingTheGrid(name: string, email: string, radio: string){
        await this.usingTheGrid_nameInput.fill(name);
        await this.usingTheGrid_emailInput.fill(email);
        await this.usingTheGrid_radioGroups.filter({hasText : radio}).getByRole('radio').check({force: true});
        await this.usingTheGrid_signinButton.click();
    }


}