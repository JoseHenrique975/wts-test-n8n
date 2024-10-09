"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WtsChat = void 0;
const axios_1 = __importDefault(require("axios"));
const wts_core_service_1 = require("./wts-core.service");
const wts_chat_service_1 = require("./wts-chat.service");
const wts_crm_service_1 = require("./wts-crm.service");
class WtsChat {
    constructor() {
        this.description = {
            displayName: 'WTS Chat',
            name: 'wtsChat',
            icon: 'file:images/wtslogo.svg',
            group: ['transform'],
            version: [1],
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Get data from Wts API',
            defaults: {
                name: 'WTS Chat',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'wtsApi',
                    required: true,
                },
            ],
            requestDefaults: {
                baseURL: 'https://api.wts.chat',
            },
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Contact',
                            value: 'contact',
                        },
                        {
                            name: 'Message',
                            value: 'message',
                        },
                        {
                            name: 'Session',
                            value: 'session',
                        },
                        {
                            name: 'Panel',
                            value: 'panel'
                        }
                    ],
                    default: 'contact',
                    description: 'Resource to use',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    displayOptions: {
                        show: {
                            resource: ['contact']
                        }
                    },
                    options: [
                        {
                            name: 'Get All Contacts',
                            value: 'getAllContacts',
                            description: 'Fetch all contacts from the API',
                            action: 'List contacts',
                            default: 'contact'
                        },
                        {
                            name: 'Get By ID',
                            value: 'getContactById',
                            description: 'Get contact by ID',
                            action: 'Get contact by id',
                            default: 'contact'
                        },
                        {
                            name: 'Get By Phone',
                            value: 'getContactByPhone',
                            description: 'Get contact by phonenumber',
                            action: 'Get contact by phone',
                            default: 'contact'
                        },
                        {
                            name: 'Create Contact',
                            value: 'createContact',
                            action: 'Create contact',
                            default: 'contact'
                        }
                    ],
                    default: 'getAllContacts',
                    noDataExpression: true
                },
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
                            name: 'Get All Messages', value: 'getAllMessages',
                            action: 'Get all messages a message',
                        },
                        {
                            name: 'Get Message By ID', value: 'getMessageById',
                            action: 'Get message by id a message',
                        },
                        {
                            name: 'Get Message Status', value: 'getMessageStatus',
                            action: 'Get message status a message',
                        },
                        {
                            name: 'Send Message File', value: 'sendMessageFile',
                            action: 'Send message file a message',
                        },
                        {
                            name: 'Send Message Template', value: 'sendMessageTemplate',
                            action: 'Send message template a message',
                        },
                        {
                            name: 'Send Message Text', value: 'sendMessageText',
                            action: 'Send message text a message',
                        },
                    ],
                    default: 'getMessageById',
                    noDataExpression: true
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    displayOptions: {
                        show: {
                            resource: ['panel']
                        }
                    },
                    options: [
                        {
                            name: 'Gel All Annotation',
                            value: 'getAllAnnotation',
                            description: 'Get all notes from a card',
                            action: 'List notes from a card',
                            default: 'panel'
                        },
                        {
                            name: 'Create Card',
                            value: 'createCard',
                            description: 'Create card in panel',
                            action: 'Create card',
                            default: 'panel'
                        },
                        {
                            name: 'Create Annotation Text',
                            value: 'createAnnotationText',
                            action: 'Create annotation text',
                            default: 'panel'
                        },
                        {
                            name: 'Create Annotation File',
                            value: 'createAnnotationFile',
                            action: 'Create annotation file',
                            default: 'panel'
                        }
                    ],
                    default: 'getAllAnnotation',
                    noDataExpression: true
                },
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
                            name: 'Get All Sessions',
                            value: 'getAllSessions',
                            action: 'List sessions',
                            default: 'session'
                        },
                        {
                            name: 'Update Session',
                            value: 'updateSession',
                            action: 'Update session',
                            default: 'session'
                        },
                        {
                            name: 'Update Status Session',
                            value: 'updateStatusSession',
                            action: 'Update status session',
                            default: 'session'
                        }
                    ],
                    default: 'getAllSessions',
                    noDataExpression: true
                },
                {
                    displayName: 'Panel Name or ID',
                    name: 'panels',
                    type: 'options',
                    default: '',
                    placeholder: 'Choose Panel',
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
                    typeOptions: {
                        loadOptionsMethod: 'getPanels',
                    },
                    displayOptions: {
                        show: {
                            resource: ['panel'],
                            operation: ['createCard'],
                        },
                    },
                },
                {
                    displayName: 'Step Name or ID',
                    name: 'stepPanels',
                    type: 'options',
                    default: '',
                    placeholder: 'Choose Step',
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
                    typeOptions: {
                        loadOptionsDependsOn: ['panels'],
                        loadOptionsMethod: 'getStepsPanelId'
                    },
                    displayOptions: {
                        show: {
                            resource: ['panel'],
                            operation: ['createCard'],
                        },
                    },
                },
                {
                    displayName: 'Tag Names or IDs',
                    name: 'tagsPanel',
                    type: 'multiOptions',
                    default: [],
                    placeholder: 'Choose Tag',
                    description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
                    typeOptions: {
                        loadOptionsDependsOn: ['stepPanels'],
                        loadOptionsMethod: 'getTagsPanel'
                    },
                    displayOptions: {
                        show: {
                            resource: ['panel'],
                            operation: ['createCard'],
                        },
                    },
                },
                {
                    displayName: 'Title',
                    name: 'title',
                    type: 'string',
                    default: '',
                    displayOptions: {
                        show: {
                            resource: ['panel'],
                            operation: ['createCard'],
                        },
                    },
                },
                {
                    displayName: 'Description',
                    name: 'description',
                    type: 'string',
                    default: '',
                    typeOptions: {
                        rows: 4,
                    },
                    description: 'Make your description',
                    displayOptions: {
                        show: {
                            resource: ['panel'],
                            operation: ['createCard'],
                        },
                    },
                },
                {
                    displayName: 'Page Number',
                    name: 'pageNumber',
                    type: 'number',
                    default: 1,
                    description: 'The page number to retrieve',
                    displayOptions: {
                        show: {
                            resource: ['contact', 'message', 'session', 'panel'],
                            operation: ['getAllContacts', 'getAllMessages', 'getAllSessions', 'getAllAnnotation'],
                        },
                    },
                },
                {
                    displayName: 'Page Size',
                    name: 'pageSize',
                    type: 'number',
                    default: 10,
                    description: 'The number of items per page',
                    displayOptions: {
                        show: {
                            resource: ['contact', 'message', 'session', 'panel'],
                            operation: ['getAllContacts', 'getAllMessages', 'getAllSessions', 'getAllAnnotation'],
                        },
                    },
                    typeOptions: {
                        minValue: 1,
                        maxValue: 100,
                    },
                },
                {
                    displayName: 'Order By',
                    name: 'orderBy',
                    type: 'string',
                    default: '',
                    description: 'Field to sort by',
                    displayOptions: {
                        show: {
                            resource: ['contact', 'message', 'session', 'panel'],
                            operation: ['getAllContacts', 'getAllMessages', 'getAllSessions', 'getAllAnnotation'],
                        },
                    },
                },
                {
                    displayName: 'Order Direction',
                    name: 'orderDirection',
                    type: 'options',
                    options: [
                        { name: 'Ascending', value: 'ASCENDING' },
                        { name: 'Descending', value: 'DESCENDING' },
                    ],
                    default: 'ASCENDING',
                    description: 'Direction of sorting',
                    displayOptions: {
                        show: {
                            resource: ['contact', 'message', 'session', 'panel'],
                            operation: ['getAllContacts', 'getAllMessages', 'getAllSessions', 'getAllAnnotation'],
                        },
                    },
                },
                {
                    displayName: 'Contact ID',
                    name: 'contactId',
                    type: 'string',
                    default: 'Enter contact Id',
                    displayOptions: {
                        show: {
                            resource: ['contact'],
                            operation: ['getContactById'],
                        },
                    },
                },
                {
                    displayName: 'Phone Number',
                    name: 'phonenumber',
                    type: 'string',
                    default: 'Enter phonenumber',
                    displayOptions: {
                        show: {
                            resource: ['contact'],
                            operation: ['getContactByPhone', 'createContact'],
                        },
                    },
                },
                {
                    displayName: 'Name',
                    name: 'name',
                    type: 'string',
                    default: '',
                    placeholder: 'Example',
                    displayOptions: {
                        show: {
                            resource: ['contact'],
                            operation: ['createContact'],
                        },
                    },
                },
                {
                    displayName: 'E-Mail',
                    name: 'email',
                    type: 'string',
                    default: '',
                    placeholder: 'example@example.com',
                    displayOptions: {
                        show: {
                            resource: ['contact'],
                            operation: ['createContact'],
                        },
                    },
                },
                {
                    displayName: 'Instagram',
                    name: 'instagram',
                    type: 'string',
                    default: '',
                    description: 'Enter your Instagram name',
                    displayOptions: {
                        show: {
                            resource: ['contact'],
                            operation: ['createContact'],
                        },
                    },
                },
                {
                    displayName: 'Annotation',
                    name: 'annotation',
                    type: 'string',
                    default: '',
                    typeOptions: {
                        rows: 4,
                    },
                    description: 'Make your note',
                    displayOptions: {
                        show: {
                            resource: ['contact'],
                            operation: ['createContact'],
                        },
                    },
                },
                {
                    displayName: 'Tag Names or IDs',
                    name: 'tagIds',
                    type: 'multiOptions',
                    description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
                    default: [],
                    typeOptions: {
                        loadOptionsMethod: 'getTagsIds',
                    },
                    displayOptions: {
                        show: {
                            resource: ['contact', 'session'],
                            operation: ['createContact', 'getAllSessions'],
                        },
                    },
                },
                {
                    displayName: 'Upsert',
                    name: 'upsert',
                    type: 'boolean',
                    default: false,
                    description: 'Whether with this option enabled, if the contact already exists in the database, it will be updated with the new data and returned',
                    displayOptions: {
                        show: {
                            resource: ['contact'],
                            operation: ['createContact'],
                        },
                    },
                },
                {
                    displayName: 'Get If Exists?',
                    name: 'getIfExists',
                    type: 'boolean',
                    default: false,
                    description: 'Whether with this option enabled, if the contact already exists in the database, it will be returned and no data will be updated',
                    displayOptions: {
                        show: {
                            resource: ['contact'],
                            operation: ['createContact'],
                        },
                    },
                },
                {
                    displayName: 'Message ID',
                    name: 'messageId',
                    type: 'string',
                    default: 'Enter message Id',
                    displayOptions: {
                        show: {
                            resource: ['message'],
                            operation: ['getMessageById', 'getMessageStatus'],
                        },
                    },
                },
                {
                    displayName: 'Session ID',
                    name: 'sessionId',
                    type: 'string',
                    default: '',
                    placeholder: 'Enter session ID',
                    displayOptions: {
                        show: {
                            resource: ['message', 'session'],
                            operation: ['getAllMessages', 'sendMessageText', 'sendMessageFile', 'sendMessageTemplate', 'updateSession', 'updateStatusSession'],
                        },
                    },
                },
                {
                    displayName: 'CreatedAt.After',
                    name: 'createdAtAfter',
                    type: 'dateTime',
                    default: '',
                    description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
                    displayOptions: {
                        show: {
                            resource: ['message', 'session'],
                            operation: ['getAllMessages', 'getAllSessions'],
                        },
                    },
                },
                {
                    displayName: 'CreatedAt.Before',
                    name: 'createdAtBefore',
                    type: 'dateTime',
                    default: '',
                    description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
                    displayOptions: {
                        show: {
                            resource: ['message', 'session'],
                            operation: ['getAllMessages', 'getAllSessions'],
                        },
                    },
                },
                {
                    displayName: 'UpdatedAt.After',
                    name: 'updatedAtAfter',
                    type: 'dateTime',
                    default: '',
                    description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
                    displayOptions: {
                        show: {
                            resource: ['message', 'session'],
                            operation: ['getAllMessages', 'getAllSessions'],
                        },
                    },
                },
                {
                    displayName: 'UpdatedAt.Before',
                    name: 'updatedAtBefore',
                    type: 'dateTime',
                    default: '',
                    description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
                    displayOptions: {
                        show: {
                            resource: ['message', 'session'],
                            operation: ['getAllMessages', 'getAllSessions'],
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
                    displayName: 'From Name or ID',
                    name: 'channelId',
                    type: 'options',
                    default: '',
                    placeholder: 'Choose Channel',
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
                    typeOptions: {
                        loadOptionsMethod: 'getChannelsIds',
                    },
                    displayOptions: {
                        show: {
                            resource: ['message'],
                            operation: ['sendMessageText', 'sendMessageFile', 'sendMessageTemplate'],
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
                            resource: ['message'],
                            operation: ['sendMessageText', 'sendMessageFile', 'sendMessageTemplate'],
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
                    default: '',
                    placeholder: 'Choose your template',
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
                    displayOptions: {
                        show: {
                            resource: ['message'],
                            operation: ['sendMessageTemplate'],
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
                                        loadOptionsMethod: 'getNameTemplates'
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
                            operation: ['sendMessageTemplate']
                        }
                    }
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
                            resource: ['message'],
                            operation: ['sendMessageFile', 'createAnnotationFile'],
                        },
                    },
                    modes: [
                        {
                            displayName: 'hdbs',
                            name: 'dshbfus',
                            type: 'string',
                            validation: [
                                {
                                    type: 'regex',
                                    properties: {
                                        regex: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                                        errorMessage: 'Not a valid URL',
                                    },
                                }
                            ],
                        }
                    ]
                },
                {
                    displayName: 'File Urls',
                    name: 'fileUrls',
                    type: 'collection',
                    default: [],
                    placeholder: 'Add File',
                    options: [
                        {
                            displayName: 'URL',
                            name: 'fileUrl',
                            type: 'string',
                            default: '',
                            typeOptions: {
                                multipleValues: true
                            },
                            placeholder: 'Add url file'
                        },
                    ],
                    description: 'Specify a list of items',
                    displayOptions: {
                        show: {
                            resource: ['panel'],
                            operation: ['createAnnotationFile']
                        }
                    }
                },
                {
                    displayName: 'Text',
                    name: 'textMessage',
                    type: 'string',
                    default: '',
                    placeholder: 'Write the text you want to send',
                    typeOptions: {
                        rows: 3,
                    },
                    displayOptions: {
                        show: {
                            resource: ['message', 'panel'],
                            operation: ['sendMessageText', 'createAnnotationText'],
                        },
                    },
                },
                {
                    displayName: 'Bots Name or ID',
                    name: 'botId',
                    type: 'options',
                    default: '',
                    placeholder: 'Choose bot',
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
                    typeOptions: {
                        loadOptionsMethod: 'getBots',
                    },
                    displayOptions: {
                        show: {
                            resource: ['message'],
                            operation: ['sendMessageText', 'sendMessageFile', 'sendMessageTemplate'],
                        },
                    },
                },
                {
                    displayName: 'Departments Name or ID',
                    name: 'departmentId',
                    type: 'options',
                    default: '',
                    placeholder: 'Choose department',
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
                    typeOptions: {
                        loadOptionsMethod: 'getDepartmentsIds',
                    },
                    displayOptions: {
                        show: {
                            resource: ['message', 'session'],
                            operation: ['sendMessageText', 'getAllSessions', 'sendMessageFile', 'sendMessageTemplate', 'updateSession'],
                        },
                    },
                },
                {
                    displayName: 'User Name or ID',
                    name: 'userIdByDepartment',
                    type: 'options',
                    default: '',
                    placeholder: 'Choose user',
                    description: 'Update this list of users, every time you change departments, to show users from that department. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
                    typeOptions: {
                        loadOptionsMethod: 'getUsersByDepartments',
                        loadOptionsDependsOn: ['departmentId'],
                    },
                    displayOptions: {
                        show: {
                            resource: ['message', 'session'],
                            operation: ['sendMessageText', 'sendMessageFile', 'sendMessageTemplate', 'updateSession']
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
                    displayName: 'User Name or ID',
                    name: 'userId',
                    type: 'options',
                    default: '',
                    placeholder: 'Choose user',
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
                    typeOptions: {
                        loadOptionsMethod: 'getUsersIds',
                    },
                    displayOptions: {
                        show: {
                            resource: ['session', 'panel'],
                            operation: ['getAllSessions', 'createCard'],
                        },
                    },
                },
                {
                    displayName: 'Contact ID',
                    name: 'contactId',
                    type: 'string',
                    default: '',
                    placeholder: 'Enter contact ID',
                    displayOptions: {
                        show: {
                            resource: ['message', 'session', 'panel'],
                            operation: ['sendMessageText', 'getAllSessions', 'createCard'],
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
                        { name: 'Undefined', value: 'UNDEFINED' }
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
                            operation: ['getAllSessions'],
                        },
                    },
                },
                {
                    displayName: 'Card ID',
                    name: 'cardId',
                    type: 'string',
                    default: '',
                    placeholder: 'Enter card ID',
                    displayOptions: {
                        show: {
                            resource: ['panel'],
                            operation: ['getAllAnnotation', 'createAnnotationText', 'createAnnotationFile'],
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
                            operation: ['sendMessageText', 'sendMessageFile', 'sendMessageTemplate'],
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
                            operation: ['sendMessageText', 'sendMessageFile', 'sendMessageTemplate'],
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
                            resource: ['message'],
                            operation: ['sendMessageText', 'sendMessageFile', 'sendMessageTemplate'],
                        },
                    },
                },
                {
                    displayName: 'Monetary Amount',
                    name: 'monetaryAmount',
                    type: 'number',
                    default: '',
                    placeholder: 'Enter amount',
                    displayOptions: {
                        show: {
                            resource: ['panel'],
                            operation: ['createCard'],
                        },
                    },
                },
                {
                    displayName: 'Position',
                    name: 'position',
                    type: 'number',
                    default: '',
                    placeholder: 'Enter position',
                    displayOptions: {
                        show: {
                            resource: ['panel'],
                            operation: ['createCard'],
                        },
                    },
                },
                {
                    displayName: 'Custom Fields',
                    name: 'customFields',
                    type: 'fixedCollection',
                    default: {},
                    placeholder: 'Add custom fields',
                    typeOptions: {
                        multipleValues: true,
                    },
                    options: [
                        {
                            name: 'customFields',
                            displayName: 'Custom Fields',
                            values: [
                                {
                                    displayName: 'Key Name or ID',
                                    name: 'key',
                                    type: 'options',
                                    default: '',
                                    typeOptions: {
                                        loadOptionsMethod: 'getCustomFields',
                                    },
                                    description: 'Select the key for the custom field. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
                                },
                                {
                                    displayName: 'Value',
                                    name: 'value',
                                    type: 'string',
                                    default: '',
                                    description: 'Value to set for the metadata key',
                                },
                            ],
                        },
                    ],
                    displayOptions: {
                        show: {
                            resource: ['contact'],
                            operation: ['createContact'],
                        },
                    },
                },
                {
                    displayName: 'Custom Fields',
                    name: 'customFieldsPanel',
                    type: 'fixedCollection',
                    default: {},
                    placeholder: 'Add custom fields',
                    typeOptions: {
                        multipleValues: true,
                    },
                    options: [
                        {
                            name: 'customFields',
                            displayName: 'Custom Fields',
                            values: [
                                {
                                    displayName: 'Key Name or ID',
                                    name: 'key',
                                    type: 'options',
                                    default: '',
                                    typeOptions: {
                                        loadOptionsMethod: 'getCustomFieldsPanel',
                                        loadOptionsDependsOn: ['panels']
                                    },
                                    description: 'Select the key for the custom field. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
                                },
                                {
                                    displayName: 'Value',
                                    name: 'value',
                                    type: 'string',
                                    default: '',
                                    description: 'Value to set for the metadata key',
                                },
                            ],
                        },
                    ],
                    displayOptions: {
                        show: {
                            resource: ['panel'],
                            operation: ['createCard'],
                        },
                    },
                },
                {
                    displayName: 'Metada',
                    name: 'metadata',
                    placeholder: 'Add Metada',
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
                                    name: 'metadataKey',
                                    type: 'string',
                                    default: '',
                                },
                                {
                                    displayName: 'Value',
                                    name: 'metadaValue',
                                    type: 'string',
                                    default: '',
                                },
                            ],
                        },
                    ],
                    displayOptions: {
                        show: {
                            resource: ['contact', 'panel'],
                            operation: ['createContact', 'createCard'],
                        },
                    },
                },
            ],
        };
        this.methods = {
            loadOptions: {
                async getCustomFields() {
                    return await wts_core_service_1.WtsCoreService.getCustomFields(this);
                },
                async getTagsIds() {
                    return await wts_core_service_1.WtsCoreService.getTagsIds(this);
                },
                async getUsersIds() {
                    return await wts_core_service_1.WtsCoreService.getUsersIds(this);
                },
                async getDepartmentsIds() {
                    return await wts_core_service_1.WtsCoreService.getDepartmentsIds(this);
                },
                async getUsersByDepartments() {
                    const departmentId = this.getCurrentNodeParameter('departmentId');
                    const credentials = await this.getCredentials('wtsApi');
                    const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
                    return await wts_core_service_1.WtsCoreService.getUsersByDepartments(departmentId, token);
                },
                async getPanels() {
                    return await wts_crm_service_1.WtsCrmService.getPanels(this);
                },
                async getCustomFieldsPanel() {
                    const panelId = this.getNodeParameter('panels');
                    const credentials = await this.getCredentials('wtsApi');
                    const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
                    return await wts_crm_service_1.WtsCrmService.getCustomFieldsPanel(panelId, token);
                },
                async getStepsPanelId() {
                    const panelId = this.getNodeParameter('panels');
                    const credentials = await this.getCredentials('wtsApi');
                    const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
                    return await wts_crm_service_1.WtsCrmService.getStepsPanelId(panelId, token);
                },
                async getTagsPanel() {
                    const panelId = this.getNodeParameter('panels');
                    return await wts_crm_service_1.WtsCrmService.getTagsPanel(panelId, this);
                },
                async getTemplates() {
                    const channelId = this.getCurrentNodeParameter('channelId');
                    const credentials = await this.getCredentials('wtsApi');
                    const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
                    return await wts_chat_service_1.WtsChatService.getTemplates(channelId, token);
                },
                async getTemplatesIds() {
                    const channelId = this.getCurrentNodeParameter('channelId');
                    const credentials = await this.getCredentials('wtsApi');
                    const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
                    return await wts_chat_service_1.WtsChatService.getTemplates(channelId, token);
                },
                async getNameTemplates() {
                    const template = this.getCurrentNodeParameter('templates');
                    const channelId = this.getCurrentNodeParameter('channelId');
                    const credentials = await this.getCredentials('wtsApi');
                    const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
                    return await wts_chat_service_1.WtsChatService.getNameTemplates(template, channelId, token);
                },
                async getChannelsIds() {
                    return await wts_chat_service_1.WtsChatService.getChannelsIds(this);
                },
                async getBots() {
                    return await wts_chat_service_1.WtsChatService.getBots(this);
                },
            },
        };
    }
    async execute() {
        var _a, _b, _c, _d;
        const results = [[]];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        const credentials = await this.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        const baseURL = 'https://api.wts.chat';
        if (resource === 'contact' && operation === 'getContactById') {
            const idContact = this.getNodeParameter('contactId', 0);
            try{
                var data = await wts_core_service_1.WtsCoreService.getContactById(idContact, token);
                const items = [{ json: data }];
                results[0] = items;
            }catch(error){
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
          
        }
        else if (resource === 'contact' && operation === 'getContactByPhone') {
            const phoneNumber = this.getNodeParameter('phonenumber', 0);
            const url = `${baseURL}/core/v1/contact/phonenumber/${phoneNumber}`;
            try {
                const response = await axios_1.default.get(url, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [{ json: data, },];
                results[0] = items;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'contact' && operation === 'getAllContacts') {
            const pageNumber = this.getNodeParameter('pageNumber', 0);
            const pageSize = this.getNodeParameter('pageSize', 0);
            const orderBy = this.getNodeParameter('orderBy', 0);
            const orderDirection = this.getNodeParameter('orderDirection', 0);
            const url = `${baseURL}/core/v1/contact`;
            const credentials = await this.getCredentials('wtsApi');
            const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
            try {
                const response = await axios_1.default.get(url, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: pageNumber,
                        pageSize,
                        orderBy,
                        orderDirection,
                    },
                });
                const data = response.data;
                const items = data.items.map((contact) => ({
                    json: contact,
                }));
                results[0] = items;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'contact' && operation === 'createContact') {
            const url = `${baseURL}/core/v1/contact`;
            const name = this.getNodeParameter('name', 0);
            const email = this.getNodeParameter('email', 0);
            const phonenumber = this.getNodeParameter('phonenumber', 0);
            const instagram = this.getNodeParameter('instagram', 0);
            const annotation = this.getNodeParameter('annotation', 0);
            const customFields = this.getNodeParameter('customFields', 0);
            const tagIds = this.getNodeParameter('tagIds', 0);
            const metadata = this.getNodeParameter('metadata', 0);
            const upsert = this.getNodeParameter('upsert', 0);
            const getIfExists = this.getNodeParameter('getIfExists', 0);
            const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            const matchEmail = email.match(regexEmail);
            if (!matchEmail) {
                throw new NodeApiError(this.getNode(), {
					message: 'Invalid email!',
					description: 'Invalid email!',
				});
            }
            const customFieldsObject = (_a = customFields === null || customFields === void 0 ? void 0 : customFields.customFields) === null || _a === void 0 ? void 0 : _a.reduce((acc, field) => {
                acc[field.key] = field.value;
                return acc;
            }, {});
            const metadataObject = (_b = metadata === null || metadata === void 0 ? void 0 : metadata.metadata) === null || _b === void 0 ? void 0 : _b.reduce((acc, metadata) => {
                acc[metadata.key] = metadata.value;
                return acc;
            }, {});
            const body = {
                name: name,
                email: email,
                phonenumber: phonenumber,
                instagram: instagram,
                annotation: annotation,
                tagIds: tagIds,
                ...(metadataObject && { metadata: metadataObject }),
                ...(customFieldsObject && { customFields: customFieldsObject }),
                options: {
                    ...(upsert && { upsert: upsert }),
                    ...(getIfExists && { getIfExists: getIfExists }),
                }
            };
            try {
                const response = await axios_1.default.post(url, body, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [
                    {
                        json: data,
                    },
                ];
                results[0] = items;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'message' && operation === 'getMessageById') {
            const idMessage = this.getNodeParameter('messageId', 0);
            const urlMessage = `${baseURL}/chat/v1/message/${idMessage}`;
            try {
                const response = await axios_1.default.get(urlMessage, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [{ json: data, },];
                results[0] = items;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'message' && operation === 'getMessageStatus') {
            const idMessage = this.getNodeParameter('messageId', 0);
            const urlMessage = `${baseURL}/chat/v1/message/${idMessage}/status`;
            try {
                const response = await axios_1.default.get(urlMessage, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [
                    {
                        json: data,
                    },
                ];
                results[0] = items;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'message' && operation === 'getAllMessages') {
            const sessionId = this.getNodeParameter('sessionId', 0);
            const pageNumber = this.getNodeParameter('pageNumber', 0);
            const pageSize = this.getNodeParameter('pageSize', 0);
            const orderBy = this.getNodeParameter('orderBy', 0);
            const orderDirection = this.getNodeParameter('orderDirection', 0);
            const createdAtAfter = this.getNodeParameter('createdAtAfter', 0);
            const createdAtBefore = this.getNodeParameter('createdAtBefore', 0);
            const updatedAtAfter = this.getNodeParameter('updatedAtAfter', 0);
            const updatedAtBefore = this.getNodeParameter('updatedAtBefore', 0);
            const urlMessage = `${baseURL}/chat/v1/message`;
            try {
                const response = await axios_1.default.get(urlMessage, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        sessionId: sessionId,
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        orderBy: orderBy,
                        orderDirection: orderDirection,
                        'CreatedAt.After': createdAtAfter,
                        'CreatedAt.Before': createdAtBefore,
                        'UpdatedAt.After': updatedAtAfter,
                        'UpdatedAt.Before': updatedAtBefore,
                    },
                });
                const data = response.data;
                const items = data.items.map((contact) => ({
                    json: contact,
                }));
                results[0] = items;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'message' && operation === 'sendMessageText') {
            const from = this.getNodeParameter('channelId', 0);
            const to = this.getNodeParameter('numberToSend', 0);
            const text = this.getNodeParameter('textMessage', 0);
            const botId = this.getNodeParameter('botId', 0);
            const departmentId = this.getNodeParameter('departmentId', 0);
            const sessionId = this.getNodeParameter('sessionId', 0);
            const userId = this.getNodeParameter('userIdByDepartment', 0);
            const enableBot = this.getNodeParameter('enableBot', 0);
            const hiddenSession = this.getNodeParameter('hiddenSession', 0);
            const forceStartSession = this.getNodeParameter('forceStartSession', 0);
            const urlSendMessage = `${baseURL}/chat/v1/message/send`;
            const body = {
                from: from,
                to: to,
                body: {
                    text: text,
                },
                options: {
                    enableBot: enableBot,
                    hiddenSession: hiddenSession,
                    forceStartSession: forceStartSession
                },
                ...(departmentId && { department: { id: departmentId } }),
                ...(sessionId && { sessionId: sessionId }),
                ...(botId && { botId: botId }),
                ...(userId && { user: { id: userId } }),
            };
            try {
                const response = await axios_1.default.post(urlSendMessage, body, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [];
                items.push({ json: data });
                results[0] = items;
                return results;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'session' && operation === 'getAllSessions') {
            const pageNumber = this.getNodeParameter('pageNumber', 0);
            const pageSize = this.getNodeParameter('pageSize', 0);
            const orderBy = this.getNodeParameter('orderBy', 0);
            const orderDirection = this.getNodeParameter('orderDirection', 0);
            const createdAtAfter = this.getNodeParameter('createdAtAfter', 0);
            const createdAtBefore = this.getNodeParameter('createdAtBefore', 0);
            const updatedAtAfter = this.getNodeParameter('updatedAtAfter', 0);
            const updatedAtBefore = this.getNodeParameter('updatedAtBefore', 0);
            const activeAtAfter = this.getNodeParameter('activeAtAfter', 0);
            const activeAtBefore = this.getNodeParameter('activeAtBefore', 0);
            const endAtAfter = this.getNodeParameter('endAtAfter', 0);
            const endAtBefore = this.getNodeParameter('endAtBefore', 0);
            const statusSession = this.getNodeParameter('statusSession', 0);
            const departmentId = this.getNodeParameter('departmentId', 0);
            const userId = this.getNodeParameter('userId', 0);
            const tagIds = this.getNodeParameter('tagIds', 0);
            const channelsIds = this.getNodeParameter('channelsIds', 0);
            const contactId = this.getNodeParameter('contactId', 0);
            const includeDetails = this.getNodeParameter('includeDetails', 0);
            let urlSession = `${baseURL}/chat/v1/session`;
            const params = new URLSearchParams({});
            channelsIds.forEach(id => params.append('ChannelsId', id));
            statusSession.forEach(status => params.append('Status', status));
            includeDetails.forEach(details => params.append('IncludeDetails', details));
            urlSession += `?${params.toString()}`;
            try {
                const response = await axios_1.default.get(urlSession, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        status: statusSession,
                        departmentId: departmentId,
                        userId: userId,
                        tagsId: tagIds,
                        contactId: contactId,
                        includeDetails: includeDetails,
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        orderBy: orderBy,
                        orderDirection: orderDirection,
                        'CreatedAt.After': createdAtAfter,
                        'CreatedAt.Before': createdAtBefore,
                        'UpdatedAt.After': updatedAtAfter,
                        'UpdatedAt.Before': updatedAtBefore,
                        "ActiveAt.After": activeAtAfter,
                        "ActiveAt.Before": activeAtBefore,
                        "EndAt.After": endAtAfter,
                        "EndAt.Before": endAtBefore
                    },
                });
                const data = response.data;
                ("Data");
                (data);
                const items = data.items.map((session) => ({
                    json: session,
                }));
                results[0] = items;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'panel' && operation === 'getAllAnnotation') {
            const cardId = this.getNodeParameter('cardId', 0);
            const pageNumber = this.getNodeParameter('pageNumber', 0);
            const pageSize = this.getNodeParameter('pageSize', 0);
            const orderBy = this.getNodeParameter('orderBy', 0);
            const orderDirection = this.getNodeParameter('orderDirection', 0);
            const url = `${baseURL}/crm/v1/panel/card/${cardId}/note`;
            try {
                const response = await axios_1.default.get(url, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                        orderBy: orderBy,
                        orderDirection: orderDirection
                    },
                });
                const data = response.data;
                const items = data.items.map((session) => ({
                    json: session,
                }));
                results[0] = items;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'message' && operation === 'sendMessageFile') {
            const from = this.getNodeParameter('channelId', 0);
            const to = this.getNodeParameter('numberToSend', 0);
            const fileUrl = this.getNodeParameter('urlFile', 0);
            const botId = this.getNodeParameter('botId', 0);
            const departmentId = this.getNodeParameter('departmentId', 0);
            const sessionId = this.getNodeParameter('sessionId', 0);
            const userId = this.getNodeParameter('userIdByDepartment', 0);
            const enableBot = this.getNodeParameter('enableBot', 0);
            const hiddenSession = this.getNodeParameter('hiddenSession', 0);
            const forceStartSession = this.getNodeParameter('forceStartSession', 0);
            const url = `${baseURL}/chat/v1/message/send`;
            const body = {
                from: from,
                to: to,
                body: {
                    fileUrl: fileUrl,
                },
                options: {
                    enableBot: enableBot,
                    hiddenSession: hiddenSession,
                    forceStartSession: forceStartSession
                },
                ...(departmentId && { department: { id: departmentId } }),
                ...(sessionId && { sessionId: sessionId }),
                ...(botId && { botId: botId }),
                ...(userId && { user: { id: userId } }),
            };
            try {
                const response = await axios_1.default.post(url, body, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [];
                items.push({ json: data });
                results[0] = items;
                return results;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'message' && operation === 'sendMessageTemplate') {
            const from = this.getNodeParameter('channelId', 0);
            const template = this.getNodeParameter('templates', 0);
            let templateObj = null;
            if (template) {
                templateObj = await wts_chat_service_1.WtsChatService.getTemplateIds(from, token, template);
            }
            const templateId = templateObj === null || templateObj === void 0 ? void 0 : templateObj.id;
            const paramsTemplates = this.getNodeParameter('paramsTemplates', 0);
            const paramsArray = paramsTemplates.paramsTemplatesValues;
            const to = this.getNodeParameter('numberToSend', 0);
            const departmentId = this.getNodeParameter('departmentId', 0);
            const sessionId = this.getNodeParameter('sessionId', 0);
            const userId = this.getNodeParameter('userIdByDepartment', 0);
            const botId = this.getNodeParameter('botId', 0);
            const enableBot = this.getNodeParameter('enableBot', 0);
            const hiddenSession = this.getNodeParameter('hiddenSession', 0);
            const forceStartSession = this.getNodeParameter('forceStartSession', 0);
            const nameSet = new Set();
            const uniqueParams = [];
            if (Array.isArray(paramsArray)) {
                paramsArray.forEach(param => {
                    const { name, value } = param;
                    if (!nameSet.has(name)) {
                        nameSet.add(name);
                        uniqueParams.push({ name, value });
                    }
                });
            }
            else {
                results[0] = [{ json: { error: 'No paramsTemplates found' } }];
            }
            const transformToObject = (params) => {
                const result = {};
                params.forEach(param => {
                    result[param.name] = param.value;
                });
                return { parameters: result };
            };
            const body = {
                from: from,
                to: to,
                body: {
                    templateId: templateId,
                    ...(uniqueParams && transformToObject(uniqueParams))
                },
                options: {
                    enableBot: enableBot,
                    hiddenSession: hiddenSession,
                    forceStartSession: forceStartSession
                },
                ...(sessionId && { sessionId: sessionId }),
                ...(botId && { botId: botId }),
                ...(userId && { user: { id: userId } }),
                ...(departmentId && { department: { id: departmentId } })
            };
            const url = `${baseURL}/chat/v1/message/send`;
            try {
                const response = await axios_1.default.post(url, body, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [];
                items.push({ json: data });
                results[0] = items;
                return results;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'panel' && operation === 'createCard') {
            const stepId = this.getNodeParameter('stepPanels', 0);
            const title = this.getNodeParameter('title', 0);
            const description = this.getNodeParameter('description', 0);
            const position = this.getNodeParameter('position', 0);
            const userId = this.getNodeParameter('userId', 0);
            const tagsPanelIds = this.getNodeParameter('tagsPanel', 0);
            const contactId = this.getNodeParameter('contactId', 0);
            const monetaryAmount = this.getNodeParameter('monetaryAmount', 0);
            const customFields = this.getNodeParameter('customFieldsPanel', 0);
            const metadata = this.getNodeParameter('metadata', 0);
            const customFieldsObject = (_c = customFields === null || customFields === void 0 ? void 0 : customFields.customFields) === null || _c === void 0 ? void 0 : _c.reduce((acc, field) => {
                acc[field.key] = field.value;
                return acc;
            }, {});
            const metadataObject = (_d = metadata === null || metadata === void 0 ? void 0 : metadata.metadata) === null || _d === void 0 ? void 0 : _d.reduce((acc, metadata) => {
                acc[metadata.key] = metadata.value;
                return acc;
            }, {});
            if (!title || title.trim() == '') {
                throw new NodeApiError(this.getNode(), {
                    message: 'Title is empty, please fill it in',
                    description: 'Title is empty, please fill it in',
                });
            }
            if (!stepId) {
                throw new NodeApiError(this.getNode(), {
                    message: 'Choose a panel and its step',
                    description: 'Choose a panel and its step',
                });
            }
            const body = {
                stepId: stepId,
                title: title,
                tagIds: tagsPanelIds,
                ...(monetaryAmount && { monetaryAmount: monetaryAmount }),
                ...(userId && { responsibleUserId: userId }),
                ...(contactId && { contactIds: [contactId] }),
                ...(position && { position: position }),
                ...(description && { description: description }),
                ...(metadataObject && { metadata: metadataObject }),
                ...(customFieldsObject && { customFields: customFieldsObject }),
            };
            const url = `${baseURL}/crm/v1/panel/card`;
            try {
                const response = await axios_1.default.post(url, body, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [];
                items.push({ json: data });
                results[0] = items;
                return results;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'panel' && operation === 'createAnnotationText') {
            const cardId = this.getNodeParameter('cardId', 0);
            const annotation = this.getNodeParameter('textMessage', 0);
            if (!cardId) {
                throw new NodeApiError(this.getNode(), {
                    message: 'Fill in the CardId field',
                    description: 'CardId cannot be empty',
                });
            }
            if (!annotation) {
                throw new NodeApiError(this.getNode(), {
                    message: 'Fill in the Text field',
                    description: 'Text cannot be empty',
                });
            }
            const url = `${baseURL}/crm/v1/panel/card/${cardId}/note`;
            const body = {
                text: annotation
            };
            try {
                const response = await axios_1.default.post(url, body, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [];
                items.push({ json: data });
                results[0] = items;
                return results;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'panel' && operation === 'createAnnotationFile') {
            const cardId = this.getNodeParameter('cardId', 0);
            const fileUrls = this.getNodeParameter('fileUrls', 0);
            const arrayUrls = fileUrls.fileUrl;
            if (!cardId) {
                throw new NodeApiError(this.getNode(), {
                    message: 'Fill in the CardId field',
                    description: 'CardId cannot be empty',
                });
            }
            if (!arrayUrls) {
            }
            const url = `${baseURL}/crm/v1/panel/card/${cardId}/note`;
            const body = {
                fileUrls: arrayUrls
            };
            try {
                const response = await axios_1.default.post(url, body, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [];
                items.push({ json: data });
                results[0] = items;
                return results;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'session' && operation === 'updateSession') {
            const sessionId = this.getNodeParameter('sessionId', 0);
            const departmentId = this.getNodeParameter('departmentId', 0);
            const userId = this.getNodeParameter('userIdByDepartment', 0);
            if (!sessionId) {
                throw new NodeApiError(this.getNode(), {
                    message: 'Fill in the field session',
                    description: 'Fill in the "sessionId" field',
                });
            }
            const url = `${baseURL}/chat/v1/session/${sessionId}/transfer`;
            let type = departmentId && userId ? 'USER' : 'DEPARTMENT';
            const body = {
                type: type,
                ...(departmentId && { newDepartmentId: departmentId }),
                ...(userId && { newUserId: userId })
            };
            try {
                const response = await axios_1.default.put(url, body, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [];
                items.push({ json: data });
                results[0] = items;
                return results;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        else if (resource === 'session' && operation === 'updateStatusSession') {
            const sessionId = this.getNodeParameter('sessionId', 0);
            const status = this.getNodeParameter('statusSessionOption', 0);
            if (!sessionId && !status) {
                throw new NodeApiError(this.getNode(), {
                    message: 'Fill in all fields',
                    description: 'Both sessionId and status are required to update the session status.',
                });
            }
            const url = `${baseURL}/chat/v1/session/${sessionId}/status`;
            const body = {
                newStatus: status
            };
            try {
                const response = await axios_1.default.put(url, body, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                const items = [];
                items.push({ json: data });
                results[0] = items;
                return results;
            }
            catch (error) {
                throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
            }
        }
        return results;
    }
}
exports.WtsChat = WtsChat;
//# sourceMappingURL=Wts.node.js.map