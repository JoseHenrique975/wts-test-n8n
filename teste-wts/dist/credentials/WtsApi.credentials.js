"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WtsApi = void 0;
class WtsApi {
    constructor() {
        this.name = 'wtsApi';
        this.displayName = 'WTS API';
        this.documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                default: 'https://api.wts.chat/auth/v1/login/validate',
                placeholder: 'Entre com sua API KEY aqui',
                description: 'A API Key é usada para ter acesso a API do WTS Chat',
                typeOptions: {
                    password: true
                }
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '=Bearer {{$credentials.apiKey}}'
                },
                url: 'https://api.wts.chat/auth/v1/login/validate',
                qs: {
                    'api_key': '={{$credentials.apiKey}}'
                }
            },
        };
    }
}
exports.WtsApi = WtsApi;
//# sourceMappingURL=WtsApi.credentials.js.map