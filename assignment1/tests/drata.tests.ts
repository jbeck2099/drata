import { test } from '@playwright/test';
import DrataPage from '../pages/drataPage';
let settings = require('../data/settings.json');
let links: string[] = [];
let visitedLinks: string[] = [];
// let linkNumber: number = 0;

test('Test home page & get all links', async({page}) => {
    let drataPage = new DrataPage(page);
    await drataPage.navigateHome();
    await drataPage.validateHomePageLinkExists();
    await drataPage.validateNoConsoleErrors();

    links = await page.evaluate(() => {
        return Array.from(document.links).map(item => item.href);
    });    
});

test.describe('Test all page links', () => {    
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

        test(`Testing page @ '${link}'`, async({page}) => {
            let drataPage = new DrataPage(page);
            await drataPage.navigateToPage(link);
            await drataPage.validateHomePageLinkExists();
            await drataPage.validateNoConsoleErrors();
        });
    }

    // for (let i = 0; i < links.length; i++){
    //     if (!links[i].includes(settings.homePageUrl)){ //skip links to external sites
    //         continue;
    //     }

    //     if (visitedLinks.includes(links[i])){ //skip repeated links
    //         continue;
    //     }
    //     else{
    //         visitedLinks.push(links[i]);
    //     }

    //     test(`Testing link ${i} (${links[i]})`, async({page}) => {
    //         let drataPage = new DrataPage(page);
    //         await drataPage.navigateToPage(links[i]);
    //         await drataPage.validateHomePageLinkExists();
    //         await drataPage.validateNoConsoleErrors();
    //     });
    // }

    // links.forEach((link) => {
    //     linkNumber++;
        
    //     if (!link.includes(settings.homePageUrl)){ //skip links to external sites
    //         // break;
    //     }

    //     if (visitedLinks.includes(link)){ //skip repeated links
    //         // continue;
    //     }
    //     else{
    //         visitedLinks.push(link);
    //     }

    //     test(`Testing page @ '${link}' (${linkNumber})`, async({page}) => {
    //         let drataPage = new DrataPage(page);
    //         await drataPage.navigateToPage(link);
    //         await drataPage.validateHomePageLinkExists();
    //         await drataPage.validateNoConsoleErrors();
    //     });
    // });
});
