import { InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { TurnContext, InvokeResponse } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import formSubmitCard from "../cards/formSubmit.json";

export class FormSubmitActionHandler implements TeamsFxAdaptiveCardActionHandler {
  triggerVerb: string = "formSubmit";

  async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse<any>> {
    const card = AdaptiveCards.declare(formSubmitCard).render(actionData);
    return InvokeResponseFactory.adaptiveCard(card);
  }
}
