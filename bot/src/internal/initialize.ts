import { ConversationBot } from "@microsoft/teamsfx";
import { FormSubmitActionHandler } from "../actions/formSubmit";
import { FormCommandHandler } from "../commands/form";

export const bot = new ConversationBot({
  adapterConfig: {
    appId: process.env.BOT_ID,
    appPassword: process.env.BOT_PASSWORD,
  },
  notification: {
    enabled: true,
  },
  command: {
    enabled: true,
    commands: [
      new FormCommandHandler(),
    ]
  },
  cardAction: {
    enabled: true,
    actions: [
      new FormSubmitActionHandler()
    ]
  }
});
