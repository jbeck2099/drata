import { test, expect } from '@playwright/test';
import { pageHasNoConsoleErrors } from '../helpers';
let settings = require('../data/settings.json');
let visitedLinks: string[] = [];

test.describe('Validate Home Page Link On All Pages', () => {    
    test('Test Home Page & All Links', async({page}) => {        
        test.setTimeout(0); //because we're shoving everything into a single test
        await page.goto(settings.homePageUrl);
        await page.waitForLoadState('domcontentloaded');
        expect(page.locator(settings.homePageLinkLocator)).toBeVisible();
        expect(pageHasNoConsoleErrors(page)).toBeTruthy();

        const links = await page.evaluate(() => {
            return Array.from(document.links).map(item => item.href);
        });    
        
        for (const link of links){
            if (!link.includes(settings.homePageUrl)){ //skip links to external sites
                continue;
            }

            if (visitedLinks.includes(link)){ //skip repeated links
                continue;
            }
            else{
                visitedLinks.push(link);
            }
    
            await page.goto(link);
            await page.waitForLoadState('domcontentloaded');
            expect(page.locator(settings.homePageLinkLocator)).toBeVisible();
            expect(pageHasNoConsoleErrors(page)).toBeTruthy();
        }
    });
});

  