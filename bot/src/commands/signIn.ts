import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { TurnContext, Activity, MessageFactory, CardFactory } from "botbuilder";
import signInCard from "../cards/signIn.json";
import { SignInCard } from "../models/signInCard";

export class SignInCommandHandler implements TeamsFxBotCommandHandler {
    // define the command trigger
    triggerPatterns: TriggerPatterns = new RegExp(/^signin$/);

    // handle the command
    async handleCommandReceived(context: TurnContext, message: CommandMessage): Promise<string | void | Partial<Activity>> {
        // render the adaptive card
        const card = AdaptiveCards.declare<SignInCard>(signInCard).render({ appId: process.env.BOT_ID });

        // send the card
        await context.sendActivity(MessageFactory.attachment(CardFactory.adaptiveCard(card)));
    }
}
