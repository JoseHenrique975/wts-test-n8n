import { ILoadOptionsFunctions } from 'n8n-workflow';
export declare class WtsCrmService {
    static getAllAnnotation(cardId: string, token: string, params: any): Promise<any>;
    static createCard(body: any, token: string): Promise<any>;
    static createAnnotationText(cardId: string, body: any, token: string): Promise<any>;
    static createAnnotationFile(cardId: string, body: any, token: string): Promise<any>;
    static getAllPanels(params: any, token: string): Promise<any>;
    static getPanelById(includeDetails: any, panelId: string, token: string): Promise<any>;
    static getAllCards(parameters: any, token: string): Promise<any>;
    static getCardById(cardId: string, includeDetails: any, token: string): Promise<any>;
    static duplicateCard(cardId: string, body: any, token: string): Promise<any>;
    static deleteAnnotationCard(cardId: string, noteId: string, token: string): Promise<any>;
    static updateCard(idCard: string, bodyParams: any, token: string): Promise<any>;
    static getPanels(otp: ILoadOptionsFunctions): Promise<Array<{
        name: string;
        value: any;
    }>>;
    static getCustomFieldsPanel(idPanel: string, ild: ILoadOptionsFunctions): Promise<Array<{
        name: string;
        value: string;
    }>>;
    static getStepsPanelId(panelId: string, ild: ILoadOptionsFunctions): Promise<Array<{
        name: string;
        value: any;
    }>>;
    static getTagsPanel(panelId: string, otp: ILoadOptionsFunctions): Promise<Array<{
        name: string;
        value: any;
    }>>;
    static getTagsByIdCard(idCard: string, otp: ILoadOptionsFunctions): Promise<Array<{
        name: string;
        value: any;
    }>>;
    static getCustomFieldsByPanel(idPanel: string, token: string): Promise<Array<{
        name: string;
        value: string;
    }>>;
    static getCustomFieldsByIdCard(idCard: string, otp: ILoadOptionsFunctions): Promise<Array<{
        name: string;
        value: string;
    }>>;
}
