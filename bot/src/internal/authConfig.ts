import { OnBehalfOfCredentialAuthConfig } from "@microsoft/teamsfx";

export const oboAuthConfig: OnBehalfOfCredentialAuthConfig = {
    authorityHost: process.env.M365_AUTHORITY_HOST,
    clientId: process.env.M365_CLIENT_ID,
    tenantId: 'common',
    clientSecret: process.env.M365_CLIENT_SECRET,
};