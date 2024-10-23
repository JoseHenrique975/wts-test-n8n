import { ILoadOptionsFunctions } from 'n8n-workflow';
import axios from 'axios';
import { Constants, notSend } from './constants.types';
import { sendRequestOrAutoPagination } from '../utils';

export class WtsCrmService {

    //-----------------------------------------
    //          Requests Operation
    //-----------------------------------------

    static async getAllAnnotation(cardId: string, token: string, params: any): Promise<any> {
        const url = `${Constants.baseUrl}/crm/v1/panel/card/${cardId}/note`;

        try {
            const response = await sendRequestOrAutoPagination(params, url, token);
            return response;
        }
        catch (error) {
            throw new Error(`Api error: ${error.response.data.text}`);
        }
    }

    static async createCard(body: any, token: string): Promise<any> {
        const url = `${Constants.baseUrl}/crm/v1/panel/card`;

        try {
            const response = await axios.post(url, body, {
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

    static async createAnnotationText(cardId: string, body: any, token: string): Promise<any> {
        const url = `${Constants.baseUrl}/crm/v1/panel/card/${cardId}/note`;

        try {
            const response = await axios.post(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }

    static async createAnnotationFile(cardId: string, body: any, token: string): Promise<any> {
        const url = `${Constants.baseUrl}/crm/v1/panel/card/${cardId}/note`;

        try {
            const response = await axios.post(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }

    static async getAllPanels(params: any, token: string): Promise<any> {
        const url = `${Constants.baseUrl}/crm/v1/panel`;

        try {
            const response = await sendRequestOrAutoPagination(params, url, token);
            return response;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }


    static async getPanelById(includeDetails: any, panelId: string, token: string): Promise<any> {
        let url = `${Constants.baseUrl}/crm/v1/panel/${panelId}`;
        const params = new URLSearchParams({});

        if (includeDetails) {
            const existCard = includeDetails.find((details: string) => details == 'Cards');
            if (existCard && includeDetails.find((details: string) => details != 'Steps')) {
                includeDetails.push('Steps');
            }

            includeDetails.forEach((details: string) => params.append('IncludeDetails', details));
            url += `?${params.toString()}`;
        }

        try {
            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }

    static async getAllCards(parameters: any, token: string): Promise<any> {
        let url = `${Constants.baseUrl}/crm/v1/panel/card`;

        const params = new URLSearchParams({});
        params.append('PanelId', parameters.panelId);
        parameters.includeDetails.forEach((details: string) => params.append('IncludeDetails', details));
        url += `?${params.toString()}`;

        try {
            const response = await sendRequestOrAutoPagination(parameters, url, token);
            return response;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }

    }

    static async getCardById(cardId: string, includeDetails: any, token: string): Promise<any> {
        let url = `${Constants.baseUrl}/crm/v1/panel/card/${cardId}`;

        if (includeDetails) {
            const params = new URLSearchParams({});
            includeDetails?.forEach((details: string) => params.append('IncludeDetails', details));
            url += `?${params.toString()}`;
        }

        try {
            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response?.data;
            return data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }

    }

    static async duplicateCard(cardId: string, body: any, token: string): Promise<any> {
        const url = `${Constants.baseUrl}/crm/v1/panel/card/${cardId}/duplicate`;

        const bodyParams = {
            ...(body.stepId && { copyToStepId: body.stepId }),
            options: {
                ...(body.archiveOriginalCard && { archiveOriginalCard: body.archiveOriginalCard }),
                ...(body.fieldsCard && { fields: body.fieldsCard })
            }
        }

        try {
            const response = await axios.post(url, bodyParams, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }

    }

    static async deleteAnnotationCard(cardId: string, noteId: string, token: string): Promise<any> {
        const url = `${Constants.baseUrl}/crm/v1/panel/card/${cardId}/note/${noteId}`;

        try {
            const response = await axios.delete(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }

    static async updateCard(idCard: string, bodyParams: any, token: string) {
        const url = `${Constants.baseUrl}/crm/v1/panel/card/${idCard}`;

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
        }
     
        try {
            const response = await axios.put(url, body, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });


            const data = response.data;
            return data;
        } catch (error) {
            throw new Error(`API request failed: ${error.response.data.text}`);
        }
    }

    //-----------------------------------------
    //          Requests Load Methods
    //------------------------------------------

    static async getPanels(
        otp: ILoadOptionsFunctions,
    ): Promise<Array<{ name: string; value: any }>> {
        const url = `${Constants.baseUrl}/crm/v1/panel`;
        const credentials = await otp.getCredentials('wtsApi');
        const token = credentials?.apiKey as string;

        let hasMore: boolean = true;
        let pageNumber: number = 0;
        const result = [];

        while (hasMore) {
            pageNumber += 1;
            try {
                const response = await axios.get(url, {
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
       
        const mappedResult = result.map((panel: any) => ({
            name: panel.title,
            value: panel.id
        }));
        mappedResult.push({name: 'Undefined', value: notSend});
        return mappedResult;
    }

    static async getCustomFieldsPanel(idPanel: string, ild: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
        const credentials = await ild.getCredentials('wtsApi');
        const token = credentials?.apiKey as string;

        const url = `${Constants.baseUrl}/crm/v1/panel/${idPanel}/custom-fields`;
        try {
            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = response.data;
            const result = data.filter((field: any) => field.type != 'GROUP');

            //data.filter((field: any) => field.type != 'GROUP');
            return result.map((customFieldPanel: any) => ({
                name: customFieldPanel.name,
                value: customFieldPanel.key
            }));
        }
        catch (error) {
            throw new Error(`Failed to load custom fields panels: ${error.response.data.text}`);
        }
    }

    static async getStepsPanelId(panelId: string, ild: ILoadOptionsFunctions): Promise<Array<{ name: string; value: any }>> {
        const credentials = await ild.getCredentials('wtsApi');
		const token = credentials?.apiKey as string;

        const url = `${Constants.baseUrl}/crm/v1/panel/${panelId}?IncludeDetails=Steps`;

        let steps: { name: string, value: string }[] = [];
        try {
            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = response.data;
            steps = data.steps;
        } catch (error) {
            throw new ErrorEvent(`Failed to load steps: ${error.message}`);
        }
        const result = steps.map((step: any) => ({
            name: step.title,
            value: step.id
        }));
        result.push({name: 'Undefined', value: notSend});
        return result;
    }

    static async getTagsPanel(panelId: string, otp: ILoadOptionsFunctions): Promise<Array<{ name: string; value: any }>> {
        const url = `${Constants.baseUrl}/crm/v1/panel/${panelId}?IncludeDetails=Tags`;
        const credentials = await otp.getCredentials('wtsApi');
        const token = credentials?.apiKey as string;

        let tags: { name: string, value: string }[] = [];
        try {
            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = response.data;
            tags = data.tags;
        } catch (error) {
            throw new ErrorEvent(`Failed to load tags panel: ${error.response.data.text}`);
        }
        return tags?.map((tag: any) => ({
            name: tag.name,
            value: tag.id
        }));
    }

    static async getTagsByIdCard(idCard: string, otp: ILoadOptionsFunctions): Promise<Array<{ name: string; value: any }>> {
        const credentials = await otp.getCredentials('wtsApi');
        const token = credentials?.apiKey as string;

        const card = await WtsCrmService.getCardById(idCard, [], token);

        const includeDetails = ["Tags"];

        const panel = await WtsCrmService.getPanelById(includeDetails, card.panelId, token);

        return panel?.tags?.map((tag: { name: string; id: string }) => ({
            name: tag.name,
            value: tag.id,
        }));
    }

    static async getCustomFieldsByPanel(idPanel: string, token: string): Promise<Array<{ name: string, value: string }>> {
        const url = `${Constants.baseUrl}/crm/v1/panel/${idPanel}/custom-fields`;

        try {
            const response = await axios.get(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = response.data;
            return data.map((customField: any) => ({
                name: customField.name,
                value: customField.key
            }));
        } catch (error) {
            throw new ErrorEvent(`Failed to load custom fields: ${error.message}`);
        }
    }

    static async getCustomFieldsByIdCard(idCard: string, otp: ILoadOptionsFunctions): Promise<Array<{ name: string, value: string }>> {
        const credentials = await otp.getCredentials('wtsApi');
        const token = credentials?.apiKey as string;

        const card = await WtsCrmService.getCardById(idCard, [], token);

        const customFields = await WtsCrmService.getCustomFieldsByPanel(card.panelId, token);

        return customFields?.map((field: any) => ({
            name: field.name,
            value: field.key
        }));
    }

}