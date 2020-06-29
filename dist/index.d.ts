export { IFeatureFlagExport, IFeatureFlagMap, IReturnFlag, IFeatureService } from './types';
export declare function getFeatureFlags(names: string | string[] | undefined, tenant: string): Promise<import("./types").IReturnFlag>;
export declare function getFeatureFlag(name: string, tenant: string): Promise<string | boolean>;
export declare function getFeatureFlagBoolean(name: string, tenant: string): Promise<boolean | undefined>;
export declare function getFeatureFlagString(name: string, tenant: string): Promise<string | undefined>;
export declare function featureFlagRouter(): Promise<import("express-serve-static-core").Router>;
