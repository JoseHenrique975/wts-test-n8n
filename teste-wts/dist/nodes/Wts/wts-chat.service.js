"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WtsChatService = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_types_1 = require("./constants.types");
const utils_1 = require("../utils");
class WtsChatService {
    static async getMessageById(idMessage, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/message/${idMessage}`;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async getMessageStatus(idMessage, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/message/${idMessage}/status`;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async getAllMessages(params, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/message`;
        try {
            const response = await (0, utils_1.sendRequestOrAutoPagination)(params, url, token);
            return response;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async sendMessageText(body, token, synchronous) {
        const url = synchronous ? `${constants_types_1.Constants.baseUrl}/chat/v1/message/send-sync` : `${constants_types_1.Constants.baseUrl}/chat/v1/message/send`;
        try {
            const response = await axios_1.default.post(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async sendMessageFile(body, token, synchronous) {
        const url = synchronous ? `${constants_types_1.Constants.baseUrl}/chat/v1/message/send-sync` : `${constants_types_1.Constants.baseUrl}/chat/v1/message/send`;
        try {
            const response = await axios_1.default.post(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async sendMessageTemplate(body, token, synchronous) {
        const url = synchronous ? `${constants_types_1.Constants.baseUrl}/chat/v1/message/send-sync` : `${constants_types_1.Constants.baseUrl}/chat/v1/message/send`;
        try {
            const response = await axios_1.default.post(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async getAllSessions(params, token, urlWithParams) {
        const parameters = {
            ...params,
            ...(0, utils_1.paramsDefault)(params)
        };
        try {
            const response = await (0, utils_1.sendRequestOrAutoPagination)(parameters, urlWithParams, token);
            return response;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async getSessionById(body, token) {
        let url = `${constants_types_1.Constants.baseUrl}/chat/v1/session/${body.sessionId}`;
        const params = new URLSearchParams({});
        if (body.includeDetails) {
            body.includeDetails.forEach((details) => params.append('includeDetails', details));
        }
        url += `?${params.toString()}`;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error}`);
        }
    }
    static async updateTransfer(sessionId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/session/${sessionId}/transfer`;
        try {
            const response = await axios_1.default.put(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async updateStatusSession(sessionId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/session/${sessionId}/status`;
        try {
            const response = await axios_1.default.put(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async assignUserToSession(sessionId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/session/${sessionId}/assignee`;
        try {
            const response = await axios_1.default.put(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async concludeSession(sessionId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/session/${sessionId}/complete`;
        try {
            const response = await axios_1.default.put(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async updateSession(sessionId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v2/session/${sessionId}/partial`;
        const bodyRequest = {
            ...(body.companyId && { companyId: body.companyId }),
            ...(body.statusSessionUpdate && { status: body.statusSessionUpdate }),
            ...(body.endAt && { endAt: body.endAt }),
            ...(body.number && { number: body.number }),
            ...(body.departmentId && { departmentId: body.departmentId }),
            ...(body.userId && { userId: body.userId }),
            ...(body.metadataObject && { metadata: body.metadataObject }),
            ...(body.fields && { fields: body.fields })
        };
        console.log("Body Request");
        console.log(bodyRequest);
        try {
            const response = await axios_1.default.put(url, bodyRequest, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Response");
            console.log(response);
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async sendChatbot(body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/chatbot/send`;
        const bodyRequest = {
            ...(body.botId && { botId: body.botId }),
            ...(body.from && { from: body.from }),
            ...(body.to && { to: body.to }),
            ...(body.sessionId && { sessionId: body.sessionId }),
            options: {
                ...(body.skipIfBotInExecution && { skipIfBotInExecution: body.skipIfBotInExecution }),
                ...(body.skipIfInProgress && { skipIfInProgress: body.skipIfInProgress }),
                ...(body.forceStartSession && { forceStartSession: body.forceStartSession }),
            },
            ...(body.sessionMetadata && { sessionMetada: body.sessionMetadata }),
            ...(body.contactMetadata && { contactMetadata: body.contactMetadata }),
        };
        try {
            const response = await axios_1.default.post(url, bodyRequest, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async sendMessageTextSession(sessionId, text, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/session/${sessionId}/message`;
        const body = {
            text
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
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async sendMessageFileUrlSession(sessionId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/session/${sessionId}/message`;
        try {
            const response = await axios_1.default.post(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async sendMessageTemplateSession(sessionId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/session/${sessionId}/message`;
        try {
            const response = await axios_1.default.post(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async getAllSequences(params, token) {
        let url = `${constants_types_1.Constants.baseUrl}/chat/v1/sequence`;
        const queryParams = new URLSearchParams({});
        if (params.includeDetailsSequence) {
            params.includeDetailsSequence.forEach((details) => { queryParams.append('IncludeDetails', details); });
        }
        url += `?${queryParams.toString()}`;
        try {
            const response = await (0, utils_1.sendRequestOrAutoPagination)(params, url, token);
            return response;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async getContactsBySequence(sequenceId, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/sequence/${sequenceId}/contact`;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async addContactToSequence(sequenceId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/sequence/${sequenceId}/contact`;
        try {
            const response = await axios_1.default.post(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async removeContactToSequence(sequenceId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/sequence/${sequenceId}/contact`;
        try {
            const response = await axios_1.default.delete(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: body
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async addContactsToSequence(sequenceId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/sequence/${sequenceId}/contact/batch`;
        try {
            const response = await axios_1.default.post(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async removeContactsToSequence(sequenceId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/sequence/${sequenceId}/contact/batch`;
        try {
            const response = await axios_1.default.delete(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: body
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async saveFile(file, token) {
        try {
            const fileDefine = file;
            const contentFile = fileDefine === null || fileDefine === void 0 ? void 0 : fileDefine.data;
            const dataUrl = await WtsChatService.getUrlFile({ mimeType: fileDefine.mimeType, name: fileDefine.fileName }, token);
            const urlFile = dataUrl.urlUpload;
            await WtsChatService.updateFileS3(urlFile, contentFile, fileDefine.mimeType);
            const result = await WtsChatService.saveFileS3(fileDefine, dataUrl.keyS3, token);
            return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async getChannelsIds(otp) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/channel`;
        const credentials = await otp.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const channels = (response === null || response === void 0 ? void 0 : response.data) || [];
            channels.push({ name: 'Undefined', id: 'null' });
            return channels.map((channel) => ({
                name: channel.identity ? (channel.identity.humanId + ' ' + channel.identity.platform) : 'Undefined',
                value: channel.id,
            }));
        }
        catch (error) {
            throw new Error(`Failed to load channels: ${error.response.data.text}`);
        }
    }
    static async getBots(otp) {
        var _a;
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/chatbot`;
        const credentials = await otp.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = response === null || response === void 0 ? void 0 : response.data;
            (_a = data.items) === null || _a === void 0 ? void 0 : _a.push({ name: 'Undefined', id: 'null' });
            return data.items.map((bot) => ({
                name: bot.name,
                value: bot.id
            }));
        }
        catch (error) {
            throw new Error(`Failed to load bots: ${error.response.data.text}`);
        }
    }
    static async getTemplates(channelId, ild) {
        const credentials = await ild.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/template?ChannelId=${channelId}&IncludeDetails=Params`;
        const result = [];
        let hasMore = true;
        let pageNumber = 0;
        while (hasMore) {
            pageNumber += 1;
            try {
                const response = await axios_1.default.get(url, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        pageNumber: pageNumber
                    }
                });
                const data = response.data;
                result.push(...data.items);
                if (!data.hasMorePages) {
                    hasMore = false;
                }
            }
            catch (error) {
                throw new Error(`Failed to load templates: ${error.response.data.text}`);
            }
        }
        return result === null || result === void 0 ? void 0 : result.map((template) => {
            return {
                name: template.name,
                value: JSON.stringify({
                    id: template === null || template === void 0 ? void 0 : template.id,
                    fileType: template === null || template === void 0 ? void 0 : template.fileType,
                    params: template === null || template === void 0 ? void 0 : template.params
                })
            };
        }).concat([{ name: 'Undefined', value: 'null' }]);
    }
    static async getTemplateIds(channelId, token, nameTemplate) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/template?ChannelId=${channelId}`;
        const result = [];
        let hasMore = true;
        let pageNumber = 0;
        while (hasMore) {
            pageNumber += 1;
            try {
                const response = await axios_1.default.get(url, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        pageNumber: pageNumber
                    }
                });
                const data = response.data;
                result.push(...data.items);
                if (!data.hasMorePages) {
                    hasMore = false;
                }
            }
            catch (error) {
                throw new Error(`Failed to load templates: ${error.response.data.text}`);
            }
        }
        const resultObj = result.find((item) => item.name === nameTemplate);
        return resultObj;
    }
    static async getNameTemplates(templateName, channelId, token) {
        const url = `${constants_types_1.Constants.baseUrl}/chat/v1/template?ChannelId=${channelId}&IncludeDetails=Params&PageSize=100`;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    name: templateName
                }
            });
            const data = response.data;
            const result = data.items.flatMap((x) => {
                var _a;
                return (_a = x.params) === null || _a === void 0 ? void 0 : _a.map((p) => ({
                    name: p.name,
                    value: p.name
                }));
            });
            return result;
        }
        catch (error) {
            throw new Error(`Failed to load template parameters: ${error.response.data.text}`);
        }
    }
    static async getTemplatesSession(sessionId, ild) {
        const credentials = await ild.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        const body = {
            sessionId
        };
        try {
            const session = await WtsChatService.getSessionById(body, token);
            const templates = await WtsChatService.getTemplates(session.channelId, ild);
            return templates;
        }
        catch (error) {
            throw new Error(`Failed to load template parameters: ${error}`);
        }
    }
    static passRequestValues(result, data) {
        result.totalItems = data.totalItems;
        result.totalPages = data.totalPages;
        result.pageSize = data.pageSize;
        result.pageNumber = data.pageNumber;
        result.hasMorePages = data.hasMorePages;
    }
    static async getUrlFile(bodyFile, token) {
        const url = `${constants_types_1.Constants.baseUrl}/core/v1/file/upload`;
        const fileRequest = {
            mimeType: bodyFile.mimeType,
            name: bodyFile.name
        };
        try {
            const response = await axios_1.default.post(url, fileRequest, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response.data;
            return data;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    static async updateFileS3(urlFile, dataFile, mimeType) {
        function base64ToArrayBuffer(data) {
            var binaryString = atob(data);
            var bytes = new Uint8Array(binaryString.length);
            for (var i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes.buffer;
        }
        const result = base64ToArrayBuffer(dataFile);
        try {
            const response = await fetch(urlFile, {
                method: 'PUT', headers: {
                    'Content-Type': mimeType,
                }, body: result
            });
            const data = response;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async saveFileS3(file, keyS3, token) {
        const url = `${constants_types_1.Constants.baseUrl}/core/v1/file`;
        const bodyRequest = {
            type: ['image', 'video'].includes(file.fileType) ? file.fileType : 'UNDEFINED',
            name: file.fileName,
            extension: file.fileExtension,
            keyS3: keyS3,
            mimeType: file.mimeType,
            generateThumb: false
        };
        try {
            const result = await axios_1.default.put(url, bodyRequest, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return result;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
}
exports.WtsChatService = WtsChatService;
//# sourceMappingURL=wts-chat.service.js.map