import type { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
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
            }],
        default: 'getAllContacts',
        noDataExpression: true
    }
]

export const contactFields: INodeProperties[] = [

    //----------------------------------------
    //           contact: CREATE
    //----------------------------------------

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
                        default: 'null',
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

    //----------------------------------------
    //              contact: GET
    //----------------------------------------

    {
        displayName: 'Contact ID',
        name: 'contactId',
        type: 'string',
        default: '',
        placeholder: 'Enter contact ID',
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['getContactById'],
            },
        },
    },

    {
        displayName: 'Include Details',
        name: 'includeDetailsContacts',
        type: 'multiOptions',
        default: [],
        placeholder: 'Choose include details',
        options: [
            {
                name: 'Tags',
                value: 'Tags',
            },
            {
                name: 'CustomFields',
                value: 'CustomFields',
            }
        ],
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['getAllContacts', 'getContactById', 'getContactByPhone'],
            },
        },
    },

    {
        displayName: 'Status',
        name: 'statusContact',
        type: 'options',
        default: 'UNDEFINED',
        placeholder: 'Choose status contact',
        description: 'Status of contacts to be listed. If not informed, the default value is ACTIVE.',
        options: [
            {
                name: 'Active',
                value: 'ACTIVE'
            },
            {
                name: 'Archived',
                value: 'ARCHIVED'
            },
            {
                name: 'Blocked',
                value: 'BLOCKED'
            },
            {
                name: 'Undefined',
                value: 'UNDEFINED'
            }
        ],
        displayOptions: {
            show: {
                resource: ['contact'],
                operation: ['getAllContacts'],
            },
        },
    }

]