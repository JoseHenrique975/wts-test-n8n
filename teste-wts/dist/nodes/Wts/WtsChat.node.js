"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WtsChat = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const wts_core_service_1 = require("./wts-core.service");
const wts_chat_service_1 = require("./wts-chat.service");
const wts_crm_service_1 = require("./wts-crm.service");
const GenericDescription_1 = require("./descriptions/GenericDescription");
const ContactDescription_1 = require("./descriptions/ContactDescription");
const MessageDescription_1 = require("./descriptions/MessageDescription");
const PanelDescription_1 = require("./descriptions/PanelDescription");
const SessionDescription_1 = require("./descriptions/SessionDescription");
const SequenceDescription_1 = require("./descriptions/SequenceDescription");
const constants_types_1 = require("./constants.types");
const descriptions_1 = require("./descriptions");
const utils_1 = require("../utils");
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
                            name: 'Chatbot',
                            value: 'chatbot'
                        },
                        {
                            name: 'Contact',
                            value: 'contact',
                        },
                        {
                            name: 'Message',
                            value: 'message',
                        },
                        {
                            name: 'Panel',
                            value: 'panel'
                        },
                        {
                            name: 'Sequence',
                            value: 'sequence'
                        },
                        {
                            name: 'Session',
                            value: 'session',
                        },
                    ],
                    default: 'contact',
                    description: 'Resource to use',
                },
                ...SequenceDescription_1.sequenceOperations,
                ...ContactDescription_1.contactOperations,
                ...MessageDescription_1.messageOperations,
                ...PanelDescription_1.panelOperations,
                ...SessionDescription_1.sessionOperations,
                ...descriptions_1.chatbotOperations,
                ...SequenceDescription_1.sequenceFields,
                ...GenericDescription_1.commonFields,
                ...ContactDescription_1.contactFields,
                ...MessageDescription_1.messageFields,
                ...PanelDescription_1.updateCardFields,
                ...PanelDescription_1.panelFields,
                ...SessionDescription_1.sessionFields,
                ...SessionDescription_1.updateSessionFields,
                ...descriptions_1.chatbotFields,
                ...GenericDescription_1.dateFields,
                ...GenericDescription_1.pageFields,
                ...GenericDescription_1.metadataFields
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
                    var _a;
                    const departmentId = (_a = this.getCurrentNodeParameter('departmentId')) !== null && _a !== void 0 ? _a : this.getNodeParameter('departmentIdUpdatedSession');
                    return await wts_core_service_1.WtsCoreService.getUsersByDepartments(departmentId, this);
                },
                async getPanels() {
                    return await wts_crm_service_1.WtsCrmService.getPanels(this);
                },
                async getCustomFieldsPanel() {
                    const panelId = this.getNodeParameter('panels');
                    return await wts_crm_service_1.WtsCrmService.getCustomFieldsPanel(panelId, this);
                },
                async getStepsPanelId() {
                    const panelId = this.getNodeParameter('panels');
                    return await wts_crm_service_1.WtsCrmService.getStepsPanelId(panelId, this);
                },
                async getTagsPanel() {
                    const panelId = this.getNodeParameter('panels');
                    return await wts_crm_service_1.WtsCrmService.getTagsPanel(panelId, this);
                },
                async getTagsByIdCard() {
                    const cardId = this.getNodeParameter('cardIdUpdateCard', 0);
                    return await wts_crm_service_1.WtsCrmService.getTagsByIdCard(cardId, this);
                },
                async getCustomFieldsByIdCard() {
                    const idCard = this.getNodeParameter('cardIdUpdateCard', 0);
                    const customFields = await wts_crm_service_1.WtsCrmService.getCustomFieldsByIdCard(idCard, this);
                    return customFields.map((field) => {
                        return {
                            name: field.name,
                            value: field.name
                        };
                    });
                },
                async getTemplates() {
                    const channelId = this.getCurrentNodeParameter('channelId');
                    const result = await wts_chat_service_1.WtsChatService.getTemplates(channelId, this);
                    console.log("Get Templates");
                    console.log(result);
                    return result;
                },
                async getChannelsIds() {
                    return await wts_chat_service_1.WtsChatService.getChannelsIds(this);
                },
                async getBots() {
                    return await wts_chat_service_1.WtsChatService.getBots(this);
                },
                async getTemplatesSession() {
                    const sessionId = this.getNodeParameter('sessionId');
                    const template = await wts_chat_service_1.WtsChatService.getTemplatesSession(sessionId, this);
                    return template;
                },
                async getNamesParamsTemplates() {
                    const templates = this.getNodeParameter('templates', 0);
                    const temp = (0, n8n_workflow_1.jsonParse)(templates);
                    const params = temp === null || temp === void 0 ? void 0 : temp.params;
                    return params.map((param) => {
                        return {
                            name: param.name,
                            value: param.name
                        };
                    });
                },
                async getNameParamsTemplatesSession() {
                    const template = this.getNodeParameter('templatesBySession', 0);
                    const temp = (0, n8n_workflow_1.jsonParse)(template);
                    const params = temp.params;
                    return params.map((param) => {
                        return {
                            name: param.name,
                            value: param.name
                        };
                    });
                }
            },
        };
    }
    async execute() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const results = [[]];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        const credentials = await this.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        if (resource === 'contact') {
            if (operation === 'getContactById') {
                const idContact = this.getNodeParameter('contactId', 0);
                const includeDetails = this.getNodeParameter('includeDetailsContacts', 0);
                try {
                    var data = await wts_core_service_1.WtsCoreService.getContactById(idContact, includeDetails, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'getContactByPhone') {
                const phoneNumber = this.getNodeParameter('phonenumber', 0);
                const includeDetails = this.getNodeParameter('includeDetailsContacts', 0);
                try {
                    const data = await wts_core_service_1.WtsCoreService.getContactByPhone(phoneNumber, includeDetails, token);
                    const items = [{ json: data, },];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'getAllContacts') {
                const autoPagination = this.getNodeParameter('autoPagination', 0);
                const maxPage = autoPagination ? this.getNodeParameter('maxPage', 0) : null;
                const includeDetails = this.getNodeParameter('includeDetailsContacts', 0);
                let status = this.getNodeParameter('statusContact', 0);
                const pageNumber = !autoPagination ? this.getNodeParameter('pageNumber', 0) : null;
                const pageSize = !autoPagination ? this.getNodeParameter('pageSize', 0) : null;
                const orderBy = this.getNodeParameter('orderBy', 0);
                const orderDirection = this.getNodeParameter('orderDirection', 0);
                const createdAtAfter = this.getNodeParameter('createdAtAfter', 0);
                const createdAtBefore = this.getNodeParameter('createdAtBefore', 0);
                const updatedAtAfter = this.getNodeParameter('updatedAtAfter', 0);
                const updatedAtBefore = this.getNodeParameter('updatedAtBefore', 0);
                const params = {
                    autoPagination,
                    ...(autoPagination && maxPage && { maxPage: maxPage }),
                    ...(!autoPagination && pageNumber && { pageNumber: pageNumber }),
                    includeDetails,
                    ...(status != "UNDEFINED" && { status: status }),
                    pageSize,
                    orderBy, orderDirection,
                    createdAtAfter, createdAtBefore,
                    updatedAtAfter, updatedAtBefore
                };
                try {
                    const data = await wts_core_service_1.WtsCoreService.getAllContacts(params, token);
                    const items = [{ json: data, }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'createContact') {
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
                if (email) {
                    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                    const matchEmail = email.match(regexEmail);
                    if (!matchEmail) {
                        throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                            message: 'Invalid email!',
                            description: 'Invalid email!',
                        });
                    }
                }
                console.log("Custom Fields");
                console.log(customFields);
                const customFieldsObject = (_a = customFields === null || customFields === void 0 ? void 0 : customFields.customFields) === null || _a === void 0 ? void 0 : _a.reduce((acc, field) => {
                    if (field.key != 'null' && field.key != null) {
                        acc[field.key] = field.value;
                    }
                    return acc;
                }, {});
                console.log("CustomFieldsObject");
                console.log(customFieldsObject);
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
                console.log("Body antes da requisição");
                console.log(body);
                try {
                    const data = await wts_core_service_1.WtsCoreService.createContact(body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
        }
        else if (resource === 'message') {
            if (operation === 'getMessageById') {
                const idMessage = this.getNodeParameter('messageId', 0);
                try {
                    const data = await wts_chat_service_1.WtsChatService.getMessageById(idMessage, token);
                    const items = [{ json: data, },];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'getMessageStatus') {
                const idMessage = this.getNodeParameter('messageId', 0);
                try {
                    const data = await wts_chat_service_1.WtsChatService.getMessageStatus(idMessage, token);
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
            else if (operation === 'getAllMessages') {
                const sessionId = this.getNodeParameter('sessionId', 0);
                const genericParams = (0, utils_1.getParamsGenerics)(this);
                if (!sessionId) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'SessionID is empty, please fill it in',
                        description: 'SessionID is empty, please fill it in',
                    });
                }
                const params = {
                    ...genericParams,
                    sessionId: sessionId,
                };
                try {
                    const data = await wts_chat_service_1.WtsChatService.getAllMessages(params, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'sendText') {
                const synchronous = this.getNodeParameter('synchronousMessage', 0);
                const from = this.getNodeParameter('channelId', 0);
                const to = this.getNodeParameter('numberToSend', 0);
                const text = this.getNodeParameter('textMessage', 0);
                const botId = this.getNodeParameter('botId', 0);
                const departmentId = this.getNodeParameter('departmentId', 0);
                const userId = this.getNodeParameter('userIdByDepartment', 0);
                const enableBot = this.getNodeParameter('enableBot', 0);
                const hiddenSession = this.getNodeParameter('hiddenSession', 0);
                const forceStartSession = this.getNodeParameter('forceStartSession', 0);
                console.log("Department");
                console.log(departmentId);
                console.log("Bots");
                console.log(botId);
                if (!from || from == 'null') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Choose channel',
                        description: 'Fill in the From field',
                    });
                }
                if (!to) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Set an Instagram number or username for sending',
                        description: 'Fill in the To field'
                    });
                }
                if (!text || text.trim() == "") {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Write a text to send',
                        description: 'Fill in the Text field',
                    });
                }
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
                    ...(departmentId != 'null' && { department: { id: departmentId } }),
                    ...(botId != 'null' && { botId: botId }),
                    ...(userId != 'null' && { user: { id: userId } }),
                };
                console.log(body);
                try {
                    const data = await wts_chat_service_1.WtsChatService.sendMessageText(body, token, synchronous);
                    const items = [];
                    items.push({ json: data });
                    results[0] = items;
                    return results;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'sendFile') {
                const file = this.getNodeParameter('fileToSend', 0);
                const fileUrl = (_c = this.getNodeParameter('urlFile', 0)) !== null && _c !== void 0 ? _c : null;
                const synchronous = this.getNodeParameter('synchronousMessage', 0);
                const from = this.getNodeParameter('channelId', 0);
                const to = this.getNodeParameter('numberToSend', 0);
                const botId = this.getNodeParameter('botId', 0);
                const departmentId = this.getNodeParameter('departmentId', 0);
                const userId = this.getNodeParameter('userIdByDepartment', 0);
                const enableBot = this.getNodeParameter('enableBot', 0);
                const hiddenSession = this.getNodeParameter('hiddenSession', 0);
                const forceStartSession = this.getNodeParameter('forceStartSession', 0);
                if (file && !fileUrl) {
                    console.log("File");
                    console.log(file);
                }
                if (!file && !fileUrl) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in any of the fields, whether Url or File!',
                        description: 'Choose to send file or the file url!',
                    });
                }
                if (!from || from == 'null') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Choose channel',
                        description: 'Fill in the From field',
                    });
                }
                let body = {
                    from: from,
                    to: to,
                    body: {
                        fileUrl: fileUrl || null,
                        fileId: null
                    },
                    options: {
                        enableBot: enableBot,
                        hiddenSession: hiddenSession,
                        forceStartSession: forceStartSession
                    },
                    ...(departmentId != 'null' && { department: { id: departmentId } }),
                    ...(botId != 'null' && { botId: botId }),
                    ...(userId != 'null' && { user: { id: userId } }),
                };
                console.log("Body antes da requisição");
                console.log(body);
                const t = (0, n8n_workflow_1.jsonParse)(file);
                if (file) {
                    const responseSaveFile = await wts_chat_service_1.WtsChatService.saveFile(t, token);
                    body.body.fileId = responseSaveFile.data.id;
                    body.body.fileUrl = null;
                }
                try {
                    const data = await wts_chat_service_1.WtsChatService.sendMessageFile(body, token, synchronous);
                    const items = [];
                    items.push({ json: data });
                    results[0] = items;
                    return results;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'sendTemplate') {
                const synchronous = this.getNodeParameter('synchronousMessage', 0);
                const from = this.getNodeParameter('channelId', 0);
                const template = this.getNodeParameter('templates', 0);
                if (template == null || template == 'null') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Choose template',
                        description: 'Fill in the Template field',
                    });
                }
                const templateObj = (0, n8n_workflow_1.jsonParse)(template);
                let fileUrl = templateObj.fileType != "UNDEFINED" ? this.getNodeParameter('urlFile', 0) : null;
                const file = templateObj.fileType != "UNDEFINED" ? this.getNodeParameter('fileToSend', 0) : null;
                const templateId = templateObj.id;
                const paramsTemplates = this.getNodeParameter('paramsTemplates', 0);
                const paramsArray = paramsTemplates.paramsTemplatesValues;
                const to = this.getNodeParameter('numberToSend', 0);
                const departmentId = this.getNodeParameter('departmentId', 0);
                const userId = this.getNodeParameter('userIdByDepartment', 0);
                const botId = this.getNodeParameter('botId', 0);
                const enableBot = this.getNodeParameter('enableBot', 0);
                const hiddenSession = this.getNodeParameter('hiddenSession', 0);
                const forceStartSession = this.getNodeParameter('forceStartSession', 0);
                const paramsName = paramsArray === null || paramsArray === void 0 ? void 0 : paramsArray.map(p => p.name);
                const paramSet = new Set(paramsName);
                const newParams = [];
                paramSet.forEach(name => {
                    var _a, _b;
                    return newParams.push({
                        name,
                        value: (_b = (_a = paramsArray.find(param => param.name == name)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : ''
                    });
                });
                const transformToObject = (params) => {
                    const result = {};
                    params.forEach(param => {
                        result[param.name] = param.value;
                    });
                    return result;
                };
                if (!from || from == 'null') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Choose channel',
                        description: 'Fill in the From field',
                    });
                }
                let fileId;
                if (file) {
                    const responseSaveFile = await wts_chat_service_1.WtsChatService.saveFile(file, token);
                    fileId = responseSaveFile.data.id;
                    fileUrl = null;
                }
                const body = {
                    from: from,
                    to: to,
                    body: {
                        templateId: templateId,
                        ...(newParams && { parameters: transformToObject(newParams) }),
                        ...(fileUrl && { fileUrl: fileUrl }),
                        ...(fileId && { fileId: fileId })
                    },
                    options: {
                        enableBot: enableBot,
                        hiddenSession: hiddenSession,
                        forceStartSession: forceStartSession
                    },
                    ...(botId != 'null' && { botId: botId }),
                    ...(userId != 'null' && { user: { id: userId } }),
                    ...(departmentId != 'null' && { department: { id: departmentId } })
                };
                try {
                    const data = await wts_chat_service_1.WtsChatService.sendMessageTemplate(body, token, synchronous);
                    const items = [];
                    items.push({ json: data });
                    results[0] = items;
                    return results;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
        }
        else if (resource === 'session') {
            if (operation === 'getAllSessions') {
                const genericParams = (0, utils_1.getParamsGenerics)(this);
                const activeAtAfter = this.getNodeParameter('activeAtAfter', 0);
                const activeAtBefore = this.getNodeParameter('activeAtBefore', 0);
                const endAtAfter = this.getNodeParameter('endAtAfter', 0);
                const endAtBefore = this.getNodeParameter('endAtBefore', 0);
                const lastInteractionAtAfter = this.getNodeParameter('lastInteractionAtAfter', 0);
                const lastInteractionAtBefore = this.getNodeParameter('lastInteractionAtBefore', 0);
                const statusSession = this.getNodeParameter('statusSession', 0);
                const departmentId = this.getNodeParameter('departmentId', 0);
                const userId = this.getNodeParameter('userId', 0);
                const tagIds = this.getNodeParameter('tagIds', 0);
                const channelsIds = this.getNodeParameter('channelsIds', 0);
                const contactId = this.getNodeParameter('contactId', 0);
                const includeDetails = this.getNodeParameter('includeDetails', 0);
                let urlSession = `${constants_types_1.Constants.baseUrl}/chat/v1/session`;
                const params = new URLSearchParams({});
                channelsIds.forEach(id => params.append('ChannelsId', id));
                statusSession.forEach(status => params.append('Status', status));
                includeDetails.forEach(details => params.append('IncludeDetails', details));
                tagIds.forEach(tagId => params.append('TagsId', tagId));
                urlSession += `?${params.toString()}`;
                const paramsRequest = {
                    status: statusSession,
                    departmentId: departmentId,
                    ...(userId != 'null' && { userId: userId }),
                    ...(departmentId != 'null' && { departmentId: departmentId }),
                    contactId: contactId,
                    includeDetails: includeDetails,
                    ...genericParams,
                    activeAtAfter: activeAtAfter,
                    activeAtBefore: activeAtBefore,
                    endAtAfter: endAtAfter,
                    endAtBefore: endAtBefore,
                    lastInteractionAtAfter: lastInteractionAtAfter,
                    lastInteractionAtBefore: lastInteractionAtBefore
                };
                console.log("ParamsRequest");
                console.log(paramsRequest);
                try {
                    const data = await wts_chat_service_1.WtsChatService.getAllSessions(paramsRequest, token, urlSession);
                    const items = [{ json: data, }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'updateTransfer') {
                const sessionId = this.getNodeParameter('sessionId', 0);
                const departmentId = this.getNodeParameter('departmentId', 0);
                const userId = departmentId != 'null' ? this.getNodeParameter('userIdByDepartment', 0) : null;
                if (!sessionId) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in the field session',
                        description: 'Fill in the "sessionId" field',
                    });
                }
                if (departmentId == 'null' || userId == 'null') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'The transfer destination user or department must be defined',
                        description: 'The transfer destination user or department must be defined',
                    });
                }
                let type = departmentId && userId ? 'USER' : 'DEPARTMENT';
                const body = {
                    type: type,
                    ...(departmentId != 'null' && { newDepartmentId: departmentId }),
                    ...(userId != 'null' && { newUserId: userId })
                };
                try {
                    const data = await wts_chat_service_1.WtsChatService.updateTransfer(sessionId, body, token);
                    const items = [];
                    items.push({ json: data });
                    results[0] = items;
                    return results;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'updateStatusSession') {
                const sessionId = this.getNodeParameter('sessionId', 0);
                const status = this.getNodeParameter('statusSessionOption', 0);
                if (!sessionId || !status) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in all fields',
                        description: 'Both sessionId and status are required to update the session status.',
                    });
                }
                if (!status || status === 'UNDEFINED') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Add a valid status!',
                        description: 'Add a valid status!',
                    });
                }
                const body = {
                    newStatus: status
                };
                try {
                    const data = await wts_chat_service_1.WtsChatService.updateStatusSession(sessionId, body, token);
                    const items = [];
                    items.push({ json: data });
                    results[0] = items;
                    return results;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'getSessionById') {
                const sessionId = this.getNodeParameter('sessionId', 0);
                const includeDetails = this.getNodeParameter('includeDetails', 0);
                if (!sessionId || sessionId.trim() === '') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'SessionID is empty!',
                        description: 'Fill in the SessionID field'
                    });
                }
                const body = {
                    sessionId,
                    includeDetails
                };
                try {
                    const data = await wts_chat_service_1.WtsChatService.getSessionById(body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'assignUser') {
                const sessionId = this.getNodeParameter('sessionId', 0);
                const userId = this.getNodeParameter('userId', 0);
                if (!sessionId || sessionId.trim() === '') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'SessionID is empty!',
                        description: 'Fill in the SessionID field'
                    });
                }
                if (!userId || userId == 'null') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'UserID is empty!',
                        description: 'Choose user'
                    });
                }
                const body = {
                    userId
                };
                console.log("Body");
                console.log(body);
                try {
                    const data = await wts_chat_service_1.WtsChatService.assignUserToSession(sessionId, body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'concludeSession') {
                const sessionId = this.getNodeParameter('sessionId', 0);
                const reactivateOnNewMessage = this.getNodeParameter('reactivateOnNewMessage', 0);
                if (!sessionId || sessionId.trim() === '') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'SessionID is empty!',
                        description: 'Fill in the SessionID field'
                    });
                }
                const body = {
                    reactivateOnNewMessage
                };
                try {
                    const data = await wts_chat_service_1.WtsChatService.concludeSession(sessionId, body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'updateSession') {
                const fields = this.getNodeParameter('fieldsUpdate', 0);
                const sessionId = this.getNodeParameter('sessionId', 0);
                const companyId = this.getNodeParameter('companyId', 0);
                const statusSessionUpdate = fields.includes('Status') ? this.getNodeParameter('statusUpdateSessionOption', 0) : null;
                const endAt = fields.includes('EndAt') ? this.getNodeParameter('endAt', 0) : null;
                const number = fields.includes('Number') ? this.getNodeParameter('number', 0) : null;
                const departmentId = (fields.includes('DepartmentId') || fields.includes('UserId')) ? this.getNodeParameter('departmentIdUpdatedSession', 0) : null;
                const userId = fields.includes('UserId') ? this.getNodeParameter('userIdByDepartmentUpdateSession', 0) : null;
                const metadata = fields.includes('Metadata') ? this.getNodeParameter('metadataUpdateSession', 0) : null;
                const metadataObject = (_d = metadata === null || metadata === void 0 ? void 0 : metadata.metadata) === null || _d === void 0 ? void 0 : _d.reduce((acc, metadata) => {
                    acc[metadata.key] = metadata.value;
                    return acc;
                }, {});
                if (!sessionId || sessionId.trim() === '') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'SessionID is empty!',
                        description: 'Fill in the SessionID field'
                    });
                }
                console.log("DepartmentId");
                console.log(departmentId);
                const body = {
                    companyId,
                    ...(statusSessionUpdate != 'UNDEFINED' && { statusSessionUpdate }), endAt,
                    number, ...(departmentId != 'null' && { departmentId }), userId, metadataObject, fields
                };
                console.log("Body");
                console.log(body);
                try {
                    const data = await wts_chat_service_1.WtsChatService.updateSession(sessionId, body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'sendMessageTextSession') {
                const sessionId = this.getNodeParameter('sessionId', 0);
                const text = this.getNodeParameter('textMessage', 0);
                if (!sessionId || sessionId.trim() === '') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'SessionID is empty!',
                        description: 'Fill in the SessionID field'
                    });
                }
                try {
                    const data = await wts_chat_service_1.WtsChatService.sendMessageTextSession(sessionId, text, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'sendMessageFileSession') {
                const sessionId = this.getNodeParameter('sessionId', 0);
                const fileUrl = (_e = this.getNodeParameter('urlFile', 0)) !== null && _e !== void 0 ? _e : null;
                const file = (_f = this.getNodeParameter('fileToSend', 0)) !== null && _f !== void 0 ? _f : null;
                if (!sessionId || sessionId.trim() === '') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'SessionID is empty!',
                        description: 'Fill in the SessionID field'
                    });
                }
                if (!fileUrl && !file) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in any of the fields',
                        description: 'Fill in the file or url'
                    });
                }
                const body = {
                    fileUrl: fileUrl || null,
                    fileId: null
                };
                if (file) {
                    const responseSaveFile = await wts_chat_service_1.WtsChatService.saveFile(file, token);
                    body.fileId = responseSaveFile.data.id;
                    body.fileUrl = null;
                }
                try {
                    const data = await wts_chat_service_1.WtsChatService.sendMessageFileUrlSession(sessionId, body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'sendMessageTemplateSession') {
                const sessionId = this.getNodeParameter('sessionId', 0);
                const template = this.getNodeParameter('templatesBySession', 0);
                const params = (template && template != 'null') ? this.getNodeParameter('paramsTemplatesSession', 0) : null;
                console.log("Teste de envio de template");
                if (!sessionId || sessionId.trim() == '') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'SessionID is empty!',
                        description: 'Fill in the SessionID field'
                    });
                }
                if (template == 'null' || !template) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Choose a valid template',
                        description: 'Choose a valid template'
                    });
                }
                const obj = (0, n8n_workflow_1.jsonParse)(template);
                console.log(obj.fileType);
                let fileUrl = obj.fileType != "UNDEFINED" ? this.getNodeParameter('urlFile', 0) : null;
                const file = obj.fileType != "UNDEFINED" ? this.getNodeParameter('fileToSend', 0) : null;
                const paramsArray = params === null || params === void 0 ? void 0 : params.paramsTemplatesValues;
                const paramsName = paramsArray === null || paramsArray === void 0 ? void 0 : paramsArray.map(p => p.name);
                const paramSet = new Set(paramsName);
                const newParams = [];
                paramSet.forEach(name => {
                    var _a, _b;
                    return newParams.push({
                        name,
                        value: (_b = (_a = paramsArray === null || paramsArray === void 0 ? void 0 : paramsArray.find(param => param.name == name)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : ''
                    });
                });
                const transformToObject = (params) => {
                    const result = {};
                    params.forEach(param => {
                        result[param.name] = param.value;
                    });
                    return result;
                };
                const body = {
                    templateId: obj.id,
                    ...(newParams && { parameters: transformToObject(newParams) }),
                    fileId: null,
                    fileUrl: fileUrl
                };
                console.log("Body");
                console.log(body);
                if (file) {
                    const responseSaveFile = await wts_chat_service_1.WtsChatService.saveFile(file, token);
                    body.fileId = responseSaveFile.data.id;
                    body.fileUrl = null;
                }
                try {
                    const data = await wts_chat_service_1.WtsChatService.sendMessageTemplateSession(sessionId, body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
        }
        else if (resource === 'panel') {
            if (operation === 'getAllAnnotation') {
                const cardId = this.getNodeParameter('cardId', 0);
                if (!cardId) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'CardID is empty, please fill it in',
                        description: 'CardID is empty, please fill it in',
                    });
                }
                const genericParams = (0, utils_1.getParamsGenerics)(this);
                const params = {
                    ...genericParams
                };
                try {
                    const data = await wts_crm_service_1.WtsCrmService.getAllAnnotation(cardId, token, params);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'createCard') {
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
                const customFieldsObject = (_g = customFields === null || customFields === void 0 ? void 0 : customFields.customFields) === null || _g === void 0 ? void 0 : _g.reduce((acc, field) => {
                    acc[field.key] = field.value;
                    return acc;
                }, {});
                const metadataObject = (_h = metadata === null || metadata === void 0 ? void 0 : metadata.metadata) === null || _h === void 0 ? void 0 : _h.reduce((acc, metadata) => {
                    acc[metadata.key] = metadata.value;
                    return acc;
                }, {});
                if (!stepId || stepId == 'null') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Choose a panel and its step',
                        description: 'Choose a panel and its step',
                    });
                }
                if (!title || title.trim() == '') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Title is empty, please fill it in',
                        description: 'Title is empty, please fill it in',
                    });
                }
                const body = {
                    stepId: stepId,
                    title: title,
                    tagIds: tagsPanelIds,
                    ...(monetaryAmount && { monetaryAmount: monetaryAmount }),
                    ...(userId != 'null' && { responsibleUserId: userId }),
                    ...(contactId && { contactIds: [contactId] }),
                    ...(position && { position: position }),
                    ...(description && { description: description }),
                    ...(metadataObject && { metadata: metadataObject }),
                    ...(customFieldsObject && { customFields: customFieldsObject }),
                };
                console.log("Antes da requisição");
                console.log(body);
                try {
                    const data = await wts_crm_service_1.WtsCrmService.createCard(body, token);
                    const items = [];
                    items.push({ json: data });
                    results[0] = items;
                    return results;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'createAnnotationText') {
                const cardId = this.getNodeParameter('cardId', 0);
                const annotation = this.getNodeParameter('textMessage', 0);
                if (!cardId) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in the CardId field',
                        description: 'CardId cannot be empty',
                    });
                }
                if (!annotation) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in the Text field',
                        description: 'Text cannot be empty',
                    });
                }
                const body = {
                    text: annotation
                };
                try {
                    const data = await wts_crm_service_1.WtsCrmService.createAnnotationText(cardId, body, token);
                    const items = [];
                    items.push({ json: data });
                    results[0] = items;
                    return results;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'createAnnotationFile') {
                const cardId = this.getNodeParameter('cardId', 0);
                const fileUrls = this.getNodeParameter('fileUrls', 0);
                const arrayUrls = fileUrls.fileUrl;
                if (!cardId) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in the CardId field',
                        description: 'CardId cannot be empty',
                    });
                }
                const body = {
                    fileUrls: arrayUrls
                };
                try {
                    const data = await wts_crm_service_1.WtsCrmService.createAnnotationFile(cardId, body, token);
                    const items = [];
                    items.push({ json: data });
                    results[0] = items;
                    return results;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'getAllPanels') {
                const titlePanel = this.getNodeParameter("title", 0);
                const genericParams = (0, utils_1.getParamsGenerics)(this);
                const params = {
                    title: titlePanel,
                    ...genericParams
                };
                try {
                    const data = await wts_crm_service_1.WtsCrmService.getAllPanels(params, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'getPanelById') {
                const panelId = this.getNodeParameter('panelId', 0);
                const includeDetails = this.getNodeParameter('includeDetailsPanel', 0);
                if (!panelId) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in the panel ID field',
                        description: 'Fill in the field with the panel id'
                    });
                }
                try {
                    const data = await wts_crm_service_1.WtsCrmService.getPanelById(includeDetails, panelId, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'getAllCards') {
                const panelId = this.getNodeParameter('panels', 0);
                const stepId = this.getNodeParameter('stepPanels', 0);
                const contactId = this.getNodeParameter('contactId', 0);
                const responsibleUserId = this.getNodeParameter('userId', 0);
                const textFilter = this.getNodeParameter('textFilter', 0);
                const includeArchived = this.getNodeParameter('includeArchived', 0);
                const includeDetails = this.getNodeParameter('includeDetailsGetCards', 0);
                const genericParams = (0, utils_1.getParamsGenerics)(this);
                if (!panelId) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in the panel ID field',
                        description: 'Fill in the field with the panel id'
                    });
                }
                const params = {
                    panelId: panelId,
                    ...(stepId != 'null' && { stepId: stepId }),
                    ...(contactId && { contactId: contactId }),
                    ...(responsibleUserId != 'null' && { responsibleUserId: responsibleUserId }),
                    ...(textFilter && { textFilter: textFilter }),
                    ...(includeArchived && { includeArchived: includeArchived }),
                    ...(includeDetails && { includeDetails: includeDetails }),
                    ...genericParams
                };
                console.log("Params");
                console.log(params);
                try {
                    const data = await wts_crm_service_1.WtsCrmService.getAllCards(params, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'getCardById') {
                const cardId = this.getNodeParameter('cardId', 0);
                const includeDetails = this.getNodeParameter('includeDetailsGetCards', 0);
                if (!cardId) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'CardID is empty, please fill it in',
                        description: 'CardID is empty, please fill it in',
                    });
                }
                try {
                    const data = await wts_crm_service_1.WtsCrmService.getCardById(cardId, includeDetails, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'duplicateCard') {
                const cardId = this.getNodeParameter('cardId', 0);
                const stepId = this.getNodeParameter('stepId', 0);
                const archiveOriginalCard = this.getNodeParameter('archiveOriginalCard', 0);
                const fieldsCard = this.getNodeParameter('fieldsCard', 0);
                if (!cardId) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'CardID is empty, please fill it in',
                        description: 'CardID is empty, please fill it in',
                    });
                }
                const body = {
                    stepId,
                    archiveOriginalCard,
                    fieldsCard
                };
                try {
                    const data = await wts_crm_service_1.WtsCrmService.duplicateCard(cardId, body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'deleteAnnotationCard') {
                const cardId = this.getNodeParameter('cardId', 0);
                const noteId = this.getNodeParameter('noteId', 0);
                if (!cardId || !noteId) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in NoteId and CardId',
                        description: 'Fill in all fields, CardId and NoteId',
                    });
                }
                try {
                    const data = await wts_crm_service_1.WtsCrmService.deleteAnnotationCard(cardId, noteId, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (resource === 'panel' && operation === 'updateCard') {
                const cardId = this.getNodeParameter('cardIdUpdateCard', 0);
                const fields = this.getNodeParameter('fieldsUpdateCard', 0);
                const title = fields.includes('Title') ? this.getNodeParameter('titleCardUpdateCard', 0) : null;
                const includeArchived = fields.includes('Archived') ? this.getNodeParameter('includeArchivedUpdateCard', 0) : null;
                const description = fields.includes('Description') ? this.getNodeParameter('descriptionUpdateCard', 0) : null;
                const monetaryAmount = fields.includes('MonetaryAmount') ? this.getNodeParameter('monetaryAmountUpdateCard', 0) : null;
                const position = fields.includes('Position') ? this.getNodeParameter('positionUpdateCard', 0) : null;
                const stepId = fields.includes('StepId') ? this.getNodeParameter('stepIdUpdateCard', 0) : null;
                const contactIds = fields.includes('ContactIds') ? this.getNodeParameter('contactsIdUpdateCard', 0) : null;
                const arrayContactIds = contactIds === null || contactIds === void 0 ? void 0 : contactIds.contactId;
                const dueDate = fields.includes('DueDate') ? this.getNodeParameter('dueDateUpdateCard', 0) : null;
                const updateCardTagId = fields.includes('TagIds') ? this.getNodeParameter('updateCardTagIdUpdateCard', 0) : null;
                const userId = fields.includes('ResponsibleUserId') ? this.getNodeParameter('userIdUpdateCard', 0) : null;
                const metadata = this.getNodeParameter('metadata', 0);
                const customFields = fields.includes('CustomFields') ? this.getNodeParameter('customFieldsCardUpdateCard', 0) : null;
                const customFieldsObject = (_j = customFields === null || customFields === void 0 ? void 0 : customFields.customFields) === null || _j === void 0 ? void 0 : _j.reduce((acc, field) => {
                    acc[field.key] = field.value;
                    return acc;
                }, {});
                const metadataObject = (_k = metadata === null || metadata === void 0 ? void 0 : metadata.metadata) === null || _k === void 0 ? void 0 : _k.reduce((acc, metadata) => {
                    acc[metadata.key] = metadata.value;
                    return acc;
                }, {});
                if (!cardId) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in CardID',
                        description: 'Fill in all fields, CardID',
                    });
                }
                if (!fields.length) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Fill in Fields',
                        description: 'Fill in all fields',
                    });
                }
                const body = {
                    cardId: cardId,
                    fields: fields,
                    title,
                    includeArchived,
                    description,
                    monetaryAmount,
                    position,
                    stepId,
                    dueDate,
                    updateCardTagId,
                    ...(userId != 'null' && { userId }),
                    customFieldsObject,
                    metadataObject,
                    arrayContactIds
                };
                console.log("Body request");
                console.log(body);
                try {
                    const data = await wts_crm_service_1.WtsCrmService.updateCard(cardId, body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
        }
        else if (resource === 'chatbot') {
            if (operation === 'sendChatbot') {
                const botId = this.getNodeParameter('botId', 0);
                const from = this.getNodeParameter('channelId', 0);
                const to = this.getNodeParameter('numberToSend', 0);
                const sessionId = this.getNodeParameter('sessionId', 0);
                const skipIfBotInExecution = this.getNodeParameter('skipIfBotInExecution', 0);
                const skipIfInProgress = this.getNodeParameter('skipIfInProgress', 0);
                const forceStartSession = this.getNodeParameter('forceStartSession', 0);
                const sessionMetadatas = this.getNodeParameter('sessionMetadatas', 0);
                const contactMetadatas = this.getNodeParameter('contactMetadatas', 0);
                if (!botId || botId == 'null') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Choose a bot',
                        description: 'Fill in the Bots ID field'
                    });
                }
                if (!to) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Set an Instagram number or username for sending',
                        description: 'Fill in the To field'
                    });
                }
                if (!from || from == 'null') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Choose channel',
                        description: 'Fill in the From field'
                    });
                }
                const sessionMetadata = (_l = sessionMetadatas === null || sessionMetadatas === void 0 ? void 0 : sessionMetadatas.sessionMetadata) === null || _l === void 0 ? void 0 : _l.reduce((acc, field) => {
                    acc[field.key] = field.value;
                    return acc;
                }, {});
                const contactMetadata = (_m = contactMetadatas === null || contactMetadatas === void 0 ? void 0 : contactMetadatas.contactMetadata) === null || _m === void 0 ? void 0 : _m.reduce((acc, field) => {
                    acc[field.key] = field.value;
                    return acc;
                }, {});
                const body = {
                    botId,
                    from,
                    to,
                    sessionId,
                    skipIfBotInExecution,
                    skipIfInProgress,
                    forceStartSession,
                    sessionMetadata,
                    contactMetadata
                };
                console.log('Body');
                console.log(body);
                try {
                    const data = await wts_chat_service_1.WtsChatService.sendChatbot(body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
        }
        else if (resource === 'sequence') {
            if (operation === 'getContactsBySequence') {
                const sequenceId = this.getNodeParameter('sequenceId', 0);
                if (!sequenceId || sequenceId.trim() === '') {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'SequenceID is empty!',
                        description: 'Fill in the SequenceID field'
                    });
                }
                try {
                    const data = await wts_chat_service_1.WtsChatService.getContactsBySequence(sequenceId, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            if (operation === 'getAllSequences') {
                const includeDetailsSequence = this.getNodeParameter('includeDetailsSequence', 0);
                const name = this.getNodeParameter('name', 0);
                const contactId = this.getNodeParameter('contactId', 0);
                const genericParams = (0, utils_1.getParamsGenerics)(this);
                const params = {
                    includeDetailsSequence, name, contactId,
                    ...genericParams
                };
                try {
                    const data = await wts_chat_service_1.WtsChatService.getAllSequences(params, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'addContactToSequence') {
                const sequenceId = this.getNodeParameter('sequenceId', 0);
                const phoneNumber = this.getNodeParameter('phonenumber', 0);
                const contactId = this.getNodeParameter('contactId', 0);
                if (!contactId && !phoneNumber) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Add a contact either by ID or phone number',
                        description: 'Add a contact either by ID or phone number'
                    });
                }
                const body = {
                    ...(phoneNumber && { phoneNumber: phoneNumber }),
                    ...(contactId && { contactId: contactId })
                };
                try {
                    const data = await wts_chat_service_1.WtsChatService.addContactToSequence(sequenceId, body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'removeContactToSequence') {
                const sequenceId = this.getNodeParameter('sequenceId', 0);
                const phoneNumber = this.getNodeParameter('phonenumber', 0);
                const contactId = this.getNodeParameter('contactId', 0);
                if (!contactId && !phoneNumber) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Remove a contact either by ID or phone number',
                        description: 'Remove a contact either by ID or phone number'
                    });
                }
                const body = {
                    ...(phoneNumber && { phoneNumber: phoneNumber }),
                    ...(contactId && { contactId: contactId })
                };
                try {
                    const data = await wts_chat_service_1.WtsChatService.removeContactToSequence(sequenceId, body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'addContactsToSequence') {
                const sequenceId = this.getNodeParameter('sequenceId', 0);
                const phoneNumbers = this.getNodeParameter('phonenumbers', 0);
                const arrayPhoneNumbers = phoneNumbers.phonenumber;
                const contactIds = this.getNodeParameter('contactsId', 0);
                const arrayContactIds = contactIds.contactId;
                if (!arrayContactIds && !arrayPhoneNumbers) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Add a contacts either by ID or phone number',
                        description: 'Add a contacts either by ID or phone number'
                    });
                }
                const body = {
                    ...(arrayPhoneNumbers && { phoneNumbers: arrayPhoneNumbers }),
                    ...(arrayContactIds && { contactIds: arrayContactIds })
                };
                try {
                    const data = await wts_chat_service_1.WtsChatService.addContactsToSequence(sequenceId, body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
            else if (operation === 'removeContactsToSequence') {
                const sequenceId = this.getNodeParameter('sequenceId', 0);
                const arrayPhoneNumbers = this.getNodeParameter('phonenumbers', 0);
                const phoneNumbers = arrayPhoneNumbers.phonenumber;
                const arrayContactIds = this.getNodeParameter('contactsId', 0);
                const contactIds = arrayContactIds.contactId;
                if (!contactIds && !phoneNumbers) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), {
                        message: 'Remove a contacts either by ID or phone number',
                        description: 'Remove a contacts either by ID or phone number'
                    });
                }
                const body = {
                    ...(contactIds && { contactIds }),
                    ...(phoneNumbers && { phoneNumbers })
                };
                try {
                    const data = await wts_chat_service_1.WtsChatService.removeContactsToSequence(sequenceId, body, token);
                    const items = [{ json: data }];
                    results[0] = items;
                }
                catch (error) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
            }
        }
        return results;
    }
}
exports.WtsChat = WtsChat;
//# sourceMappingURL=WtsChat.node.js.map