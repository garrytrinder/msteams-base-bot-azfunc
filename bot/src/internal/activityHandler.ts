import { Activity, ActivityTypes, BotHandler, TeamsActivityHandler } from "botbuilder";

export class BotActivityHandler extends TeamsActivityHandler {
    constructor() {
        super();

        // handle app install event
        this.onInstallationUpdateAdd(async (context, next) => {
            await context.sendActivity(`You installed the app`);
            await next();
        });

        // handle app uninstall event
        this.onInstallationUpdateRemove(async (context, next) => {
            await context.sendActivity(`You removed the app`);
            await next();
        });

        // handle app update event
        this.onInstallationUpdate(async (context, next) => {
            await context.sendActivity(`You updated the app`);
            await next();
        });
    }
}