"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WtsCrmService = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_types_1 = require("./constants.types");
const utils_1 = require("../utils");
class WtsCrmService {
    static async getAllAnnotation(cardId, token, params) {
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/card/${cardId}/note`;
        try {
            const response = await (0, utils_1.sendRequestOrAutoPagination)(params, url, token);
            return response;
        }
        catch (error) {
            throw new Error(`Api error: ${error.response.data.text}`);
        }
    }
    static async createCard(body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/card`;
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
    static async createAnnotationText(cardId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/card/${cardId}/note`;
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
    static async createAnnotationFile(cardId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/card/${cardId}/note`;
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
    static async getAllPanels(params, token) {
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel`;
        try {
            const response = await (0, utils_1.sendRequestOrAutoPagination)(params, url, token);
            return response;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async getPanelById(includeDetails, panelId, token) {
        let url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/${panelId}`;
        const params = new URLSearchParams({});
        if (includeDetails) {
            const existCard = includeDetails.find((details) => details == 'Cards');
            if (existCard && includeDetails.find((details) => details != 'Steps')) {
                includeDetails.push('Steps');
            }
            includeDetails.forEach((details) => params.append('IncludeDetails', details));
            url += `?${params.toString()}`;
        }
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
    static async getAllCards(parameters, token) {
        let url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/card`;
        const params = new URLSearchParams({});
        params.append('PanelId', parameters.panelId);
        parameters.includeDetails.forEach((details) => params.append('IncludeDetails', details));
        url += `?${params.toString()}`;
        try {
            const response = await (0, utils_1.sendRequestOrAutoPagination)(parameters, url, token);
            return response;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async getCardById(cardId, includeDetails, token) {
        let url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/card/${cardId}`;
        if (includeDetails) {
            const params = new URLSearchParams({});
            includeDetails === null || includeDetails === void 0 ? void 0 : includeDetails.forEach((details) => params.append('IncludeDetails', details));
            url += `?${params.toString()}`;
        }
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = response === null || response === void 0 ? void 0 : response.data;
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async duplicateCard(cardId, body, token) {
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/card/${cardId}/duplicate`;
        const bodyParams = {
            ...(body.stepId && { copyToStepId: body.stepId }),
            options: {
                ...(body.archiveOriginalCard && { archiveOriginalCard: body.archiveOriginalCard }),
                ...(body.fieldsCard && { fields: body.fieldsCard })
            }
        };
        try {
            const response = await axios_1.default.post(url, bodyParams, {
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
    static async deleteAnnotationCard(cardId, noteId, token) {
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/card/${cardId}/note/${noteId}`;
        try {
            const response = await axios_1.default.delete(url, {
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
    static async updateCard(idCard, bodyParams, token) {
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/card/${idCard}`;
        const body = {
            ...(bodyParams.fields && { fields: bodyParams.fields }),
            ...(bodyParams.title && { title: bodyParams.title }),
            ...(bodyParams.stepId && { stepId: bodyParams.stepId }),
            ...(bodyParams.description && { description: bodyParams.description }),
            ...(bodyParams.position && { position: bodyParams.position }),
            ...(bodyParams.dueDate && { dueDate: bodyParams.dueDate }),
            ...(bodyParams.userId && { responsibleUserId: bodyParams.userId }),
            ...(bodyParams.updateCardTagId && { tagIds: bodyParams.updateCardTagId }),
            ...(bodyParams.arrayContactIds && { contactIds: bodyParams.arrayContactIds }),
            ...(bodyParams.monetaryAmount && { monetaryAmount: bodyParams.monetaryAmount }),
            ...(bodyParams.includeArchived && { archived: bodyParams.includeArchived }),
            ...(bodyParams.customFieldsObject && { customFields: bodyParams.customFieldsObject }),
            ...(bodyParams.metadataObject && { metadata: bodyParams.metadataObject }),
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
            return data;
        }
        catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }
    static async getPanels(otp) {
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel`;
        const credentials = await otp.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        let hasMore = true;
        let pageNumber = 0;
        const result = [];
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
                throw new Error(`Failed to load panels: ${error.response.data.text}`);
            }
        }
        const mappedResult = result.map((panel) => ({
            name: panel.title,
            value: panel.id
        }));
        mappedResult.push({ name: 'Undefined', value: 'null' });
        return mappedResult;
    }
    static async getCustomFieldsPanel(idPanel, ild) {
        const credentials = await ild.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/${idPanel}/custom-fields`;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = response.data;
            const result = data.filter((field) => field.type != 'GROUP');
            return result.map((customFieldPanel) => ({
                name: customFieldPanel.name,
                value: customFieldPanel.key
            }));
        }
        catch (error) {
            throw new Error(`Failed to load custom fields panels: ${error.response.data.text}`);
        }
    }
    static async getStepsPanelId(panelId, ild) {
        const credentials = await ild.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/${panelId}?IncludeDetails=Steps`;
        let steps = [];
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = response.data;
            steps = data.steps;
        }
        catch (error) {
            throw new ErrorEvent(`Failed to load steps: ${error.message}`);
        }
        const result = steps.map((step) => ({
            name: step.title,
            value: step.id
        }));
        result.push({ name: 'Undefined', value: 'null' });
        console.log(result);
        return result;
    }
    static async getTagsPanel(panelId, otp) {
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/${panelId}?IncludeDetails=Tags`;
        const credentials = await otp.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        let tags = [];
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = response.data;
            tags = data.tags;
        }
        catch (error) {
            throw new ErrorEvent(`Failed to load tags panel: ${error.response.data.text}`);
        }
        return tags === null || tags === void 0 ? void 0 : tags.map((tag) => ({
            name: tag.name,
            value: tag.id
        }));
    }
    static async getTagsByIdCard(idCard, otp) {
        var _a;
        const credentials = await otp.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        const card = await WtsCrmService.getCardById(idCard, [], token);
        const includeDetails = ["Tags"];
        const panel = await WtsCrmService.getPanelById(includeDetails, card.panelId, token);
        return (_a = panel === null || panel === void 0 ? void 0 : panel.tags) === null || _a === void 0 ? void 0 : _a.map((tag) => ({
            name: tag.name,
            value: tag.id,
        }));
    }
    static async getCustomFieldsByPanel(idPanel, token) {
        const url = `${constants_types_1.Constants.baseUrl}/crm/v1/panel/${idPanel}/custom-fields`;
        try {
            const response = await axios_1.default.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = response.data;
            return data.map((customField) => ({
                name: customField.name,
                value: customField.key
            }));
        }
        catch (error) {
            throw new ErrorEvent(`Failed to load steps: ${error.message}`);
        }
    }
    static async getCustomFieldsByIdCard(idCard, otp) {
        const credentials = await otp.getCredentials('wtsApi');
        const token = credentials === null || credentials === void 0 ? void 0 : credentials.apiKey;
        console.log("Get Custom Field By Id");
        console.log(idCard);
        const card = await WtsCrmService.getCardById(idCard, [], token);
        const customFields = await WtsCrmService.getCustomFieldsByPanel(card.panelId, token);
        return customFields === null || customFields === void 0 ? void 0 : customFields.map((field) => ({
            name: field.name,
            value: field.key
        }));
    }
}
exports.WtsCrmService = WtsCrmService;
//# sourceMappingURL=wts-crm.service.js.map