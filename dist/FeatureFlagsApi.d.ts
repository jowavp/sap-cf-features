import { IReturnFlag } from './types';
export declare function getAllFlagNames(): Promise<string[]>;
export declare function batchEvaluate(names: string[], tenant: string): Promise<IReturnFlag>;
