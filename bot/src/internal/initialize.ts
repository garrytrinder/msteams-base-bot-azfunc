import { BotBuilderCloudAdapter } from "@microsoft/teamsfx";
import ConversationBot = BotBuilderCloudAdapter.ConversationBot;
import { BlobsStorage } from "./blobsStorage";
import { FormCommandHandler } from "../commands/form";
import { SignInCommandHandler } from "../commands/signIn";
import { FormSubmitActionHandler } from "../actions/formSubmit";
import { SignInStartActionHandler } from "../actions/signinStart";
import { SignInEndActionHandler } from "../actions/signinEnd";

// initialise the bot
export const bot = new ConversationBot({
  adapterConfig: {
    MicrosoftAppId: process.env.BOT_ID,
    MicrosoftAppPassword: process.env.BOT_PASSWORD,
    MicrosoftAppType: "MultiTenant",

  },
  notification: {
    enabled: true,
    storage: new BlobsStorage(
      process.env.BLOB_CONNECTION_STRING,
      process.env.BLOB_CONTAINER_NAME_NOTIFICATIONS
    ),
  },
  command: {
    enabled: true,
    commands: [
      new FormCommandHandler(),
      new SignInCommandHandler()
    ]
  },
  cardAction: {
    enabled: true,
    actions: [
      new FormSubmitActionHandler(),
      new SignInStartActionHandler(),
      new SignInEndActionHandler()
    ]
  }
});

bot.adapter.onTurnError = async (context, error) => {
  await context.sendActivity(error);
}