export { IFeatureFlagExport, IFeatureFlagMap, IReturnFlag, IFeatureService } from './types';
/**
 * get a list of feature flags for a certain identifier (e.g. tenant)
 * @param names     String table with all names of the feature flags to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  Key value pair of all requested feature flags
 */
export declare function getFeatureFlags(names?: string | string[], identifier?: string): Promise<import("./types").IReturnFlag>;
/**
 * get a feature flag value for a certain identifier (e.g. tenant)
 * @param names     String table with all names of the feature flags to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  The value of the requested feature flags
 */
export declare function getFeatureFlag(name: string, identifier?: string): Promise<string | boolean>;
/**
 * get a feature flag value for a certain identifier (e.g. tenant)
 * @param name     Name of the feature flag to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  The boolean value of the requested feature flag
 */
export declare function getFeatureFlagBoolean(name: string, identifier?: string): Promise<boolean | undefined>;
/**
 * get a feature flag value for a certain identifier (e.g. tenant)
 * @param names     Name of the feature flag to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  The string of the requested feature flag
 */
export declare function getFeatureFlagString(name: string, identifier?: string): Promise<string | undefined>;
/**
 * Easy way to enable a ui5 app to read tenant aware feature flags.
 * @returns An express router.
 *          default route will list all features
 *          '/:feature-name' will evaluate one feature
 */
export declare function featureFlagRouter(): import("express-serve-static-core").Router;
