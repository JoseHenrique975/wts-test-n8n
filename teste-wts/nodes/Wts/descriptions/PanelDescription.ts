import { INodeProperties } from "n8n-workflow";
//import { notSend } from "../constants.types";

export const panelOperations: INodeProperties[] = [
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
                name: 'Create Annotation File',
                value: 'createAnnotationFile',
                action: 'Create annotation file',
                default: 'panel'
            },
            {
                name: 'Create Annotation Text',
                value: 'createAnnotationText',
                action: 'Create annotation text',
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
                name: 'Delete Annotation Card',
                value: 'deleteAnnotationCard',
                action: 'Delete annotation card',
                default: 'panel'
            },
            {
                name: 'Duplicate Card',
                value: 'duplicateCard',
                action: 'Duplicate card',
                default: 'panel'
            },
            {
                name: 'Gel All Annotation',
                value: 'getAllAnnotation',
                description: 'Get all notes from a card',
                action: 'List notes',
                default: 'panel'
            },
            {
                name: 'Gel All Cards',
                value: 'getAllCards',
                description: 'Get all cards from a panel',
                action: 'List cards',
                default: 'panel'
            },
            {
                name: 'Get All Panels',
                value: 'getAllPanels',
                action: 'List panels',
                default: 'panel'
            },
            {
                name: 'Get Card By ID',
                value: 'getCardById',
                action: 'Get card by id',
                default: 'panel'
            },
            {
                name: 'Get Panel By ID',
                value: 'getPanelById',
                action: 'Get panel by id ',
                default: 'panel'
            },

            {
                name: 'Update Card',
                value: 'updateCard',
                action: 'Update card',
                default: 'panel'
            }
        ],
        default: 'getAllAnnotation',
        noDataExpression: true
    }
]

export const panelFields: INodeProperties[] = [



    {
        displayName: 'Card ID',
        name: 'cardId',
        type: 'string',
        default: '',
        placeholder: 'Enter card ID',

        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['getAllAnnotation', 'createAnnotationText', 'createAnnotationFile', 'getCardById', 'duplicateCard', 'deleteAnnotationCard'],
            },
        },
    },

    //-------------------------------
    //          CREATE
    //-------------------------------
    {
        displayName: 'Panel Name or ID',
        name: 'panels',
        type: 'options',
        default: 'NOT_SEND',
        placeholder: 'Choose Panel',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
        options: [
            {name:'Undefined', value: 'NOT_SEND'}
        ],
        typeOptions: {
            loadOptionsMethod: 'getPanels',
        },
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['createCard', 'getAllCards'],
            },
        },
    },
    {
        displayName: 'Step Name or ID',
        name: 'stepPanels',
        type: 'options',
        default: 'NOT_SEND',
        placeholder: 'Choose Step',
        description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
        typeOptions: {
            loadOptionsDependsOn: ['panels'],
            loadOptionsMethod: 'getStepsPanelId'
        },
        options: [
            {name:'Undefined', value: 'NOT_SEND'}
        ],
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['createCard', 'getAllCards'],
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
        placeholder: 'Enter title panel',
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['createCard', 'getAllPanels'],
            },
        },
    },
    {
        displayName: 'Text Filter',
        name: 'textFilter',
        type: 'string',
        default: '',
        placeholder: 'Enter text filter',
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['getAllCards'],
            },
        },
    },
    {
        displayName: 'Include Archived',
        name: 'includeArchived',
        type: 'boolean',
        default: false,
        description: 'Whether to include archived items',
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['getAllCards'],
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

    //------------------------------
    // CREATE ANNOTATION FILE
    //------------------------------
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
        displayName: 'Panel ID',
        name: 'panelId',
        type: 'string',
        default: '',
        placeholder: 'Enter panel ID',
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['getPanelById'],
            },
        },
    },

    {
        displayName: 'Include Details',
        name: 'includeDetailsGetCards',
        type: 'multiOptions',
        default: [],
        placeholder: 'Choose include details',
        options: [
            {
                name: 'Contacts',
                value: 'Contacts',
            },
            {
                name: 'CustomFields',
                value: 'CustomFields'
            },
            {
                name: 'PanelTitle',
                value: 'PanelTitle',
            },
            {
                name: 'ResponsibleUser',
                value: 'ResponsibleUser',
            },
            {
                name: 'StepPhase',
                value: 'StepPhase',
            },
            {
                name: 'StepTitle',
                value: 'StepTitle',
            }
        ],
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['getAllCards', 'getCardById'],
            },
        },
    },

    {
        displayName: 'Include Details',
        name: 'includeDetailsPanel',
        type: 'multiOptions',
        default: [],
        placeholder: 'Choose include details',

        options: [
            {
                name: 'Cards',
                value: 'Cards',
            },
            {
                name: 'Steps',
                value: 'Steps',
            },
            {
                name: 'StepsCardCount',
                value: 'StepsCardCount',
            },
            {
                name: 'StepsFields',
                value: 'StepsFields',
            },
            {
                name: 'Tags',
                value: 'Tags',
            },
        ],
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['getPanelById'],
            },
        },
    },

    {
        displayName: 'Step ID',
        name: 'stepId',
        type: 'string',
        default: '',
        placeholder: 'Enter step ID',

        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['duplicateCard'],
            },
        },
    },

    {
        displayName: 'Archive Original Card',
        name: 'archiveOriginalCard',
        type: 'boolean',
        default: false,
        description: 'Whether to archived item',
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['duplicateCard'],
            },
        },
    },

    {
        displayName: 'Fields',
        name: 'fieldsCard',
        type: 'multiOptions',
        default: [],
        placeholder: 'Choose include fields',
        options: [
            {
                name: 'All',
                value: 'All',
            },
            {
                name: 'Amount',
                value: 'Amount',
            },
            {
                name: 'Contacts',
                value: 'Contacts',
            },
            {
                name: 'CustomFields',
                value: 'CustomFields',
            },
            {
                name: 'DueDate',
                value: 'DueDate',
            },
            {
                name: 'MonetaryAmount',
                value: 'MonetaryAmount',
            },
            {
                name: 'Notes',
                value: 'Notes',
            },
            {
                name: 'ResponsibleUser',
                value: 'ResponsibleUser',
            },
            {
                name: 'Tags',
                value: 'Tags',
            },
            {
                name: 'Undefined',
                value: 'Undefined',
            },
        ],
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['duplicateCard'],
            },
        },
    },

    {
        displayName: 'Note ID',
        name: 'noteId',
        type: 'string',
        default: '',
        placeholder: 'Enter note ID',

        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['deleteAnnotationCard'],
            },
        },
    },
]

export const updateCardFields: INodeProperties[] = [

    {
        displayName: 'Fields',
        name: 'fieldsUpdateCard',
        type: 'multiOptions',
        default: [],
        placeholder: 'Choose include fields',
        options: [
            {
                name: 'Archived',
                value: 'Archived',
            },
            {
                name: 'ContactIds',
                value: 'ContactIds',
            },
            {
                name: 'CustomFields',
                value: 'CustomFields',
            },

            {
                name: 'Description',
                value: 'Description',
            },
            {
                name: 'DueDate',
                value: 'DueDate',
            },
            {
                name: 'MonetaryAmount',
                value: 'MonetaryAmount',
            },
            {
                name: 'Position',
                value: 'Position',
            },
            {
                name: 'ResponsibleUserId',
                value: 'ResponsibleUserId',
            },
            {
                name: 'SessionId',
                value: 'SessionId',
            },
            {
                name: 'StepId',
                value: 'StepId',
            },
            {
                name: 'TagIds',
                value: 'TagIds',
            },
            {
                name: 'Title',
                value: 'Title',
            }
        ],
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['updateCard'],
            },
        },
    },

    {
        displayName: 'Card ID',
        name: 'cardIdUpdateCard',
        type: 'string',
        default: '',
        placeholder: 'Enter card ID',

        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['updateCard']
            },
        },
    },

    {
        displayName: 'Include Archived',
        name: 'includeArchivedUpdateCard',
        type: 'boolean',
        default: false,
        description: 'Whether to include archived items',
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['updateCard'],
                fieldsUpdateCard: ['Archived']
            },
        },
    },

    {
        displayName: 'Contacts ID',
        name: 'contactsIdUpdateCard',
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
                operation: ['updateCard'],
                fieldsUpdateCard: ['ContactIds']
            }
        }
    },

    {
        displayName: 'Custom Fields',
        name: 'customFieldsCardUpdateCard',
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
                            loadOptionsMethod: 'getCustomFieldsByIdCard',
                            loadOptionsDependsOn: ['cardIdUpdateCard']
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
                operation: ['updateCard'],
                fieldsUpdateCard: ['CustomFields']
            },
        },
    },

    {
        displayName: 'Description',
        name: 'descriptionUpdateCard',
        type: 'string',
        default: '',
        typeOptions: {
            rows: 4,
        },
        description: 'Make your description',
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['updateCard'],
                fieldsUpdateCard: ['Description']
            },
        },
    },

    {
        displayName: 'Due Date',
        name: 'dueDateUpdateCard',
        type: 'dateTime',
        default: '',
        description: 'Enter YYYY-MM-DD hh:mm and the time according to your time zone ⚠️',
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['updateCard'],
                fieldsUpdateCard: ['DueDate']
            },
        },
    },

    {
        displayName: 'Monetary Amount',
        name: 'monetaryAmountUpdateCard',
        type: 'number',
        default: '',
        placeholder: 'Enter amount',

        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['updateCard'],
                fieldsUpdateCard: ['MonetaryAmount']
            },
        },
    },

    {
        displayName: 'Position',
        name: 'positionUpdateCard',
        type: 'number',
        default: '',
        placeholder: 'Enter position',
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['updateCard'],
                fieldsUpdateCard: ['Position']
            },
        },
    },

    {
        displayName: 'User Name or ID',
        name: 'userIdUpdateCard',
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
                resource: ['panel'],
                operation: ['updateCard'],
                fieldsUpdateCard: ['ResponsibleUserId']
            },
        },
    },

    {
        displayName: 'Step ID',
        name: 'stepIdUpdateCard',
        type: 'string',
        default: '',
        placeholder: 'Enter step ID',

        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['updateCard'],
                fieldsUpdateCard: ['StepId']
            },
        },
    },

    {
        displayName: 'Tag Names or IDs',
        name: 'updateCardTagIdUpdateCard',
        type: 'multiOptions',
        description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>',
        default: [],
        placeholder: 'Choose Tag',
        typeOptions: {
            loadOptionsDependsOn: ['cardIdUpdateCard'],
            loadOptionsMethod: 'getTagsByIdCard'
        },
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['updateCard'],
                fieldsUpdateCard: ['TagIds']
            },
        },
    },

    {
        displayName: 'Title',
        name: 'titleCardUpdateCard',
        type: 'string',
        default: '',
        placeholder: 'Enter title',

        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['updateCard'],
                fieldsUpdateCard: ['Title']
            },
        },
    },

    {
        displayName: 'Session ID',
        name: 'sessionIdUpdateCard',
        type: 'string',
        default: '',
        placeholder: 'Enter session ID',
        displayOptions: {
            show: {
                resource: ['panel'],
                operation: ['updateCard'],
                fieldsUpdateCard: ['SessionId']
            },
        },
    },



]