import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import formCard from "./cards/form.json";
import { bot } from "./internal/initialize";
import { FormCard } from "./models/formCard";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  // get the user principal name from the query string
  const { upn } = req.query;

  // render the adaptive card
  const card = AdaptiveCards.declare<FormCard>(formCard).render({
    title: "What is your name?",
    name: ""
  });

  // send the card to the user or all users
  if (upn) {
    const member = await bot.notification.findMember(m =>
      Promise.resolve(m.account.userPrincipalName === upn)
    );
    await member?.sendAdaptiveCard(card);
  } else {
    for (const target of await bot.notification.installations()) {
      await target.sendAdaptiveCard(card);
    }
  }

  // return an empty response
  context.res = {};
};

export default httpTrigger;
