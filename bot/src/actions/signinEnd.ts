import { InvokeResponseFactory, OnBehalfOfUserCredential, TeamsFxAdaptiveCardActionHandler, createMicrosoftGraphClientWithCredential } from "@microsoft/teamsfx";
import { TurnContext, InvokeResponse } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import signInEndCard from "../cards/signInEnd.json";
import { accessTokenStateAccessor } from "../internal/state";
import { oboAuthConfig } from "../internal/authConfig";

export class SignInEndActionHandler implements TeamsFxAdaptiveCardActionHandler {
    // define the action trigger
    triggerVerb: string = "signInEnd";

    // handle the action
    async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse<any>> {
        // get access token
        const { token } = context.activity.value.authentication;

        // save the access token to state for re-use
        accessTokenStateAccessor.set(context, { token });
        
        // create a on-behalf-of credential
        const credential = new OnBehalfOfUserCredential(token, oboAuthConfig);
        
        // create a Microsoft Graph client
        const client = createMicrosoftGraphClientWithCredential(credential, 'User.Read');

        // call the Microsoft Graph API
        const user = await client.api('/me').get();
        
        // get display name
        const { displayName } = user;

        // render the adaptive card
        const card = AdaptiveCards.declare(signInEndCard).render({ displayName });

        // send the card
        return InvokeResponseFactory.adaptiveCard(card);
    }
}
