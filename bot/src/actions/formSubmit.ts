import { InvokeResponseFactory, TeamsFxAdaptiveCardActionHandler } from "@microsoft/teamsfx";
import { TurnContext, InvokeResponse } from "botbuilder";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import formSubmitCard from "../cards/formSubmit.json";
import { nameStateAccessor } from "../internal/state";

export class FormSubmitActionHandler implements TeamsFxAdaptiveCardActionHandler {
  triggerVerb: string = "formSubmit";

  async handleActionInvoked(context: TurnContext, actionData: any): Promise<InvokeResponse<any>> {
    await nameStateAccessor.set(context, { name: actionData.name });
    const card = AdaptiveCards.declare(formSubmitCard).render(actionData);
    return InvokeResponseFactory.adaptiveCard(card);
  }
}
