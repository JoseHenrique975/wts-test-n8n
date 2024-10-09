"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageFields = exports.messageOperations = void 0;
exports.messageOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: ['message']
            }
        },
        options: [
            {
                name: 'Get All Messages',
                value: 'getAllMessages',
                action: 'List messages',
            },
            {
                name: 'Get Message By ID',
                value: 'getMessageById',
                action: 'Get message by id',
            },
            {
                name: 'Get Message Status',
                value: 'getMessageStatus',
                action: 'Get message status',
            },
            {
                name: 'Send File',
                value: 'sendFile',
                action: 'Send file',
            },
            {
                name: 'Send Template',
                value: 'sendTemplate',
                action: 'Send template',
            },
            {
                name: 'Send Text',
                value: 'sendText',
                action: 'Send text',
            },
        ],
        default: 'getMessageById',
        noDataExpression: true
    },
];
exports.messageFields = [
    {
        displayName: 'From Name or ID',
        name: 'channelId',
        type: 'options',
        default: 'null',
        placeholder: 'Choose Channel',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getChannelsIds',
        },
        displayOptions: {
            show: {
                resource: ['message', 'chatbot'],
                operation: ['sendText', 'sendFile', 'sendTemplate', 'sendChatbot'],
            },
        },
    },
    {
        displayName: 'Templates Name or ID',
        name: 'templates',
        type: 'options',
        typeOptions: {
            loadOptionsDependsOn: ['channelId'],
            loadOptionsMethod: 'getTemplates'
        },
        default: 'null',
        placeholder: 'Choose your template',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendTemplate'],
            },
        },
    },
    {
        displayName: 'Params',
        name: 'paramsTemplates',
        type: 'fixedCollection',
        default: {},
        placeholder: 'Add param',
        typeOptions: {
            multipleValues: true
        },
        options: [
            {
                name: 'paramsTemplatesValues',
                displayName: 'Params',
                values: [
                    {
                        displayName: 'Name or ID',
                        name: 'name',
                        type: 'options',
                        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
                        default: '',
                        typeOptions: {
                            loadOptionsMethod: 'getNamesParamsTemplates'
                        }
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                        description: 'Value to set for the metadata key',
                    }
                ]
            }
        ],
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendTemplate']
            }
        }
    },
    {
        displayName: 'Message ID',
        name: 'messageId',
        type: 'string',
        default: '',
        placeholder: 'Enter message ID',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['getMessageById', 'getMessageStatus'],
            },
        },
    },
    {
        displayName: 'To',
        name: 'numberToSend',
        type: 'string',
        default: '',
        placeholder: '',
        description: 'Number to send message to',
        displayOptions: {
            show: {
                resource: ['message', 'chatbot'],
                operation: ['sendText', 'sendFile', 'sendTemplate', 'sendChatbot'],
            },
        },
    },
    {
        displayName: 'Url',
        name: 'urlFile',
        type: 'string',
        default: '',
        placeholder: '',
        description: 'URL file',
        displayOptions: {
            show: {
                resource: ['message', 'session'],
                operation: ['sendFile', 'sendMessageFileSession', 'sendTemplate', 'sendMessageTemplateSession'],
            },
        },
    },
    {
        displayName: 'File',
        name: 'fileToSend',
        type: 'json',
        default: {},
        placeholder: 'Place the file',
        displayOptions: {
            show: {
                resource: ['message', 'session'],
                operation: ['sendFile', 'sendMessageFileSession', 'sendMessageTemplateSession', 'sendTemplate'],
            }
        }
    },
    {
        displayName: 'Send Synchronous Message',
        name: 'synchronousMessage',
        type: 'boolean',
        description: 'Whether determines synchronous message sending',
        default: false,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendText', 'sendFile', 'sendTemplate'],
            },
        },
    },
    {
        displayName: 'Enable Bot',
        name: 'enableBot',
        type: 'boolean',
        default: false,
        description: 'Whether determines whether the chatbot should be activated upon receiving a response from the contact',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendText', 'sendFile', 'sendTemplate'],
            },
        },
    },
    {
        displayName: 'Hidden Session',
        name: 'hiddenSession',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendText', 'sendFile', 'sendTemplate'],
            },
        },
    },
    {
        displayName: 'Force Start Session',
        name: 'forceStartSession',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                resource: ['message', 'chatbot'],
                operation: ['sendText', 'sendFile', 'sendTemplate', 'sendChatbot'],
            },
        },
    },
];
//# sourceMappingURL=MessageDescription.js.map