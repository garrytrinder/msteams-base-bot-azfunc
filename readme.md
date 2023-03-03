# Microsoft Teams Azure Function Bot Sample

This sample use TypeScript, Azure Functions and Teams Toolkit for Visual Studio Code.

It shows how to:

- Send an Adaptive Card form to all install locations
- Send an Adaptive Card form to an specific person
- Post an Adaptive Card form using a command
- Get user input from an Adaptive Card form
- Replace Adaptive Card form on submit
- Show a welcome message to new users
- Put in place conversation state
- Clear state using  `/` command
- Get and update state values

## Prerequisites

To run this sample you will need access to:

- Microsoft 365 tenant with uploading custom apps enabled
- Microsoft 365 account with admin permissions

> Or use a Microsoft 365 Developer Tenant. [Join the program today!](https://developer.microsoft.com/microsoft-365/dev-program?WT.mc_id=m365-0000-garrytrinder)

You will also need the following installed on your machine:

- Visual Studio Code
- Teams Toolkit
- nodejs v16

## Run the sample

1. Clone this repository
2. Open the folder in Visual Studio Code
3. Start a debug session, press F5 or use the Debug and Run panel
4. Follow the onscreen steps and instructions

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
