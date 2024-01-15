import { test as base } from '@playwright/test'
import DrataPage from '../pages/drataPage'

export const test = base.extend<{ drataPage: DrataPage }>({
    drataPage: async ({ page }, use) =>{
        const drataPage = new DrataPage(page);
        await use(drataPage);
    },
});
