import { ConversationState, UserState } from "botbuilder";
import { BlobsStorage } from "botbuilder-azure-blobs";

// initialise the storage for the bot
const storage = new BlobsStorage(
    process.env.BLOB_CONNECTION_STRING,
    process.env.BLOB_CONTAINER_NAME_STATE
);

// initialise the conversation state
export const conversationState = new ConversationState(storage);

// initialise the user state
export const userState = new UserState(storage);

// create the name state property accessor
export const nameStateAccessor = conversationState.createProperty("name");

// create the access token state property accessor
export const accessTokenStateAccessor = userState.createProperty("accessToken"); 