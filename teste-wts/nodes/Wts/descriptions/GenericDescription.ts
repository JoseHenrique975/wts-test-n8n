import { INodeProperties } from "n8n-workflow";
//import { notSend } from "../constants.types";

export const commonFields: INodeProperties[] = [

    //------------------------------------------
    //              Text
    //------------------------------------------

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
                resource: ['message', 'panel', 'session'],
                operation: ['sendText', 'createAnnotationText', 'sendMessageTextSession'],
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
                resource: ['contact', 'sequence'],
                operation: ['createContact', 'getAllSequences'],
            },
        },
    },


    //------------------------------
    //         TAGS
    //------------------------------

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

    //-------------------------------
    //          SESSION
    //-------------------------------
    {
        displayName: 'Session ID',
        name: 'sessionId',
        type: 'string',
        default: '',
        placeholder: 'Enter session ID',

        displayOptions: {
            show: {
                resource: ['message', 'session', 'panel', 'chatbot'],
                operation: ['getAllMessages', 'updateTransfer', 'updateStatusSession', 'sendChatbot', 'getSessionById', 'assignUser', 'concludeSession', 'updateSession', 'sendMessageTextSession', 'sendMessageFileSession', 'sendMessageTemplateSession'],
            },
        },
    },


    //-----------------------------
    //           BOTS
    //-----------------------------
    {
        displayName: 'Bots Name or ID',
        name: 'botId',
        type: 'options',
        default: 'NOT_SEND',
        placeholder: 'Choose bot',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getBots',
        },
        options: [
            {name: 'Undefined', value: 'NOT_SEND'}
        ],
        displayOptions: {
            show: {
                resource: ['message', 'chatbot'],
                operation: ['sendText', 'sendFile', 'sendTemplate', 'sendChatbot'],
            },
        },
    },



    //--------------------------------
    //      Departments && Users
    //--------------------------------

    {
        displayName: 'User Name or ID',
        name: 'userId',
        type: 'options',
        default: 'NOT_SEND',
        placeholder: 'Choose user',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
        typeOptions: {
            loadOptionsMethod: 'getUsersIds',
        },
        options: [
            {name:'Undefined', value: 'NOT_SEND'}
        ],
        displayOptions: {
            show: {
                resource: ['session', 'panel'],
                operation: ['getAllSessions', 'createCard', 'getAllCards', 'assignUser'],
            },
        },
    },

    {
        displayName: 'Departments Name or ID',
        name: 'departmentId',
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
                resource: ['message', 'session'],
                operation: ['sendText', 'getAllSessions', 'sendFile', 'sendTemplate', 'updateTransfer'],
            },
        },
    },

    {
        displayName: 'User Name or ID',
        name: 'userIdByDepartment',
        type: 'options',
        default: 'NOT_SEND',
        placeholder: 'Choose user',
        description: 'Update this list of users, every time you change departments, to show users from that department. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
        typeOptions: {
            loadOptionsMethod: 'getUsersByDepartments',
            loadOptionsDependsOn: ['departmentId'],
        },
        options: [
            {name:'Undefined', value: 'NOT_SEND'}
        ],
        displayOptions: {
            show: {
                resource: ['message', 'session'],
                operation: ['sendText', 'sendFile', 'sendTemplate', 'updateTransfer']
            },
            hide: {
                departmentId: ['NOT_SEND']
            }
        },
    },


    //----------------------
    //      CONTACT
    //----------------------

    {
        displayName: 'Contact ID',
        name: 'contactId',
        type: 'string',
        default: '',
        placeholder: 'Enter contact ID',

        displayOptions: {
            show: {
                resource: ['session', 'panel', 'sequence'],
                operation: ['getAllSessions', 'createCard', 'getAllCards', 'getAllSequences', 'addContactToSequence', 'removeContactToSequence'],
            },
        },
    },

    {
        displayName: 'Phone Number',
        name: 'phonenumber',
        type: 'string',
        default: '',
        placeholder: 'Enter phonenumber',
        displayOptions: {
            show: {
                resource: ['contact', 'session', 'sequence'],
                operation: ['getContactByPhone', 'createContact', 'addContactToSequence', 'removeContactToSequence'],
            },
        },
    },

    {
        displayName: 'Contacts ID',
        name: 'contactsId',
        type: 'collection',
        default: [],
        placeholder: 'Add Contact',
        options: [
            {
                displayName: 'ID',
                name: 'contactId',
                type: 'string',
                default: '',
                typeOptions: {
                    multipleValues: true
                },
                placeholder: 'Add ID contact'
            },
        ],
        description: 'Specify a list of items',
        displayOptions: {
            show: {
                resource: ['panel', 'sequence'],
                operation: ['addContactsToSequence', 'removeContactsToSequence']
            }
        }
    },
]

export const metadataFields: INodeProperties[] = [
    //--------------------------------
    //        METADATA
    //--------------------------------

    {
        displayName: 'Metada',
        name: 'metadata',
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
                resource: ['contact', 'panel'],
                operation: ['createContact', 'createCard', 'updateCard'],
            },
        },
    },

]

export const dateFields: INodeProperties[] = [

    //------------------------------
    //          DATE
    //------------------------------

    {
        displayName: 'CreatedAt.After',
        name: 'createdAtAfter',
        type: 'dateTime',
        default: '',
        description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
        displayOptions: {
            show: {
                resource: ['message', 'session', 'panel', 'sequence', 'contact'],
                operation: ['getAllMessages', 'getAllSessions', 'getAllPanels', 'getAllCards', 'getAllSequences', 'getAllContacts', 'getAllAnnotation'],
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
                resource: ['message', 'session', 'panel', 'sequence', 'contact'],
                operation: ['getAllMessages', 'getAllSessions', 'getAllPanels', 'getAllCards', 'getAllSequences', 'getAllContacts', 'getAllAnnotation'],
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
                resource: ['message', 'session', 'panel', 'sequence', 'contact'],
                operation: ['getAllMessages', 'getAllSessions', 'getAllPanels', 'getAllCards', 'getAllSequences', 'getAllContacts', 'getAllAnnotation'],
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
                resource: ['message', 'session', 'panel', 'sequence', 'contact'],
                operation: ['getAllMessages', 'getAllSessions', 'getAllPanels', 'getAllCards', 'getAllSequences', 'getAllContacts', 'getAllAnnotation'],
            },
        },
    },
]


export const pageFields: INodeProperties[] = [

    //-------------------------------------------
    //              PARAMS PAGINATION
    //------------------------------------------

    {
        displayName: 'Auto Pagination',
        name: 'autoPagination',
        type: 'boolean',
        default: false,
        description: 'Whether automatic pagination, increasing the items on each page',
        displayOptions: {
            show: {
                resource: ['session', 'contact', 'message', 'panel', 'sequence'],
                operation: ['getAllSessions', 'getAllContacts', 'getAllMessages', 'getAllAnnotation', 'getAllCards', 'getAllPanels', 'getAllSequences'],
            },
        },
    },
    {
        displayName: 'Max Pages',
        name: 'maxPage',
        type: 'number',
        typeOptions: {
            alwaysOpenEditWindow: true,
            minValue: 1,
            maxValue: 100,
        },
        default: 10,
        placeholder: 'Determine max pages',
        displayOptions: {
            show: {
                resource: ['session', 'contact', 'message', 'panel', 'sequence'],
                operation: ['getAllSessions', 'getAllContacts', 'getAllMessages', 'getAllAnnotation', 'getAllCards', 'getAllPanels', 'getAllSequences'],
                autoPagination: [true],
            },
        },
    },

    {
        displayName: 'Page Number',
        name: 'pageNumber',
        type: 'number',
        default: 1,
        description: 'The page number to retrieve',
        typeOptions: {
            alwaysOpenEditWindow: true,
        },
        displayOptions: {
            show: {
                resource: ['contact', 'message', 'session', 'panel', 'sequence'],
                operation: ['getAllContacts', 'getAllMessages', , 'getAllAnnotation', 'getAllPanels', 'getAllCards', 'getAllSequences', 'getAllSessions'],
                autoPagination: [false],
            },
        },
    },

    {
        displayName: 'Page Size',
        name: 'pageSize',
        type: 'number',
        default: 15,
        description: 'The number of items per page',
        displayOptions: {
            show: {
                resource: ['contact', 'message', 'session', 'panel', 'sequence'],
                operation: ['getAllContacts', 'getAllMessages', , 'getAllAnnotation', 'getAllPanels', 'getAllCards', 'getAllSequences', 'getAllSessions'],
                autoPagination: [false],
            },
        },
        typeOptions: {
            minValue: 1,
            maxValue: 100,
            alwaysOpenEditWindow: true,
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
                resource: ['contact', 'message', 'session', 'panel', 'sequence'],
                operation: ['getAllContacts', 'getAllMessages', 'getAllSessions', 'getAllAnnotation', 'getAllPanels', 'getAllCards', 'getAllSequences'],
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
                resource: ['contact', 'message', 'session', 'panel', 'sequence'],
                operation: ['getAllContacts', 'getAllMessages', 'getAllSessions', 'getAllAnnotation', 'getAllPanels', 'getAllCards', 'getAllSequences'],
            },
        },
    },
]