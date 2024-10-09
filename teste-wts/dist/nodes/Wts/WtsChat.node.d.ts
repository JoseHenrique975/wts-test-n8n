import { IExecuteFunctions, ILoadOptionsFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
export declare class WtsChat implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            getCustomFields(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: string;
            }>>;
            getTagsIds(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: string;
            }>>;
            getUsersIds(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: string;
            }>>;
            getDepartmentsIds(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: any;
            }>>;
            getUsersByDepartments(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: string;
            }>>;
            getPanels(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: any;
            }>>;
            getCustomFieldsPanel(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: any;
            }>>;
            getStepsPanelId(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: any;
            }>>;
            getTagsPanel(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: any;
            }>>;
            getTagsByIdCard(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: any;
            }>>;
            getCustomFieldsByIdCard(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: string;
            }>>;
            getTemplates(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: string;
            }>>;
            getChannelsIds(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: string;
            }>>;
            getBots(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: string;
            }>>;
            getTemplatesSession(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: string;
            }>>;
            getNamesParamsTemplates(this: ILoadOptionsFunctions): Promise<any>;
            getNameParamsTemplatesSession(this: ILoadOptionsFunctions): Promise<any>;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
