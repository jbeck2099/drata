import { Page } from '@playwright/test'

export function pageHasNoConsoleErrors(page: Page){
    page.on("console", (message) => {
        if (message.type() === "error"){
            return false;
        }
    });

    return true;
}
