import { IReturnFlag } from './types';
/**
 * @returns      Table with the names of all enabled feature flags.
 */
export declare function getAllFlagNames(): Promise<string[]>;
/**
 *
 * @param names     String table with all names of the feature flags to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns     Key value pair of all requested feature flags.
 */
export declare function batchEvaluate(names: string[], identifier?: string): Promise<IReturnFlag>;
