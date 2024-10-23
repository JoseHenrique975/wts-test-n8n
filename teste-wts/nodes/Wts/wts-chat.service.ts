import { ILoadOptionsFunctions } from 'n8n-workflow';

import axios from 'axios';
import { Constants, notSend } from './constants.types';
import { paramsDefault, sendRequestOrAutoPagination } from '../utils';

export class WtsChatService {

  //-----------------------------------------
  //          Requests Operation
  //-----------------------------------------

  static async getMessageById(idMessage: string, token: string): Promise<any> {
    const url = `${Constants.baseUrl}/chat/v1/message/${idMessage}`;

    try {
      const response = await axios.get(url, {
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

  static async getMessageStatus(idMessage: string, token: string): Promise<any> {
    const url = `${Constants.baseUrl}/chat/v1/message/${idMessage}/status`;

    try {
      const response = await axios.get(url, {
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

  static async getAllMessages(params: any, token: string): Promise<any> {
    const url = `${Constants.baseUrl}/chat/v1/message`;

    try {
      const response = await sendRequestOrAutoPagination(params, url, token);
      return response;
    } catch (error) {
      throw new Error(`API request failed: ${error.response.data.text}`);
    }
  }

  static async sendMessageText(body: any, token: string, synchronous: boolean): Promise<any> {
    const url = synchronous ? `${Constants.baseUrl}/chat/v1/message/send-sync` : `${Constants.baseUrl}/chat/v1/message/send`;

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

  static async sendMessageFile(body: any, token: string, synchronous: boolean): Promise<any> {
    const url = synchronous ? `${Constants.baseUrl}/chat/v1/message/send-sync` : `${Constants.baseUrl}/chat/v1/message/send`;

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

  static async sendMessageTemplate(body: any, token: string, synchronous: boolean): Promise<any> {
    const url = synchronous ? `${Constants.baseUrl}/chat/v1/message/send-sync` : `${Constants.baseUrl}/chat/v1/message/send`;

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

  //----------------------------------------------
  //                  SESSION
  //----------------------------------------------

  static async getAllSessions(params: any, token: string, urlWithParams: string): Promise<any> {

    const parameters = {
      ...params,
      ...paramsDefault(params)
    }

    try {
      const response = await sendRequestOrAutoPagination(parameters, urlWithParams, token);
      return response;
    } catch (error) {
      throw new Error(`API request failed: ${error.response.data.text}`);
    }
  }


  static async getSessionById(body: any, token: string): Promise<any> {
    let url = `${Constants.baseUrl}/chat/v1/session/${body.sessionId}`;
    const params = new URLSearchParams({});


    if (body.includeDetails) {
      body.includeDetails.forEach((details: string) => params.append('includeDetails', details));
    }
    url += `?${params.toString()}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(`API request failed: ${error}`);
    }

  }

  static async updateTransfer(sessionId: string, body: any, token: string): Promise<any> {
    const url = `${Constants.baseUrl}/chat/v1/session/${sessionId}/transfer`;
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
    }
    catch (error) {
      throw new Error(`API request failed: ${error.response.data.text}`);
    }
  }

  static async updateStatusSession(sessionId: string, body: any, token: string): Promise<any> {
    const url = `${Constants.baseUrl}/chat/v1/session/${sessionId}/status`;

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
    }
    catch (error) {
      throw new Error(`API request failed: ${error.response.data.text}`);
    }
  }

  static async assignUserToSession(sessionId: string, body: any, token: string) {
    const url = `${Constants.baseUrl}/chat/v1/session/${sessionId}/assignee`;

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

  static async concludeSession(sessionId: string, body: any, token: string) {
    const url = `${Constants.baseUrl}/chat/v1/session/${sessionId}/complete`;

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

  static async updateSession(sessionId: string, body: any, token: string) {
    const url = `${Constants.baseUrl}/chat/v2/session/${sessionId}/partial`;

    const bodyRequest = {
      ...(body.companyId && { companyId: body.companyId }),
      ...(body.statusSessionUpdate && { status: body.statusSessionUpdate }),
      ...(body.endAt && { endAt: body.endAt }),
      ...(body.number && { number: body.number }),
      ...(body.departmentId && { departmentId: body.departmentId }),
      ...(body.userId && { userId: body.userId }),
      ...(body.metadataObject && { metadata: body.metadataObject }),
      ...(body.fields && { fields: body.fields })
    }

    try {
      const response = await axios.put(url, bodyRequest, {
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

  static async sendChatbot(body: any, token: string): Promise<any> {
    const url = `${Constants.baseUrl}/chat/v1/chatbot/send`;

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
    }

    try {
      const response = await axios.post(url, bodyRequest, {
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

  static async sendMessageTextSession(sessionId: string, text: string, token: string): Promise<any> {
    const url = `${Constants.baseUrl}/chat/v1/session/${sessionId}/message`;
    const body = {
      text
    }

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

  static async sendMessageFileUrlSession(sessionId: string, body: any, token: string): Promise<any> {
    const url = `${Constants.baseUrl}/chat/v1/session/${sessionId}/message`;

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

  static async sendMessageTemplateSession(sessionId: string, body: any, token: string): Promise<any> {
    const url = `${Constants.baseUrl}/chat/v1/session/${sessionId}/message`;

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

  static async getAllSequences(params: any, token: string): Promise<any> {
    let url = `${Constants.baseUrl}/chat/v1/sequence`;
    const queryParams = new URLSearchParams({});

    if (params.includeDetailsSequence) {
      params.includeDetailsSequence.forEach((details: string) => { queryParams.append('IncludeDetails', details) });
    }

    url += `?${queryParams.toString()}`;

    try {
      const response = await sendRequestOrAutoPagination(params, url, token);
      return response;
    } catch (error) {
      throw new Error(`API request failed: ${error.response.data.text}`);
    }
  }

  static async getContactsBySequence(sequenceId: string, token: string) {
    const url = `${Constants.baseUrl}/chat/v1/sequence/${sequenceId}/contact`;

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

  static async addContactToSequence(sequenceId: string, body: any, token: string) {
    const url = `${Constants.baseUrl}/chat/v1/sequence/${sequenceId}/contact`;

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
    } catch (error) {
      throw new Error(`API request failed: ${error.response.data.text}`);
    }
  }

  static async removeContactToSequence(sequenceId: string, body: any, token: string) {
    const url = `${Constants.baseUrl}/chat/v1/sequence/${sequenceId}/contact`;

    try {
      const response = await axios.delete(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: body
        
      });
   
      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(`API request failed: ${error.response.data.text}`);
    }
  }

  static async addContactsToSequence(sequenceId: string, body: any, token: string) {
    const url = `${Constants.baseUrl}/chat/v1/sequence/${sequenceId}/contact/batch`;

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
    } catch (error) {
      throw new Error(`API request failed: ${error.response.data.text}`);
    }
  }

  static async removeContactsToSequence(sequenceId: string, body: any, token: string) {
    const url = `${Constants.baseUrl}/chat/v1/sequence/${sequenceId}/contact/batch`;

    try {
      const response = await axios.delete(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: body
      });

      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(`API request failed: ${error.response.data.text}`);
    }
  }

  static async saveFile(file: File, token: string): Promise<any> {
    try {
      const fileDefine: any = file;

      const contentFile = fileDefine?.data;
    
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


  //-----------------------------------------
  //          Requests Load Methods
  //------------------------------------------

  static async getChannelsIds(
    otp: ILoadOptionsFunctions,
  ): Promise<Array<{ name: string; value: string }>> {
    const url = `${Constants.baseUrl}/chat/v1/channel`;
    const credentials = await otp.getCredentials('wtsApi');
    const token = credentials?.apiKey as string;

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const channels = response?.data || [];
      channels.push({ name: 'Undefined', id: notSend});

      return channels.map((channel: any) => ({
        name:  channel.identity ? (channel.identity.humanId + ' ' + channel.identity.platform) : 'Undefined',
        value: channel.id,
      }));
    } catch (error) {
      throw new Error(`Failed to load channels: ${error.response.data.text}`);
    }
  }

  static async getBots(otp: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
    const url = `${Constants.baseUrl}/chat/v1/chatbot`;

    const credentials = await otp.getCredentials('wtsApi');
    const token = credentials?.apiKey as string;

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });

      const data = response?.data;
      data.items?.push({name: 'Undefined', id: notSend})

      return data.items.map((bot: any) => ({
        name: bot.name,
        value: bot.id
      }));
    }
    catch (error) {
      throw new Error(`Failed to load bots: ${error.response.data.text}`);
    }
  }


  static async getTemplates(channelId: string, ild: ILoadOptionsFunctions): Promise<Array<{ name: string; value: string }>> {
    const credentials = await ild.getCredentials('wtsApi');
    const token = credentials?.apiKey as string;

    const url = `${Constants.baseUrl}/chat/v1/template?ChannelId=${channelId}&IncludeDetails=Params`;

    const result: any = [];
    let hasMore = true;
    let pageNumber = 0;

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
        throw new Error(`Failed to load templates: ${error.response.data.text}`);
      }
    }
  
    return result?.map((template: any) => {
      return {
        name: template.name,
        value: JSON.stringify({
          id: template?.id,
          fileType: template?.fileType,
          params: template?.params
        })
      };
    }).concat([{ name: 'Undefined', value: notSend }]);
  }

  static async getTemplateIds(channelId: string, token: string, nameTemplate: string): Promise<{ id: string }> {
    const url = `${Constants.baseUrl}/chat/v1/template?ChannelId=${channelId}`;

    const result: any = [];
    let hasMore = true;
    let pageNumber = 0;

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
        throw new Error(`Failed to load templates: ${error.response.data.text}`);
      }
    }

    const resultObj = result.find((item: any) => item.name === nameTemplate);
    return resultObj;
  }

  static async getNameTemplates(templateName: string, channelId: string, token: string): Promise<Array<{ name: string; value: string }>> {
    const url = `${Constants.baseUrl}/chat/v1/template?ChannelId=${channelId}&IncludeDetails=Params&PageSize=100`;

    try {
      const response = await axios.get(url, {
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

      const result = data.items.flatMap((x: any) => x.params?.map((p: any) => ({
        name: p.name,
        value: p.name
      })));

      return result
    } catch (error) {
      throw new Error(`Failed to load template parameters: ${error.response.data.text}`);
    }
  }


  static async getTemplatesSession(sessionId: string, ild: ILoadOptionsFunctions): Promise<Array<{ name: string, value: string }>> {
    const credentials = await ild.getCredentials('wtsApi');
    const token = credentials?.apiKey as string;

    const body = {
      sessionId
    }

    try {
      const session = await WtsChatService.getSessionById(body, token);
      const templates = await WtsChatService.getTemplates(session.channelId, ild);
      return templates;
    }
    catch (error) {
      throw new Error(`Failed to load template parameters: ${error}`);
    }
  }

  //----------------------//
  //--------UTILS--------//
  static passRequestValues(result: any, data: any) {
    result.totalItems = data.totalItems;
    result.totalPages = data.totalPages;
    result.pageSize = data.pageSize;
    result.pageNumber = data.pageNumber;
    result.hasMorePages = data.hasMorePages;
  }


  static async getUrlFile(bodyFile: { mimeType: string, name: string }, token: string) {
    const url = `${Constants.baseUrl}/core/v1/file/upload`;

    const fileRequest = {
      mimeType: bodyFile.mimeType,
      name: bodyFile.name
    }

    try {
      const response = await axios.post(url, fileRequest, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateFileS3(urlFile: string, dataFile: string, mimeType: string) {

    function base64ToArrayBuffer(data: any) {
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
    } catch (error) {
      throw new Error(`API request failed: ${error.response.data.text}`);
    }
  }

  static async saveFileS3(file: any, keyS3: string, token: string) {
    const url = `${Constants.baseUrl}/core/v1/file`;

    const bodyRequest = {
      type: ['image', 'video'].includes(file.fileType) ? file.fileType : 'UNDEFINED',
      name: file.fileName,
      extension: file.fileExtension,
      keyS3: keyS3,
      mimeType: file.mimeType,
      generateThumb: false
    }

    try {
      const result = await axios.put(
        url,
        bodyRequest,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      return result;
    } catch (error) {
      throw new Error(`API request failed: ${error.response.data.text}`);
    }
  }

}

