import type { INodeProperties } from 'n8n-workflow';

export const chatbotOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: ['chatbot']
            }
        },
        options: [
            {
                name: 'Send Chatbot',
                value: 'sendChatbot',
                action: 'Send chatbot',
                default: 'chatbot'
            }],
        default: 'sendChatbot',
        noDataExpression: true
    }
]

export const chatbotFields: INodeProperties[] = [

    {
        displayName: 'Skip If Bot In Execution',
        name: 'skipIfBotInExecution',
        type: 'boolean',
        default: false,
        description: 'Whether another chatbot is running, the chatbot will not be sent',
        displayOptions: {
            show: {
                resource: ['chatbot'],
                operation: ['sendChatbot'],
            },
        },
    },
    {
        displayName: 'Skip If In Progress',
        name: 'skipIfInProgress',
        type: 'boolean',
        default: false,
        description: 'Whether a conversation is ongoing, the chatbot will not be sent',
        displayOptions: {
            show: {
                resource: ['chatbot'],
                operation: ['sendChatbot'],
            },
        },
    },

    {
        displayName: 'Session Metadata',
        name: 'sessionMetadatas',
        placeholder: 'Add Session Metadata',
        type: 'fixedCollection',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        options: [
            {
                name: 'sessionMetadata',
                displayName: 'Session Metadata',
                values: [
                    {
                        displayName: 'Key',
                        name: 'key',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                    },
                ],
            },
        ],
        displayOptions: {
            show: {
                resource: ['chatbot'],
                operation: ['sendChatbot'],
            },
        },
    },
    {
        displayName: 'Contacts Metadata',
        name: 'contactMetadatas',
        placeholder: 'Add Contact Metadata',
        type: 'fixedCollection',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        options: [
            {
                name: 'contactMetadata',
                displayName: 'Contact Metadata',
                values: [
                    {
                        displayName: 'Key',
                        name: 'key',
                        type: 'string',
                        default: '',
                    },
                    {
                        displayName: 'Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                    },
                ],
            },
        ],
        displayOptions: {
            show: {
                resource: ['chatbot'],
                operation: ['sendChatbot'],
            },
        },
    },
]