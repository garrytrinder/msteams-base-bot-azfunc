import { ConversationBot } from "@microsoft/teamsfx";
import { FormSubmitActionHandler } from "../actions/formSubmit";
import { FormCommandHandler } from "../commands/form";
import { BlobsStorage } from "./blobsStorage";

export const bot = new ConversationBot({
  adapterConfig: {
    appId: process.env.BOT_ID,
    appPassword: process.env.BOT_PASSWORD,
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
    ]
  },
  cardAction: {
    enabled: true,
    actions: [
      new FormSubmitActionHandler()
    ]
  }
});
