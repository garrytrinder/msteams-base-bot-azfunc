import { InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { TurnContext, InvokeResponse } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import signInStartCard from "../cards/signInStart.json";
import { SignInCard } from "../models/signInCard";

export class SignInStartActionHandler implements TeamsFxAdaptiveCardActionHandler {
    // define the action trigger
    triggerVerb: string = "signInStart";

    // handle the action
    async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse<any>> {
        // render the adaptive card
        const card = AdaptiveCards.declare<SignInCard>(signInStartCard).render({ appId: process.env.BOT_ID });
        
        // send the card
        return InvokeResponseFactory.adaptiveCard(card);
    }
}
