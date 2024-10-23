import { IExecuteFunctions, ILoadOptionsFunctions, INodeExecutionData, INodeType, INodeTypeDescription, JsonObject, jsonParse, NodeApiError } from 'n8n-workflow';
import { WtsCoreService } from './wts-core.service';
import { WtsChatService } from './wts-chat.service';
import { WtsCrmService } from './wts-crm.service';
import { commonFields, dateFields, metadataFields, pageFields } from './descriptions/GenericDescription';
import { contactOperations, contactFields } from './descriptions/ContactDescription';
import { messageOperations, messageFields } from './descriptions/MessageDescription';
import { panelOperations, panelFields, updateCardFields } from './descriptions/PanelDescription';
import { sessionOperations, sessionFields, updateSessionFields } from './descriptions/SessionDescription';
import { sequenceOperations, sequenceFields } from './descriptions/SequenceDescription';
import { Constants, notSend } from './constants.types';
import { chatbotFields, chatbotOperations } from './descriptions';
import { getParamsGenerics } from '../utils';

export class WtsChat implements INodeType {
	description: INodeTypeDescription = {
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

			...sequenceOperations,
			...contactOperations,
			...messageOperations,
			...panelOperations,
			...sessionOperations,
			...chatbotOperations,

			...sequenceFields,
			...commonFields,
			...contactFields,
			...messageFields,
			...updateCardFields,
			...panelFields,
			...sessionFields,
			...updateSessionFields,
			...chatbotFields,
			...dateFields,
			...pageFields,
			...metadataFields
		],
	};

	methods = {
		loadOptions: {

			/*----CORE----*/
			async getCustomFields(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
				return await WtsCoreService.getCustomFields(this);
			},

			async getTagsIds(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
				return await WtsCoreService.getTagsIds(this);
			},

			async getUsersIds(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
				return await WtsCoreService.getUsersIds(this);
			},

			async getDepartmentsIds(this: ILoadOptionsFunctions): Promise<Array<{ name: string, value: any }>> {
				return await WtsCoreService.getDepartmentsIds(this);
			},


			async getUsersByDepartments(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
				const departmentId = this.getCurrentNodeParameter('departmentId') as string ?? this.getNodeParameter('departmentIdUpdatedSession') as string;
				return await WtsCoreService.getUsersByDepartments(departmentId, this);
			},

			/*----CRM----*/
			async getPanels(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: any }>> {
				return await WtsCrmService.getPanels(this);
			},

			async getCustomFieldsPanel(this: ILoadOptionsFunctions): Promise<Array<{ name: string, value: any }>> {
				const panelId = this.getNodeParameter('panels') as string;
				return await WtsCrmService.getCustomFieldsPanel(panelId, this);
			},
			async getStepsPanelId(this: ILoadOptionsFunctions): Promise<Array<{ name: string, value: any }>> {
				const panelId = this.getNodeParameter('panels') as string;
				return await WtsCrmService.getStepsPanelId(panelId, this);
			},
			async getTagsPanel(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: any }>> {
				const panelId = this.getNodeParameter('panels') as string;
				return await WtsCrmService.getTagsPanel(panelId, this);
			},

			async getTagsByIdCard(this: ILoadOptionsFunctions): Promise<Array<{ name: string, value: any }>> {
				const cardId = this.getNodeParameter('cardIdUpdateCard', 0) as string;
				return await WtsCrmService.getTagsByIdCard(cardId, this);
			},

			async getCustomFieldsByIdCard(this: ILoadOptionsFunctions): Promise<Array<{ name: string, value: string }>> {
				const idCard = this.getNodeParameter('cardIdUpdateCard', 0) as string;
				const customFields = await WtsCrmService.getCustomFieldsByIdCard(idCard, this);
				return customFields.map((field: any) => {
					return {
						name: field.name,
						value: field.name
					};
				})
			},

			/*----CHAT----*/

			async getTemplates(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
				const channelId = this.getCurrentNodeParameter('channelId') as string;
				const result = await WtsChatService.getTemplates(channelId, this);
				return result;
			},

			async getChannelsIds(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
				return await WtsChatService.getChannelsIds(this);
			},

			async getBots(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
				return await WtsChatService.getBots(this);
			},

			async getTemplatesSession(this: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
				const sessionId = this.getNodeParameter('sessionId') as string;
				const template = await WtsChatService.getTemplatesSession(sessionId, this);
				return template;
			},

			async getNamesParamsTemplates(this: ILoadOptionsFunctions): Promise<any> {
				const templates = this.getNodeParameter('templates', 0) as string;
				const temp: any = jsonParse(templates);
				const params = temp?.params;
				return params.map((param: any) => {
					return {
						name: param.name,
						value: param.name
					};
				});
			},

			async getNameParamsTemplatesSession(this: ILoadOptionsFunctions): Promise<any> {
				const template = this.getNodeParameter('templatesBySession', 0) as string;
				const temp: any = jsonParse(template);
				const params = temp.params;
				return params.map((param: any) => {
					return {
						name: param.name,
						value: param.name
					};
				});
			}

		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const results: INodeExecutionData[][] = [[]];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		const credentials = await this.getCredentials('wtsApi');
		const token = credentials?.apiKey as string;

		if (resource === 'contact') {
			if (operation === 'getContactById') {
				const idContact = this.getNodeParameter('contactId', 0) as string;
				const includeDetails = this.getNodeParameter('includeDetailsContacts', 0) as Array<string>;

				try {
					var data = await WtsCoreService.getContactById(idContact, includeDetails, token);

					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
			else if (operation === 'getContactByPhone') {
				const phoneNumber = this.getNodeParameter('phonenumber', 0) as string;
				const includeDetails = this.getNodeParameter('includeDetailsContacts', 0) as Array<string>;

				try {
					const data = await WtsCoreService.getContactByPhone(phoneNumber, includeDetails, token);

					const items: INodeExecutionData[] = [{ json: data, },];
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
			else if (operation === 'getAllContacts') {
				const autoPagination = this.getNodeParameter('autoPagination', 0) as boolean;
				const maxPage = autoPagination ? this.getNodeParameter('maxPage', 0) as number : null;

				const includeDetails = this.getNodeParameter('includeDetailsContacts', 0) as Array<String>;
				let status = this.getNodeParameter('statusContact', 0) as string;

				const pageNumber = !autoPagination ? this.getNodeParameter('pageNumber', 0) as number : null;
				const pageSize = !autoPagination ? this.getNodeParameter('pageSize', 0) as number : null;
				const orderBy = this.getNodeParameter('orderBy', 0) as string;
				const orderDirection = this.getNodeParameter('orderDirection', 0) as string;

				const createdAtAfter = this.getNodeParameter('createdAtAfter', 0) as string;
				const createdAtBefore = this.getNodeParameter('createdAtBefore', 0) as string;
				const updatedAtAfter = this.getNodeParameter('updatedAtAfter', 0) as string;
				const updatedAtBefore = this.getNodeParameter('updatedAtBefore', 0) as string;

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
					const data = await WtsCoreService.getAllContacts(params, token);

					const items: INodeExecutionData[] = [{ json: data, }];

					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
			else if (operation === 'createContact') {
				const name = this.getNodeParameter('name', 0) as string;
				const email = this.getNodeParameter('email', 0) as string;
				const phonenumber = this.getNodeParameter('phonenumber', 0) as string;
				const instagram = this.getNodeParameter('instagram', 0) as string;
				const annotation = this.getNodeParameter('annotation', 0) as string;
				const customFields = this.getNodeParameter('customFields', 0) as {
					customFields: { key: string; value: string }[];
				};
				const tagIds = this.getNodeParameter('tagIds', 0) as Array<string>;

				const metadata = this.getNodeParameter('metadata', 0) as {
					metadata: { key: string; value: string }[];
				};

				const upsert = this.getNodeParameter('upsert', 0) as boolean;
				const getIfExists = this.getNodeParameter('getIfExists', 0) as boolean;

				if (email) {
					const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
					const matchEmail = email.match(regexEmail);

					if (!matchEmail) {
						throw new NodeApiError(this.getNode(), {
							message: 'Invalid email!',
							description: 'Invalid email!',
						});
					}
				}

				const customFieldsObject = customFields?.customFields?.reduce(
					(acc: { [key: string]: string }, field) => {
						if (field.key != notSend && field.key != null) {
							acc[field.key] = field.value;
						}
						return acc;
					},
					{},
				);

				const metadataObject = metadata?.metadata?.reduce(
					(acc: { [key: string]: string }, metadata) => {
						acc[metadata.key] = metadata.value;
						return acc;
					},
					{},
				);

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
				}

				try {
					const data = await WtsCoreService.createContact(body, token);

					const items: INodeExecutionData[] = [{ json: data }];

					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

		}

		else if (resource === 'message') {

			if (operation === 'getMessageById') {
				const idMessage = this.getNodeParameter('messageId', 0) as string;

				try {
					const data = await WtsChatService.getMessageById(idMessage, token);

					const items: INodeExecutionData[] = [{ json: data, },];
					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
			else if (operation === 'getMessageStatus') {
				const idMessage = this.getNodeParameter('messageId', 0) as string;

				try {
					const data = await WtsChatService.getMessageStatus(idMessage, token);

					const items: INodeExecutionData[] = [
						{
							json: data,
						},
					];
					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
			else if (operation === 'getAllMessages') {
				const sessionId = this.getNodeParameter('sessionId', 0) as string;

				const genericParams = getParamsGenerics(this);

				if (!sessionId) {
					throw new NodeApiError(this.getNode(), {
						message: 'SessionID is empty, please fill it in',
						description: 'SessionID is empty, please fill it in',
					});
				}

				const params = {
					...genericParams,
					sessionId: sessionId,
				}

				try {
					const data = await WtsChatService.getAllMessages(params, token);

					const items: INodeExecutionData[] = [{ json: data }];

					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
			else if (operation === 'sendText') {
				const synchronous = this.getNodeParameter('synchronousMessage', 0) as boolean;
				const from = this.getNodeParameter('channelId', 0) as string;
				const to = this.getNodeParameter('numberToSend', 0) as string;
				const text = this.getNodeParameter('textMessage', 0) as string;
				const botId = this.getNodeParameter('botId', 0) as string;

				const departmentId = this.getNodeParameter('departmentId', 0) as string;
				const userId = departmentId != notSend ? this.getNodeParameter('userIdByDepartment', 0) as string : null;

				const enableBot = this.getNodeParameter('enableBot', 0) as boolean;
				const hiddenSession = this.getNodeParameter('hiddenSession', 0) as boolean;
				const forceStartSession = this.getNodeParameter('forceStartSession', 0) as boolean;

				if (!from || from == notSend) {
					throw new NodeApiError(this.getNode(), {
						message: 'Choose channel',
						description: 'Fill in the From field',
					});
				}

				if (!to) {
					throw new NodeApiError(this.getNode(), {
						message: 'Set an Instagram number or username for sending',
						description: 'Fill in the To field'
					});
				}

				if (!text || text.trim() == "") {
					throw new NodeApiError(this.getNode(), {
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

					...(departmentId != notSend && { department: { id: departmentId } }),
					...(botId != notSend && { botId: botId }),
					...(userId != notSend && { user: { id: userId } }),
				}


				try {
					const data = await WtsChatService.sendMessageText(body, token, synchronous);

					const items: INodeExecutionData[] = [];
					items.push({ json: data });

					results[0] = items;
					return results;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'sendFile') {
				const file = this.getNodeParameter('fileToSend', 0) as string;
				const inputData = this.getInputData(0) as any;
				const fileUrl = this.getNodeParameter('urlFile', 0) as string ?? null;

				const synchronous = this.getNodeParameter('synchronousMessage', 0) as boolean;
				const from = this.getNodeParameter('channelId', 0) as string;
				const to = this.getNodeParameter('numberToSend', 0) as string;

				const botId = this.getNodeParameter('botId', 0) as string;

				const departmentId = this.getNodeParameter('departmentId', 0) as string;
				const userId = departmentId != notSend ? this.getNodeParameter('userIdByDepartment', 0) as string : null;

				const enableBot = this.getNodeParameter('enableBot', 0) as boolean;
				const hiddenSession = this.getNodeParameter('hiddenSession', 0) as boolean;
				const forceStartSession = this.getNodeParameter('forceStartSession', 0) as boolean;
				/*
								if(fileUrl){
									const regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
									const matchUrl = fileUrl.match(regex);
				
									if (!matchUrl) {
										throw new NodeApiError(this.getNode(), {
											message: 'Invalid URL!',
											description: 'Invalid URL',
										});
									}
								}
				*/

				if (!file && !fileUrl) {
					throw new NodeApiError(this.getNode(), {
						message: 'Fill in any of the fields, whether Url or File!',
						description: 'Choose to send file or the file url!',
					});
				}

				if (!from || from == notSend) {
					throw new NodeApiError(this.getNode(), {
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
					...(departmentId != notSend && { department: { id: departmentId } }),
					...(botId != notSend && { botId: botId }),
					...(userId != notSend && { user: { id: userId } }),
				}
			
            
				if (file) {
					if (!inputData[0].binary || !inputData) {
						throw new NodeApiError(this.getNode(), {
							message: 'There is no data in the input',
							description: 'There is no data in the input',
						});
					}
					if(!inputData[0].binary[file]){
						throw new NodeApiError(this.getNode(), {
							message: 'There is no file with that name that comes from input',
							description: 'There is no file with that name that comes from input',
						});
					}
					const newFile: File = inputData[0].binary[file];
					
					const responseSaveFile = await WtsChatService.saveFile(newFile, token);
					body.body.fileId = responseSaveFile.data.id;
					body.body.fileUrl = null;
				}

				try {
					const data = await WtsChatService.sendMessageFile(body, token, synchronous);

					const items: INodeExecutionData[] = [];
					items.push({ json: data });

					results[0] = items;
					return results;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'sendTemplate') {
				/*Get parameters*/
				const synchronous = this.getNodeParameter('synchronousMessage', 0) as boolean;
				const from = this.getNodeParameter('channelId', 0) as string;
				const template = this.getNodeParameter('templates', 0) as string;

				if (template == null || template == notSend) {
					throw new NodeApiError(this.getNode(), {
						message: 'Choose template',
						description: 'Fill in the Template field',
					});
				}

				const templateObj: any = jsonParse(template);

				let fileUrl = templateObj.fileType != "UNDEFINED" ? this.getNodeParameter('urlFile', 0) as string : null;
				const file = templateObj.fileType != "UNDEFINED" ? this.getNodeParameter('fileToSend', 0) as string : null;
				const inputData = file ? this.getInputData(0) as any : null;

				const templateId = templateObj.id;

				const paramsTemplates = this.getNodeParameter('paramsTemplates', 0) as { paramsTemplatesValues: { name: string, value: string }[] };
				const paramsArray = paramsTemplates.paramsTemplatesValues;
				const to = this.getNodeParameter('numberToSend', 0) as string;

				const departmentId = this.getNodeParameter('departmentId', 0) as string;
				const userId = departmentId != notSend ? this.getNodeParameter('userIdByDepartment', 0) as string : null;
				const botId = this.getNodeParameter('botId', 0) as string;

				const enableBot = this.getNodeParameter('enableBot', 0) as boolean;
				const hiddenSession = this.getNodeParameter('hiddenSession', 0) as boolean;
				const forceStartSession = this.getNodeParameter('forceStartSession', 0) as boolean;

				/*Manipulate data*/

				const paramsName = paramsArray?.map(p => p.name);
				const paramSet = new Set(paramsName);

				const newParams: { name: string, value: string }[] = [];
				paramSet.forEach(name => newParams.push({
					name,
					value: paramsArray.find(param => param.name == name)?.value ?? ''
				}));

				const transformToObject = (params: { name: string, value: string }[]) => {
					const result: any = {};
					params.forEach(param => {
						result[param.name] = param.value;
					});
					return result;
				};

				if (!from || from == notSend) {
					throw new NodeApiError(this.getNode(), {
						message: 'Choose channel',
						description: 'Fill in the From field',
					});
				}

				let fileId;
				if (file) {
					if (!inputData[0].binary || !inputData) {
						throw new NodeApiError(this.getNode(), {
							message: 'There is no data in the input',
							description: 'There is no data in the input',
						});
					}
					if(!inputData[0].binary[file]){
						throw new NodeApiError(this.getNode(), {
							message: 'There is no file with that name that comes from input',
							description: 'There is no file with that name that comes from input',
						});
					}
					const newFile: File = inputData[0].binary[file];

					const responseSaveFile = await WtsChatService.saveFile(newFile, token);
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

					...(botId != notSend && { botId: botId }),
					...(userId != notSend && { user: { id: userId } }),
					...(departmentId != notSend && { department: { id: departmentId } })
				}

				/*Request*/

				try {
					const data = await WtsChatService.sendMessageTemplate(body, token, synchronous);

					const items: INodeExecutionData[] = [];
					items.push({ json: data });

					results[0] = items;
					return results;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
				// Verificar se o número de parâmetros fornecidos excede o máximo permitido
				// if (paramsTemplates.paramsTemplatesValues.length > maxParams) {
				//	   throw new Error(`Cannot add more than ${maxParams} parameters. You have exceeded the allowed limit.`);
				// }
			}

		}

		else if (resource === 'session') {

			if (operation === 'getAllSessions') {

				const genericParams = getParamsGenerics(this);

				const activeAtAfter = this.getNodeParameter('activeAtAfter', 0) as string;
				const activeAtBefore = this.getNodeParameter('activeAtBefore', 0) as string;
				const endAtAfter = this.getNodeParameter('endAtAfter', 0) as string;
				const endAtBefore = this.getNodeParameter('endAtBefore', 0) as string;

				const lastInteractionAtAfter = this.getNodeParameter('lastInteractionAtAfter', 0) as string;
				const lastInteractionAtBefore = this.getNodeParameter('lastInteractionAtBefore', 0) as string;

				const statusSession = this.getNodeParameter('statusSession', 0) as Array<string>;
				const departmentId = this.getNodeParameter('departmentId', 0) as string;
				const userId = this.getNodeParameter('userId', 0) as string;
				const tagIds = this.getNodeParameter('tagIds', 0) as Array<string>;
				const channelsIds = this.getNodeParameter('channelsIds', 0) as Array<string>;
				const contactId = this.getNodeParameter('contactId', 0) as string;
				const includeDetails = this.getNodeParameter('includeDetails', 0) as Array<string>;

				let urlSession = `${Constants.baseUrl}/chat/v1/session`;

				const params = new URLSearchParams({});

				channelsIds.forEach(id => params.append('ChannelsId', id));
				statusSession.forEach(status => params.append('Status', status));
				includeDetails.forEach(details => params.append('IncludeDetails', details));
				tagIds.forEach(tagId => params.append('TagsId', tagId));

				urlSession += `?${params.toString()}`;

				const paramsRequest = {
					status: statusSession,
					...(userId != notSend && { userId: userId }),
					...(departmentId != notSend && { departmentId: departmentId }),
					contactId: contactId,
					includeDetails: includeDetails,

					...genericParams,

					activeAtAfter: activeAtAfter,
					activeAtBefore: activeAtBefore,
					endAtAfter: endAtAfter,
					endAtBefore: endAtBefore,

					lastInteractionAtAfter: lastInteractionAtAfter,
					lastInteractionAtBefore: lastInteractionAtBefore
				}

				try {
					const data = await WtsChatService.getAllSessions(paramsRequest, token, urlSession);

					const items: INodeExecutionData[] = [{ json: data, }]

					results[0] = items;

				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'updateTransfer') {
				const sessionId = this.getNodeParameter('sessionId', 0) as string;
				const departmentId = this.getNodeParameter('departmentId', 0) as string;
				const userId = departmentId != notSend ? this.getNodeParameter('userIdByDepartment', 0) as string : null;

				if (!sessionId) {
					throw new NodeApiError(this.getNode(), {
						message: 'Fill in the field session',
						description: 'Fill in the "sessionId" field',
					});
				}

				if (departmentId == notSend || userId == notSend) {
					throw new NodeApiError(this.getNode(), {
						message: 'The transfer destination user or department must be defined',
						description: 'The transfer destination user or department must be defined',
					});
				}

				/*
				 if(!departmentId || !userId){
					 throw new NodeApiError(this.getNode(), {
						 message: 'Choose one department or user to transfer the conversation',
						 description: 'Choose one department or user to transfer the conversation',
					 });
				 }
				 */

				let type = departmentId && userId ? 'USER' : 'DEPARTMENT';

				const body = {
					type: type,
					...(departmentId != notSend && { newDepartmentId: departmentId }),
					...(userId != notSend && { newUserId: userId })
				}

				try {
					const data = await WtsChatService.updateTransfer(sessionId, body, token);

					const items: INodeExecutionData[] = [];
					items.push({ json: data });

					results[0] = items;
					return results;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
			else if (operation === 'updateStatusSession') {
				const sessionId = this.getNodeParameter('sessionId', 0) as string;
				const status = this.getNodeParameter('statusSessionOption', 0) as string;

				if (!sessionId || !status) {
					throw new NodeApiError(this.getNode(), {
						message: 'Fill in all fields',
						description: 'Both sessionId and status are required to update the session status.',
					});
				}
				if (!status || status === 'UNDEFINED') {
					throw new NodeApiError(this.getNode(), {
						message: 'Add a valid status!',
						description: 'Add a valid status!',
					});
				}

				const body = {
					newStatus: status
				}

				try {
					const data = await WtsChatService.updateStatusSession(sessionId, body, token);

					const items: INodeExecutionData[] = [];
					items.push({ json: data });

					results[0] = items;
					return results;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'getSessionById') {
				const sessionId = this.getNodeParameter('sessionId', 0) as string;
				const includeDetails = this.getNodeParameter('includeDetails', 0) as Array<string>;

				if (!sessionId || sessionId.trim() === '') {
					throw new NodeApiError(this.getNode(), {
						message: 'SessionID is empty!',
						description: 'Fill in the SessionID field'
					});
				}

				const body = {
					sessionId,
					includeDetails
				}

				try {
					const data = await WtsChatService.getSessionById(body, token);
					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'assignUser') {
				const sessionId = this.getNodeParameter('sessionId', 0) as string;
				const userId = this.getNodeParameter('userId', 0) as string;

				if (!sessionId || sessionId.trim() === '') {
					throw new NodeApiError(this.getNode(), {
						message: 'SessionID is empty!',
						description: 'Fill in the SessionID field'
					});
				}

				if (!userId || userId == notSend) {
					throw new NodeApiError(this.getNode(), {
						message: 'UserID is empty!',
						description: 'Choose user'
					});
				}

				const body = {
					userId
				}

				try {
					const data = await WtsChatService.assignUserToSession(sessionId, body, token);
					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'concludeSession') {
				const sessionId = this.getNodeParameter('sessionId', 0) as string;
				const reactivateOnNewMessage = this.getNodeParameter('reactivateOnNewMessage', 0) as boolean;

				if (!sessionId || sessionId.trim() === '') {
					throw new NodeApiError(this.getNode(), {
						message: 'SessionID is empty!',
						description: 'Fill in the SessionID field'
					});
				}

				const body = {
					reactivateOnNewMessage
				}

				try {
					const data = await WtsChatService.concludeSession(sessionId, body, token);
					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
			else if (operation === 'updateSession') {
				const fields = this.getNodeParameter('fieldsUpdate', 0) as Array<string>;
				const sessionId = this.getNodeParameter('sessionId', 0) as string;
				const companyId = this.getNodeParameter('companyId', 0) as string;

				const statusSessionUpdate = fields.includes('Status') ? this.getNodeParameter('statusUpdateSessionOption', 0) as string : null;

				const endAt = fields.includes('EndAt') ? this.getNodeParameter('endAt', 0) as string : null;
				const number = fields.includes('Number') ? this.getNodeParameter('number', 0) as string : null;

				const departmentId = (fields.includes('DepartmentId') || fields.includes('UserId')) ? this.getNodeParameter('departmentIdUpdatedSession', 0) as string : null;
				const userId = fields.includes('UserId') ? this.getNodeParameter('userIdByDepartmentUpdateSession', 0) as string : null;

				const metadata = fields.includes('Metadata') ? this.getNodeParameter('metadataUpdateSession', 0) as {
					metadata: { key: string; value: string }[];
				} : null;

				const metadataObject = metadata?.metadata?.reduce(
					(acc: { [key: string]: string }, metadata) => {
						acc[metadata.key] = metadata.value;
						return acc;
					},
					{},
				);

				if (!sessionId || sessionId.trim() === '') {
					throw new NodeApiError(this.getNode(), {
						message: 'SessionID is empty!',
						description: 'Fill in the SessionID field'
					});
				}

				const body = {
					companyId,
					...(statusSessionUpdate != 'UNDEFINED' && { statusSessionUpdate }), endAt,
					number, ...(departmentId != notSend && { departmentId }), ...(userId != notSend && { userId }), metadataObject, fields
				}

				try {
					const data = await WtsChatService.updateSession(sessionId, body, token);
					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
			else if (operation === 'sendMessageTextSession') {
				const sessionId = this.getNodeParameter('sessionId', 0) as string;
				const text = this.getNodeParameter('textMessage', 0) as string;

				if (!sessionId || sessionId.trim() === '') {
					throw new NodeApiError(this.getNode(), {
						message: 'SessionID is empty!',
						description: 'Fill in the SessionID field'
					});
				}

				try {
					const data = await WtsChatService.sendMessageTextSession(sessionId, text, token);
					const items: INodeExecutionData[] = [{ json: data }]
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
			else if (operation === 'sendMessageFileSession') {
				const sessionId = this.getNodeParameter('sessionId', 0) as string;
				const fileUrl = this.getNodeParameter('urlFile', 0) as string ?? null;
				const file = this.getNodeParameter('fileToSend', 0) as string ?? null;
				const inputData = file ? this.getInputData(0) as any : null;

				if (!sessionId || sessionId.trim() === '') {
					throw new NodeApiError(this.getNode(), {
						message: 'SessionID is empty!',
						description: 'Fill in the SessionID field'
					});
				}

				if (!fileUrl && !file) {
					throw new NodeApiError(this.getNode(), {
						message: 'Fill in any of the fields',
						description: 'Fill in the file or url'
					});
				}

				const body = {
					fileUrl: fileUrl || null,
					fileId: null
				}

				if (file) {
					if (!inputData[0].binary || !inputData) {
						throw new NodeApiError(this.getNode(), {
							message: 'There is no data in the input',
							description: 'There is no data in the input',
						});
					}
					if(!inputData[0].binary[file]){
						throw new NodeApiError(this.getNode(), {
							message: 'There is no file with that name that comes from input',
							description: 'There is no file with that name that comes from input',
						});
					}
					const newFile: File = inputData[0].binary[file];
                     
					const responseSaveFile = await WtsChatService.saveFile(newFile, token);
					body.fileId = responseSaveFile.data.id;
					body.fileUrl = null
				}

				try {
					const data = await WtsChatService.sendMessageFileUrlSession(sessionId, body, token);
					const items: INodeExecutionData[] = [{ json: data }]
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}

			}
			else if (operation === 'sendMessageTemplateSession') {
				const sessionId = this.getNodeParameter('sessionId', 0) as string;
				const template = this.getNodeParameter('templatesBySession', 0) as string;
				const params = (template && template != notSend) ? this.getNodeParameter('paramsTemplatesSession', 0) as { paramsTemplatesValues: { name: string, value: string }[] } : null;

				if (!sessionId || sessionId.trim() == '') {
					throw new NodeApiError(this.getNode(), {
						message: 'SessionID is empty!',
						description: 'Fill in the SessionID field'
					});
				}

				if (template == notSend || !template) {
					throw new NodeApiError(this.getNode(), {
						message: 'Choose a valid template',
						description: 'Choose a valid template'
					});
				}
				const obj: any = jsonParse(template);

				let fileUrl = obj.fileType != "UNDEFINED" ? this.getNodeParameter('urlFile', 0) as string : null;
				const file = obj.fileType != "UNDEFINED" ? this.getNodeParameter('fileToSend', 0) as string : null;
				const inputData = file ? this.getInputData(0) as any : null;

				const paramsArray = params?.paramsTemplatesValues;
				const paramsName = paramsArray?.map(p => p.name);
				const paramSet = new Set(paramsName);

				const newParams: { name: string, value: string }[] = [];
				paramSet.forEach(name => newParams.push({
					name,
					value: paramsArray?.find(param => param.name == name)?.value ?? ''
				}));

				const transformToObject = (params: { name: string, value: string }[]) => {
					const result: any = {};
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
				}

				if (file) {
					if (!inputData[0].binary || !inputData) {
						throw new NodeApiError(this.getNode(), {
							message: 'There is no data in the input',
							description: 'There is no data in the input',
						});
					}
					if(!inputData[0].binary[file]){
						throw new NodeApiError(this.getNode(), {
							message: 'There is no file with that name that comes from input',
							description: 'There is no file with that name that comes from input',
						});
					}
					
					const newFile: File = inputData[0].binary[file];
					const responseSaveFile = await WtsChatService.saveFile(newFile, token);
					body.fileId = responseSaveFile.data.id;
					body.fileUrl = null;
				}

				try {
					const data = await WtsChatService.sendMessageTemplateSession(sessionId, body, token);
					const items: INodeExecutionData[] = [{ json: data }]
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
		}


		else if (resource === 'panel') {
			if (operation === 'getAllAnnotation') {
				const cardId = this.getNodeParameter('cardId', 0) as string;

				if (!cardId) {
					throw new NodeApiError(this.getNode(), {
						message: 'CardID is empty, please fill it in',
						description: 'CardID is empty, please fill it in',
					});
				}

				const genericParams = getParamsGenerics(this);

				const params = {
					...genericParams
				}

				try {
					const data = await WtsCrmService.getAllAnnotation(cardId, token, params);

					const items: INodeExecutionData[] = [{ json: data }]

					results[0] = items;

				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'createCard') {

				const stepId = this.getNodeParameter('stepPanels', 0) as string;
				const title = this.getNodeParameter('title', 0) as string;
				const description = this.getNodeParameter('description', 0) as string;
				const position = this.getNodeParameter('position', 0) as number;
				const userId = this.getNodeParameter('userId', 0) as string;
				const tagsPanelIds = this.getNodeParameter('tagsPanel', 0) as Array<string>;
				const contactId = this.getNodeParameter('contactId', 0) as Array<string>;
				const monetaryAmount = this.getNodeParameter('monetaryAmount', 0) as string;

				const customFields = this.getNodeParameter('customFieldsPanel', 0) as {
					customFields: { key: string; value: string }[];
				};
				const metadata = this.getNodeParameter('metadata', 0) as {
					metadata: { key: string; value: string }[];
				};

				const customFieldsObject = customFields?.customFields?.reduce(
					(acc: { [key: string]: string }, field) => {
						acc[field.key] = field.value;
						return acc;
					},
					{},
				);

				//const customFieldsObject: Map<string, string> = new Map<string, string>();
				//	customFields?.customFields?.forEach(field => {
				//		customFieldsObject.set(field.key, field.value)
				//	});

				const metadataObject = metadata?.metadata?.reduce(
					(acc: { [key: string]: string }, metadata) => {
						acc[metadata.key] = metadata.value;
						return acc;
					},
					{},
				);

				if (!stepId || stepId == notSend) {
					throw new NodeApiError(this.getNode(), {
						message: 'Choose a panel and its step',
						description: 'Choose a panel and its step',
					});
				}

				if (!title || title.trim() == '') {
					throw new NodeApiError(this.getNode(), {
						message: 'Title is empty, please fill it in',
						description: 'Title is empty, please fill it in',
					});
				}



				const body = {
					stepId: stepId,
					title: title,
					tagIds: tagsPanelIds,

					...(monetaryAmount && { monetaryAmount: monetaryAmount }),
					...(userId != notSend && { responsibleUserId: userId }),
					...(contactId && { contactIds: [contactId] }),
					...(position && { position: position }),
					...(description && { description: description }),
					...(metadataObject && { metadata: metadataObject }),
					...(customFieldsObject && { customFields: customFieldsObject }),
				}

				try {
					const data = await WtsCrmService.createCard(body, token);

					const items: INodeExecutionData[] = [];
					items.push({ json: data });

					results[0] = items;
					return results;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'createAnnotationText') {
				const cardId = this.getNodeParameter('cardId', 0) as string;
				const annotation = this.getNodeParameter('textMessage', 0) as string;

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

				const body = {
					text: annotation
				}

				try {
					const data = await WtsCrmService.createAnnotationText(cardId, body, token);

					const items: INodeExecutionData[] = [];
					items.push({ json: data });

					results[0] = items;
					return results;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'createAnnotationFile') {
				const cardId = this.getNodeParameter('cardId', 0) as string;
				const fileUrls = this.getNodeParameter('fileUrls', 0) as any;
				const arrayUrls = fileUrls.fileUrl;

				if (!cardId) {
					throw new NodeApiError(this.getNode(), {
						message: 'Fill in the CardId field',
						description: 'CardId cannot be empty',
					});
				}

				const body = {
					fileUrls: arrayUrls
				}

				try {
					const data = await WtsCrmService.createAnnotationFile(cardId, body, token);

					const items: INodeExecutionData[] = [];
					items.push({ json: data });

					results[0] = items;
					return results;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'getAllPanels') {
				const titlePanel = this.getNodeParameter("title", 0) as string;

				const genericParams = getParamsGenerics(this);

				const params = {
					title: titlePanel,
					...genericParams
				}

				try {
					const data = await WtsCrmService.getAllPanels(params, token);

					const items: INodeExecutionData[] = [{ json: data }]

					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'getPanelById') {
				const panelId = this.getNodeParameter('panelId', 0) as string;
				const includeDetails = this.getNodeParameter('includeDetailsPanel', 0) as Array<string>;

				if (!panelId) {
					throw new NodeApiError(this.getNode(), {
						message: 'Fill in the panel ID field',
						description: 'Fill in the field with the panel id'
					});
				}

				try {
					const data = await WtsCrmService.getPanelById(includeDetails, panelId, token);

					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'getAllCards') {

				const panelId = this.getNodeParameter('panels', 0) as string;
				const stepId = this.getNodeParameter('stepPanels', 0) as string;
				const contactId = this.getNodeParameter('contactId', 0) as string;
				const responsibleUserId = this.getNodeParameter('userId', 0) as string;
				const textFilter = this.getNodeParameter('textFilter', 0) as string;
				const includeArchived = this.getNodeParameter('includeArchived', 0) as boolean;
				const includeDetails = this.getNodeParameter('includeDetailsGetCards', 0) as Array<string>;

				const genericParams = getParamsGenerics(this);

				if (!panelId || panelId == notSend) {
					throw new NodeApiError(this.getNode(), {
						message: 'Fill in the panel ID field',
						description: 'Fill in the field with the panel id'
					});
				}
				const params = {
					panelId: panelId,
					...(stepId != notSend && { stepId: stepId }),
					...(contactId && { contactId: contactId }),
					...(responsibleUserId != notSend && { responsibleUserId: responsibleUserId }),
					...(textFilter && { textFilter: textFilter }),
					...(includeArchived && { includeArchived: includeArchived }),
					...(includeDetails && { includeDetails: includeDetails }),

					...genericParams
				}

				try {
					const data = await WtsCrmService.getAllCards(params, token);

					const items: INodeExecutionData[] = [{ json: data }]

					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'getCardById') {
				const cardId = this.getNodeParameter('cardId', 0) as string;
				const includeDetails = this.getNodeParameter('includeDetailsGetCards', 0) as Array<string>;

				if (!cardId) {
					throw new NodeApiError(this.getNode(), {
						message: 'CardID is empty, please fill it in',
						description: 'CardID is empty, please fill it in',
					});
				}

				try {
					const data = await WtsCrmService.getCardById(cardId, includeDetails, token);

					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'duplicateCard') {
				const cardId = this.getNodeParameter('cardId', 0) as string;
				const stepId = this.getNodeParameter('stepId', 0) as string;
				const archiveOriginalCard = this.getNodeParameter('archiveOriginalCard', 0) as boolean;
				const fieldsCard = this.getNodeParameter('fieldsCard', 0) as Array<string>;

				if (!cardId) {
					throw new NodeApiError(this.getNode(), {
						message: 'CardID is empty, please fill it in',
						description: 'CardID is empty, please fill it in',
					});
				}

				const body = {
					stepId,
					archiveOriginalCard,
					fieldsCard
				}

				try {
					const data = await WtsCrmService.duplicateCard(cardId, body, token);

					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'deleteAnnotationCard') {
				const cardId = this.getNodeParameter('cardId', 0) as string;
				const noteId = this.getNodeParameter('noteId', 0) as string;

				if (!cardId || !noteId) {
					throw new NodeApiError(this.getNode(), {
						message: 'Fill in NoteId and CardId',
						description: 'Fill in all fields, CardId and NoteId',
					});
				}

				try {
					const data = await WtsCrmService.deleteAnnotationCard(cardId, noteId, token);

					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
			else if (resource === 'panel' && operation === 'updateCard') {
				const cardId = this.getNodeParameter('cardIdUpdateCard', 0) as string;
				const fields = this.getNodeParameter('fieldsUpdateCard', 0) as Array<string>;

				const title = fields.includes('Title') ? this.getNodeParameter('titleCardUpdateCard', 0) as string : null;
				const includeArchived = fields.includes('Archived') ? this.getNodeParameter('includeArchivedUpdateCard', 0) as boolean : null;
				const description = fields.includes('Description') ? this.getNodeParameter('descriptionUpdateCard', 0) as string : null;
				const monetaryAmount = fields.includes('MonetaryAmount') ? this.getNodeParameter('monetaryAmountUpdateCard', 0) as string : null;
				const position = fields.includes('Position') ? this.getNodeParameter('positionUpdateCard', 0) as number : null;
				const stepId = fields.includes('StepId') ? this.getNodeParameter('stepIdUpdateCard', 0) as string : null;

				const contactIds = fields.includes('ContactIds') ? this.getNodeParameter('contactsIdUpdateCard', 0) as any : null;
				const arrayContactIds = contactIds?.contactId;

				const dueDate = fields.includes('DueDate') ? this.getNodeParameter('dueDateUpdateCard', 0) as string : null;
				const updateCardTagId = fields.includes('TagIds') ? this.getNodeParameter('updateCardTagIdUpdateCard', 0) as Array<string> : null;
				const userId = fields.includes('ResponsibleUserId') ? this.getNodeParameter('userIdUpdateCard', 0) as string : null;

				const metadata = this.getNodeParameter('metadata', 0) as {
					metadata: { key: string; value: string }[];
				};

				const customFields = fields.includes('CustomFields') ? this.getNodeParameter('customFieldsCardUpdateCard', 0) as {
					customFields: { key: string; value: string }[]
				} : null;

				const customFieldsObject = customFields?.customFields?.reduce(
					(acc: { [key: string]: string }, field) => {
						acc[field.key] = field.value;
						return acc;
					},
					{},
				);

				const metadataObject = metadata?.metadata?.reduce(
					(acc: { [key: string]: string }, metadata) => {
						acc[metadata.key] = metadata.value;
						return acc;
					},
					{},
				);

				if (!cardId) {
					throw new NodeApiError(this.getNode(), {
						message: 'Fill in CardID',
						description: 'Fill in all fields, CardID',
					});
				}

				if (!fields.length) {
					throw new NodeApiError(this.getNode(), {
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
					...(userId != notSend && { userId }),
					customFieldsObject,
					metadataObject,
					arrayContactIds
				}

				try {
					const data = await WtsCrmService.updateCard(cardId, body, token);

					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
		}
		else if (resource === 'chatbot') {
			if (operation === 'sendChatbot') {
				const botId = this.getNodeParameter('botId', 0) as string;
				const from = this.getNodeParameter('channelId', 0) as string;
				const to = this.getNodeParameter('numberToSend', 0) as string;
				const sessionId = this.getNodeParameter('sessionId', 0) as string;

				const skipIfBotInExecution = this.getNodeParameter('skipIfBotInExecution', 0) as boolean;
				const skipIfInProgress = this.getNodeParameter('skipIfInProgress', 0) as boolean;
				const forceStartSession = this.getNodeParameter('forceStartSession', 0) as boolean;

				const sessionMetadatas = this.getNodeParameter('sessionMetadatas', 0) as {
					sessionMetadata: { key: string; value: string }[];
				};

				const contactMetadatas = this.getNodeParameter('contactMetadatas', 0) as {
					contactMetadata: { key: string; value: string }[];
				};

				if (!botId || botId == notSend) {
					throw new NodeApiError(this.getNode(), {
						message: 'Choose a bot',
						description: 'Fill in the Bots ID field'
					});
				}

				if (!to) {
					throw new NodeApiError(this.getNode(), {
						message: 'Set an Instagram number or username for sending',
						description: 'Fill in the To field'
					});
				}

				if (!from || from == notSend) {
					throw new NodeApiError(this.getNode(), {
						message: 'Choose channel',
						description: 'Fill in the From field'
					});
				}

				const sessionMetadata = sessionMetadatas?.sessionMetadata?.reduce(
					(acc: { [key: string]: string }, field) => {
						acc[field.key] = field.value;
						return acc;
					},
					{},
				);

				const contactMetadata = contactMetadatas?.contactMetadata?.reduce(
					(acc: { [key: string]: string }, field) => {
						acc[field.key] = field.value;
						return acc;
					},
					{},
				);

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
				}

				try {
					const data = await WtsChatService.sendChatbot(body, token);
					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}
		}

		else if (resource === 'sequence') {

			if (operation === 'getContactsBySequence') {
				const sequenceId = this.getNodeParameter('sequenceId', 0) as string;

				if (!sequenceId || sequenceId.trim() === '') {
					throw new NodeApiError(this.getNode(), {
						message: 'SequenceID is empty!',
						description: 'Fill in the SequenceID field'
					});
				}

				try {
					const data = await WtsChatService.getContactsBySequence(sequenceId, token);
					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			if (operation === 'getAllSequences') {
				const includeDetailsSequence = this.getNodeParameter('includeDetailsSequence', 0) as Array<string>;
				const name = this.getNodeParameter('name', 0) as string;
				const contactId = this.getNodeParameter('contactId', 0) as string;

				const genericParams = getParamsGenerics(this);

				const params = {
					includeDetailsSequence, name, contactId,
					...genericParams
				}

				try {
					const data = await WtsChatService.getAllSequences(params, token);
					const items: INodeExecutionData[] = [{ json: data }]
					results[0] = items;
				}
				catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'addContactToSequence') {
				const sequenceId = this.getNodeParameter('sequenceId', 0) as string;
				const phoneNumber = this.getNodeParameter('phonenumber', 0) as string;
				const contactId = this.getNodeParameter('contactId', 0) as string;

				if (!contactId && !phoneNumber) {
					throw new NodeApiError(this.getNode(), {
						message: 'Add a contact either by ID or phone number',
						description: 'Add a contact either by ID or phone number'
					});
				}

				const body = {
					...(phoneNumber && { phoneNumber: phoneNumber }),
					...(contactId && { contactId: contactId })
				}

				try {
					const data = await WtsChatService.addContactToSequence(sequenceId, body, token);
					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'removeContactToSequence') {
				const sequenceId = this.getNodeParameter('sequenceId', 0) as string;
				const phoneNumber = this.getNodeParameter('phonenumber', 0) as string;
				const contactId = this.getNodeParameter('contactId', 0) as string;

				if (!contactId && !phoneNumber) {
					throw new NodeApiError(this.getNode(), {
						message: 'Remove a contact either by ID or phone number',
						description: 'Remove a contact either by ID or phone number'
					});
				}

				const body = {
					...(phoneNumber && { phoneNumber: phoneNumber }),
					...(contactId && { contactId })
				}

				try {
					const data = await WtsChatService.removeContactToSequence(sequenceId, body, token);
					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'addContactsToSequence') {
				const sequenceId = this.getNodeParameter('sequenceId', 0) as string;

				const phoneNumbers = this.getNodeParameter('phonenumbers', 0) as any;
				const arrayPhoneNumbers = phoneNumbers.phonenumber;

				const contactIds = this.getNodeParameter('contactsId', 0) as any;
				const arrayContactIds = contactIds.contactId;

				if (!arrayContactIds && !arrayPhoneNumbers) {
					throw new NodeApiError(this.getNode(), {
						message: 'Add a contacts either by ID or phone number',
						description: 'Add a contacts either by ID or phone number'
					});
				}

				const body = {
					...(arrayPhoneNumbers && { phoneNumbers: arrayPhoneNumbers }),
					...(arrayContactIds && { contactIds: arrayContactIds })
				}

				try {
					const data = await WtsChatService.addContactsToSequence(sequenceId, body, token);
					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

			else if (operation === 'removeContactsToSequence') {
				const sequenceId = this.getNodeParameter('sequenceId', 0) as string;

				const arrayPhoneNumbers = this.getNodeParameter('phonenumbers', 0) as any;
				const phoneNumbers = arrayPhoneNumbers.phonenumber;

				const arrayContactIds = this.getNodeParameter('contactsId', 0) as any;
				const contactIds = arrayContactIds.contactId;

				if (!contactIds && !phoneNumbers) {
					throw new NodeApiError(this.getNode(), {
						message: 'Remove a contacts either by ID or phone number',
						description: 'Remove a contacts either by ID or phone number'
					});
				}

				const body = {
					...(contactIds && { contactIds }),
					...(phoneNumbers && { phoneNumbers })
				}

				try {
					const data = await WtsChatService.removeContactsToSequence(sequenceId, body, token);
					const items: INodeExecutionData[] = [{ json: data }];
					results[0] = items;
				} catch (error) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}
			}

		}

		return results;
	}
}