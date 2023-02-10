import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { CommandMessage, TeamsFxBotCommandHandler, TriggerPatterns } from "@microsoft/teamsfx";
import { TurnContext, Activity, MessageFactory, CardFactory } from "botbuilder";
import formCard from "../cards/form.json";
import { FormCard } from "../models/formCard";

export class FormCommandHandler implements TeamsFxBotCommandHandler {
  triggerPatterns: TriggerPatterns = "form";

  async handleCommandReceived(context: TurnContext, message: CommandMessage): Promise<string | void | Partial<Activity>> {
    const card = AdaptiveCards.declare<FormCard>(formCard).render({
      title: "What is your name?",
    });
    await context.sendActivity(MessageFactory.attachment(CardFactory.adaptiveCard(card)));
  }
}
