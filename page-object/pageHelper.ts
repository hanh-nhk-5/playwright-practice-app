import { Page } from "@playwright/test";

export class PageHelper{
    protected page: Page;
    constructor(page: Page){
        this.page = page;
    }
}