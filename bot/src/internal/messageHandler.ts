import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BotActivityHandler } from "./activityHandler";
import { bot } from "./initialize";
import { ResponseWrapper } from "./responseWrapper";
import { conversationState, userState } from "./state";
import "isomorphic-fetch";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  // create a bot activity handler
  const botActivityHandler = new BotActivityHandler(conversationState, userState);

  // process the request
  const res = new ResponseWrapper(context.res);
  await bot.adapter.process(req, res, (context) => botActivityHandler.run(context))
  
  // return the response
  return res.body;
};

export default httpTrigger;
