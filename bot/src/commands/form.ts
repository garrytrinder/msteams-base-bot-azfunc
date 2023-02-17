import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { TurnContext, Activity, MessageFactory, CardFactory } from "botbuilder";
import formCard from "../cards/form.json";
import { nameStateAccessor } from "../internal/state";
import { FormCard } from "../models/formCard";

export class FormCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "form";

  async handleCommandReceived(context: TurnContext, message: CommandMessage): Promise<string | void | Partial<Activity>> {
    const nameState = await nameStateAccessor.get(context, { name: "" });
    const card = AdaptiveCards.declare<FormCard>(formCard).render({
      title: "What is your name?",
      name: nameState.name,
    });
    await context.sendActivity(MessageFactory.attachment(CardFactory.adaptiveCard(card)));
  }
}
