import { test, expect } from '@playwright/test';
import DrataPage from '../pages/drataPage';
import { pageHasNoConsoleErrors } from '../helpers';
let settings = require('../data/settings.json');
let visitedLinks: string[] = [];

test.describe('Validate Home Page Link On All Pages', () => {    
    test('Test Home Page & All Links', async({page}) => {        
        test.setTimeout(0); //because we're shoving everything into a single test
        let drataPage = new DrataPage(page);
        await drataPage.navigateHome();
        await drataPage.validateHomePageLinkExists();
        await drataPage.validateNoConsoleErrors();

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
    
            await drataPage.navigateToPage(link);
            await drataPage.validateHomePageLinkExists();
            await drataPage.validateNoConsoleErrors();
        }
    });
});

  