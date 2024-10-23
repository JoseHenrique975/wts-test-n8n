import { INodeProperties } from "n8n-workflow";
//import { notSend } from "../constants.types";

export const sessionOperations: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
            show: {
                resource: ['session']
            }
        },
        options: [
            {
                name: 'Assign User',
                value: 'assignUser',
                action: 'Assign user to session',
                default: 'session'
            },
            {
                name: 'Conclude Session',
                value: 'concludeSession',
                action: 'Conclude session',
                default: 'session'
            },
            {
                name: 'Get All Sessions',
                value: 'getAllSessions',
                action: 'List sessions',
                default: 'session'
            },
            {
                name: 'Get Session By ID',
                value: 'getSessionById',
                action: 'Get session by id',
                default: 'session'
            },
            {
                name: 'Send Message File',
                value: 'sendMessageFileSession',
                action: 'Send message file',
                default: 'session'
            },
            {
                name: 'Send Message Template',
                value: 'sendMessageTemplateSession',
                action: 'Send message template',
                default: 'session'
            },
            {
                name: 'Send Message Text',
                value: 'sendMessageTextSession',
                action: 'Send message text',
                default: 'session'
            },
            {
                name: 'Update Status Session',
                value: 'updateStatusSession',
                action: 'Update status session',
                default: 'session'
            },
            {
                name: 'Update Transfer',
                value: 'updateTransfer',
                action: 'Update transfer',
                default: 'session'
            },
            {
                name: 'UpdateSession',
                value: 'updateSession',
                action: 'Update session',
                default: 'session'
            },
        ],
        default: 'getAllSessions',
        noDataExpression: true
    },
]

export const sessionFields: INodeProperties[] = [

    {
        displayName: 'Company ID',
        name: 'companyId',
        type: 'string',
        default: '',
        placeholder: 'Enter company code',
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['updateSession'],
            },
        },

    },

    {
        displayName: 'Channel Names or IDs',
        name: 'channelsIds',
        type: 'multiOptions',
        default: [],
        placeholder: 'Choose Channel',
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getChannelsIds',
        },
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['getAllSessions'],
            },
        },
    },
    {
        displayName: 'ActiveAt.After',
        name: 'activeAtAfter',
        type: 'dateTime',
        default: '',
        description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['getAllSessions'],
            },
        },
    },
    {
        displayName: 'ActiveAt.Before',
        name: 'activeAtBefore',
        type: 'dateTime',
        default: '',
        description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['getAllSessions'],
            },
        },
    },
    {
        displayName: 'EndAt.After',
        name: 'endAtAfter',
        type: 'dateTime',
        default: '',
        description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['getAllSessions'],
            },
        },
    },

    {
        displayName: 'EndAt.Before',
        name: 'endAtBefore',
        type: 'dateTime',
        default: '',
        description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['getAllSessions'],
            },
        },
    },

    {
        displayName: 'LastInteractionAt.After',
        name: 'lastInteractionAtAfter',
        type: 'dateTime',
        default: '',
        description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['getAllSessions'],
            },
        },
    },
    {
        displayName: 'LastInteractionAt.Before',
        name: 'lastInteractionAtBefore',
        type: 'dateTime',
        default: '',
        description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['getAllSessions'],
            },
        },
    },

    {
        displayName: 'Status Session',
        name: 'statusSession',
        type: 'multiOptions',
        default: [],
        placeholder: 'Choose status',
        options: [
            { name: 'Completed', value: 'COMPLETED' },
            { name: 'Hidden', value: 'HIDDEN' },
            { name: 'In Progress', value: 'IN_PROGRESS' },
            { name: 'Pending', value: 'PENDING' },
            { name: 'Started', value: 'Started' },
        ],
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['getAllSessions'],
            },
        },
    },

    {
        displayName: 'Status Session',
        name: 'statusSessionOption',
        type: 'options',
        default: 'UNDEFINED',
        placeholder: 'Choose status',
        options: [
            { name: 'Completed', value: 'COMPLETED' },
            { name: 'Hidden', value: 'HIDDEN' },
            { name: 'In Progress', value: 'IN_PROGRESS' },
            { name: 'Pending', value: 'PENDING' },
            { name: 'Started', value: 'STARTED' },
            { name: 'Undefined', value: 'UNDEFINED' }
        ],
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['updateStatusSession'],
            },
        },
    },

    {
        displayName: 'Include Details',
        name: 'includeDetails',
        type: 'multiOptions',
        default: [],
        placeholder: 'Choose include details',
        options: [
            {
                name: 'AgentDetails',
                value: 'AgentDetails',
            },
            {
                name: 'ChannelDetails',
                value: 'ChannelDetails',
            },
            {
                name: 'ChannelTypeDetails',
                value: 'ChannelTypeDetails',
            },
            {
                name: 'ClassificationDetails',
                value: 'ClassificationDetails',
            },
            {
                name: 'ContactDetails',
                value: 'ContactDetails',
            },
            {
                name: 'DepartmentsDetails',
                value: 'DepartmentsDetails',
            },
            {
                name: 'Undefined',
                value: 'Undefined',
            },
        ],
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['getAllSessions', 'getSessionById'],
            },
        },
    },

    {
        displayName: 'Reactivate On New Message',
        name: 'reactivateOnNewMessage',
        type: 'boolean',
        default: false,
        description: 'Whether the conversation should be reactivated when receiving a new message from the contact. The default value is false.',
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['concludeSession'],
            },
        },
    },

    {
        displayName: 'Templates Name or ID',
        name: 'templatesBySession',
        type: 'options',
        typeOptions: {
            loadOptionsDependsOn: ['sessionId'],
            loadOptionsMethod: 'getTemplatesSession'
        },
        options: [
            {name: 'Undefined', value: 'NOT_SEND'}
        ],
        default: 'NOT_SEND',
        placeholder: 'Choose your template',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['sendMessageTemplateSession'],
            },
        },
    },

    {
        displayName: 'Params',
        name: 'paramsTemplatesSession',
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
                            loadOptionsDependsOn: ['templatesBySession'],
                            loadOptionsMethod: 'getNameParamsTemplatesSession'
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
                resource: ['session'],
                operation: ['sendMessageTemplateSession']
            },
            hide: {
                templatesBySession: ['NOT_SEND']
            }
        }
    },
]

export const updateSessionFields: INodeProperties[] = [
    {
        displayName: 'Fields',
        name: 'fieldsUpdate',
        type: 'multiOptions',
        default: [],
        description: 'Defining the fields to be updated',
        options: [
            { name: 'Autocomplete', value: 'Autocomplete' },
            { name: 'DepartmentId', value: 'DepartmentId' },
            { name: 'EndAt', value: 'EndAt' },
            { name: 'Metadata', value: 'Metadata' },
            { name: 'Number', value: 'Number' },
            { name: 'ReactivateDisabled', value: 'ReactivateDisabled' },
            { name: 'Status', value: 'Status' },
            { name: 'UserId', value: 'UserId' },
        ],
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['updateSession'],
            },
        },
    },

    {
        displayName: 'Departments Name or ID',
        name: 'departmentIdUpdatedSession',
        type: 'options',
        default: 'NOT_SEND',
        placeholder: 'Choose department',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getDepartmentsIds',
        },
        options: [
            {name:'Undefined', value: 'NOT_SEND'}
        ],
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['updateSession'],
                fieldsUpdate: ['DepartmentId', 'UserId']
            },
        },
    },

    {
        displayName: 'User Name or ID',
        name: 'userIdByDepartmentUpdateSession',
        type: 'options',
        default: 'NOT_SEND',
        placeholder: 'Choose user',
        description: 'Update this list of users, every time you change departments, to show users from that department. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
        typeOptions: {
            loadOptionsMethod: 'getUsersByDepartments',
            loadOptionsDependsOn: ['departmentIdUpdatedSession'],
        },  
        options: [
            {name:'Undefined', value: 'NOT_SEND'}
        ],
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['updateSession'],
                fieldsUpdate: ['UserId']
            },
        },
    },

    {
        displayName: 'EndAt',
        name: 'endAt',
        type: 'dateTime',
        default: '',
        description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['updateSession'],
                fieldsUpdate: ['EndAt']
            },
        },
    },

    {
        displayName: 'Number',
        name: 'number',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['updateSession'],
                fieldsUpdate: ['Number']
            },
        },
    },

    {
        displayName: 'Status Session',
        name: 'statusUpdateSessionOption',
        type: 'options',
        default: 'UNDEFINED',
        placeholder: 'Choose status',
        options: [
            { name: 'Completed', value: 'COMPLETED' },
            { name: 'Hidden', value: 'HIDDEN' },
            { name: 'In Progress', value: 'IN_PROGRESS' },
            { name: 'Pending', value: 'PENDING' },
            { name: 'Started', value: 'STARTED' },
            { name: 'Undefined', value: 'UNDEFINED' }
        ],
        displayOptions: {
            show: {
                resource: ['session'],
                operation: ['updateSession'],
                fieldsUpdate: ['Status']
            },
        },
    },

    {
        displayName: 'Metada',
        name: 'metadataUpdateSession',
        placeholder: 'Add metada',
        type: 'fixedCollection',
        default: {},
        typeOptions: {
            multipleValues: true,
        },
        options: [
            {
                name: 'metadata',
                displayName: 'Metadata',
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
                resource: ['session'],
                operation: ['updateSession'],
                fieldsUpdate: ['Metadata']
            },
        },
    },
]