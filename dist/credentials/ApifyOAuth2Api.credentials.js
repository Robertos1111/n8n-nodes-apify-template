"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApifyOAuth2Api = void 0;
const scopes = ['profile', 'full_api_access'];
class ApifyOAuth2Api {
    constructor() {
        this.name = 'apifyOAuth2Api';
        this.extends = ['oAuth2Api'];
        this.displayName = 'Apify OAuth2 API';
        this.documentationUrl = 'https://docs.apify.com/api/v2';
        this.properties = [
            {
                displayName: 'Grant Type',
                name: 'grantType',
                type: 'hidden',
                default: 'pkce',
            },
            {
                displayName: 'Authorization URL',
                name: 'authUrl',
                type: 'hidden',
                default: 'https://console.apify.com/authorize/oauth',
            },
            {
                displayName: 'Access Token URL',
                name: 'accessTokenUrl',
                type: 'hidden',
                default: 'https://console-backend.apify.com/oauth/apps/token',
            },
            {
                displayName: 'Scope',
                name: 'scope',
                type: 'hidden',
                default: `${scopes.join(' ')}`,
            },
            {
                displayName: 'Auth URI Query Parameters',
                name: 'authQueryParameters',
                type: 'hidden',
                default: '',
            },
            {
                displayName: 'Authentication',
                name: 'authentication',
                type: 'hidden',
                default: 'header',
            },
            {
                displayName: 'Client ID',
                name: 'clientId',
                type: 'hidden',
                default: '',
            },
            {
                displayName: 'Client Secret',
                name: 'clientSecret',
                type: 'hidden',
                default: '',
            },
        ];
    }
}
exports.ApifyOAuth2Api = ApifyOAuth2Api;
//# sourceMappingURL=ApifyOAuth2Api.credentials.js.map