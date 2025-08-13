import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
export declare function getDefaultBuild(this: IExecuteFunctions, actorId: string): Promise<any>;
export declare function getDefaultInputsFromBuild(build: any): Record<string, any>;
export declare function runActorApi(this: IExecuteFunctions, actorId: string, mergedInput: Record<string, any>, qs: Record<string, any>): Promise<any>;
export declare function executeActorRunFlow(this: IExecuteFunctions, actorId: string, mergedInput: Record<string, any>): Promise<INodeExecutionData>;
