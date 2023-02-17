import { ConversationState, TeamsActivityHandler, TurnContext, UserState } from "botbuilder";

export class BotActivityHandler extends TeamsActivityHandler {
    protected conversationState: ConversationState;
    protected userState: UserState;

    constructor(conversationState: ConversationState, userState: UserState) {
        super();
        this.conversationState = conversationState;
        this.userState = userState;

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