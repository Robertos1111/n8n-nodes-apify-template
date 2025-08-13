import { type IExecuteFunctions, type IHookFunctions, type ILoadOptionsFunctions, type IRequestOptions } from 'n8n-workflow';
type IApiRequestOptions = IRequestOptions & {
    uri?: string;
};
export declare function apiRequest(this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions, requestOptions: IApiRequestOptions): Promise<any>;
export declare function apiRequestAllItems(this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions, requestOptions: IApiRequestOptions): Promise<any>;
export declare function isUsedAsAiTool(nodeType: string): boolean;
export declare function pollRunStatus(this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions, runId: string): Promise<any>;
export declare function getResults(this: IExecuteFunctions, datasetId: string): Promise<any>;
export {};
