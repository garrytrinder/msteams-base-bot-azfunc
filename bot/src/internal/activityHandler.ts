import { ConversationState, TeamsActivityHandler, TurnContext, UserState } from "botbuilder";
import { nameStateAccessor } from "./state";

export class BotActivityHandler extends TeamsActivityHandler {
    // Define state properties
    protected conversationState: ConversationState;
    protected userState: UserState;

    constructor(conversationState: ConversationState, userState: UserState) {
        super();
        this.conversationState = conversationState;
        this.userState = userState;

        // handle incoming messages
        this.onMessage(async (context, next) => {
            if (context.activity.text.startsWith('/clear')) {
                await nameStateAccessor.delete(context);
                await context.sendActivity('Clean 🧼✨');
            }
            await next();
        });

        // handle app install event
        this.onInstallationUpdateAdd(async (context, next) => {
            await context.sendActivity(`Hi 👋`);
            await next();
        });
    }

    // Override the run() method to save state changes after the bot logic completes.
    async run(context: TurnContext) {
        await super.run(context);

        // save state changes
        await this.conversationState.saveChanges(context);
        await this.userState.saveChanges(context);
    }
}