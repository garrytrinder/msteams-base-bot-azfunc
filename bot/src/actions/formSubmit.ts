import { InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { TurnContext, InvokeResponse } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import formSubmitCard from "../cards/formSubmit.json";
import { nameStateAccessor } from "../internal/state";

export class FormSubmitActionHandler implements TeamsFxAdaptiveCardActionHandler {
  // define the action trigger
  triggerVerb: string = "formSubmit";

  // handle the action
  async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse<any>> {
    // update the name state
    await nameStateAccessor.set(context, { name: actionData.name });
    
    // render the adaptive card
    const card = AdaptiveCards.declare(formSubmitCard).render(actionData);
    
    // return the adaptive card response
    return InvokeResponseFactory.adaptiveCard(card);
  }
}
