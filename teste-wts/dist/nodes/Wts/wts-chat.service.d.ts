import { ILoadOptionsFunctions } from 'n8n-workflow';
export declare class WtsChatService {
    static getMessageById(idMessage: string, token: string): Promise<any>;
    static getMessageStatus(idMessage: string, token: string): Promise<any>;
    static getAllMessages(params: any, token: string): Promise<any>;
    static sendMessageText(body: any, token: string, synchronous: boolean): Promise<any>;
    static sendMessageFile(body: any, token: string, synchronous: boolean): Promise<any>;
    static sendMessageTemplate(body: any, token: string, synchronous: boolean): Promise<any>;
    static getAllSessions(params: any, token: string, urlWithParams: string): Promise<any>;
    static getSessionById(body: any, token: string): Promise<any>;
    static updateTransfer(sessionId: string, body: any, token: string): Promise<any>;
    static updateStatusSession(sessionId: string, body: any, token: string): Promise<any>;
    static assignUserToSession(sessionId: string, body: any, token: string): Promise<any>;
    static concludeSession(sessionId: string, body: any, token: string): Promise<any>;
    static updateSession(sessionId: string, body: any, token: string): Promise<any>;
    static sendChatbot(body: any, token: string): Promise<any>;
    static sendMessageTextSession(sessionId: string, text: string, token: string): Promise<any>;
    static sendMessageFileUrlSession(sessionId: string, body: any, token: string): Promise<any>;
    static sendMessageTemplateSession(sessionId: string, body: any, token: string): Promise<any>;
    static getAllSequences(params: any, token: string): Promise<any>;
    static getContactsBySequence(sequenceId: string, token: string): Promise<any>;
    static addContactToSequence(sequenceId: string, body: any, token: string): Promise<any>;
    static removeContactToSequence(sequenceId: string, body: any, token: string): Promise<any>;
    static addContactsToSequence(sequenceId: string, body: any, token: string): Promise<any>;
    static removeContactsToSequence(sequenceId: string, body: any, token: string): Promise<any>;
    static saveFile(file: File, token: string): Promise<any>;
    static getChannelsIds(otp: ILoadOptionsFunctions): Promise<Array<{
        name: string;
        value: string;
    }>>;
    static getBots(otp: ILoadOptionsFunctions): Promise<Array<{
        name: string;
        value: string;
    }>>;
    static getTemplates(channelId: string, ild: ILoadOptionsFunctions): Promise<Array<{
        name: string;
        value: string;
    }>>;
    static getTemplateIds(channelId: string, token: string, nameTemplate: string): Promise<{
        id: string;
    }>;
    static getNameTemplates(templateName: string, channelId: string, token: string): Promise<Array<{
        name: string;
        value: string;
    }>>;
    static getTemplatesSession(sessionId: string, ild: ILoadOptionsFunctions): Promise<Array<{
        name: string;
        value: string;
    }>>;
    static passRequestValues(result: any, data: any): void;
    static getUrlFile(bodyFile: {
        mimeType: string;
        name: string;
    }, token: string): Promise<any>;
    static updateFileS3(urlFile: string, dataFile: string, mimeType: string): Promise<Response>;
    static saveFileS3(file: any, keyS3: string, token: string): Promise<import("axios").AxiosResponse<any, any>>;
}
