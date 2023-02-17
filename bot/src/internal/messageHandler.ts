import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BotActivityHandler } from "./activityHandler";
import { bot } from "./initialize";
import { ResponseWrapper } from "./responseWrapper";
import { conversationState, userState } from "./state";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  const botActivityHandler = new BotActivityHandler(conversationState, userState);
  const res = new ResponseWrapper(context.res);
  await bot.adapter.process(req, res, (context) => botActivityHandler.run(context))
  return res.body;
};

export default httpTrigger;
