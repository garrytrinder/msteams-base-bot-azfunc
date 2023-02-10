import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BotActivityHandler } from "./activityHandler";
import { bot } from "./initialize";
import { ResponseWrapper } from "./responseWrapper";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<any> {
  const botActivityHandler = new BotActivityHandler();
  const res = new ResponseWrapper(context.res);
  await bot.adapter.process(req, res, (context) => botActivityHandler.run(context))
  return res.body;
};

export default httpTrigger;
