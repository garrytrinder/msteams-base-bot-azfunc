import { ConversationState, TeamsActivityHandler, TurnContext, UserState } from "botbuilder";
import { nameStateAccessor } from "./state";

export class BotActivityHandler extends TeamsActivityHandler {
    protected conversationState: ConversationState;
    protected userState: UserState;

    constructor(conversationState: ConversationState, userState: UserState) {
        super();
        this.conversationState = conversationState;
        this.userState = userState;

        // handle messages
        this.onMessage(async (context, next) => {
            if (context.activity.text.startsWith('/clear')) {
                await nameStateAccessor.delete(context);
                await context.sendActivity('State cleared');
            }
            await next();
        });

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

    async run(context: TurnContext) {
        await super.run(context);

        // Save any state changes.
        await this.conversationState.saveChanges(context);
        await this.userState.saveChanges(context);
    }
}