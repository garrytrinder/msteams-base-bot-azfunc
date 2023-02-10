import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import formCard from "./cards/form.json";
import { bot } from "./internal/initialize";
import { FormCard } from "./models/formCard";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  for (const target of await bot.notification.installations()) {
    await target.sendAdaptiveCard(
      AdaptiveCards.declare<FormCard>(formCard).render({
        title: "What is your name?",
      })
    );
  }

  context.res = {};
};

export default httpTrigger;
