import { Page, expect } from '@playwright/test'
import { pageHasNoConsoleErrors } from '../helpers';
let settings = require('../data/settings.json')

class DrataPage{
    readonly page: Page;
    readonly homePageUrl: string;
    readonly homePageLinkLocator: string;

    public constructor (page: Page){
        this.page = page;
        this.homePageUrl = settings.homePageUrl;
        this.homePageLinkLocator = settings.homePageLinkLocator;
    }

    async navigateHome(){
        await this.page.goto(settings.homePageUrl);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async navigateToPage(url: string){
        await this.page.goto(url);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async validateHomePageLinkExists(){
        expect(this.page.locator(settings.homePageLinkLocator)).toBeVisible();
    }

    async validateNoConsoleErrors(){
        expect(pageHasNoConsoleErrors(this.page)).toBeTruthy();
    }

}

export default DrataPage;