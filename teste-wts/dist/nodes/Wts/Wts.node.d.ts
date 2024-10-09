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
            getTemplates(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: string;
            }>>;
            getTemplatesIds(this: ILoadOptionsFunctions): Promise<Array<{
                name: string;
                value: string;
            }>>;
            getNameTemplates(this: ILoadOptionsFunctions): Promise<Array<{
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
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
