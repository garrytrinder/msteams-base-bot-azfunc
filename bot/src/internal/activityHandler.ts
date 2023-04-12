import { ConversationState, TeamsActivityHandler, TurnContext, UserState } from "botbuilder";
import { accessTokenStateAccessor, nameStateAccessor } from "./state";

export class BotActivityHandler extends TeamsActivityHandler {
    // Define state properties
    protected conversationState: ConversationState;
    protected userState: UserState;

    constructor(conversationState: ConversationState, userState: UserState) {
        super();
        this.conversationState = conversationState;
        this.userState = userState;

        // handle app install event
        this.onInstallationUpdateAdd(async (context, next) => {
            await context.sendActivity(`Hi 👋`);
            await next();
        });

        // handle incoming messages
        this.onMessage(async (context, next) => {
            if (context.activity.text.startsWith('/clear')) {
                await nameStateAccessor.delete(context);
                await accessTokenStateAccessor.delete(context);
                await context.sendActivity('Clean 🧼✨');
            }
            if (context.activity.text.startsWith('/token')) {
                const { token } = await accessTokenStateAccessor.get(context);
                await context.sendActivity(token);
            }
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