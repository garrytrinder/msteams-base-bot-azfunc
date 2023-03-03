# Microsoft Teams Azure Function Bot Sample

This sample uses TypeScript, Azure Functions and Teams Toolkit for Visual Studio Code.

It aims to provide the basis of a skeleton project that demonstrates common bot features.

- Send proactive messages
- Persist bot state
- Use bot commands
- Use forms in bots

Bots are conversational, so it shows how to send:

- An Adaptive Card form to all bot install locations
- An Adaptive Card form to an specific person
- An Adaptive Card form using a command

Bots can capture user input, so its how to:

- Get user input from an Adaptive Card form
- Replace Adaptive Card form on form submit

Bots are stateful, so it shows how to:

- Use Azure Storage for notification state
- Use Azure Storage for conversation state
- Clear state using  `/` command
- Get and update state values

Bots can be friendly, so it shows to:

- Send a welcome message to new users

## Prerequisites

To run this sample you will need access to:

- Microsoft 365 tenant with uploading custom apps enabled
- Microsoft 365 account with admin permissions

> Or use a Microsoft 365 Developer Tenant. [Join the program today!](https://developer.microsoft.com/microsoft-365/dev-program?WT.mc_id=m365-0000-garrytrinder)

You will also need the following installed on your machine:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Teams Toolkit](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)
- [nodejs v16](https://nodejs.org/en/download/releases/)

## Run the sample

1. Clone this repository
2. Open the folder in Visual Studio Code
3. Start a debug session, press F5 or use the Debug and Run panel
4. Follow the on-screen steps to authenticate and add app to Microsost Teams.
5. Stop debug session
6. Update variables in `bot\src\.env.teamsfx.local`

```
BLOB_CONNECTION_STRING=UseDevelopmentStorage=true
BLOB_CONTAINER_NAME_NOTIFICATIONS=notifications
BLOB_CONTAINER_NAME_STATE=state
```

7. Start a new debug session, follow steps.
8. Test the sample!

## Test the sample

Send an Adaptive Card form to all install locations:

```http
POST https://localhost:3798/api/notification
```

Send an Adaptive Card form to an specific person:

```http

POST https://localhost:3798/api/notification?upn=user@domain.com
```

Post an Adaptive Card form using a command:

Send a message in the chat with the word `form`.

Clear state:

Send a message in the chat with the word `/clear`.
