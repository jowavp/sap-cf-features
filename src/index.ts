
import {Router, Response, Request, NextFunction} from 'express';
import { batchEvaluate, getAllFlagNames }from './FeatureFlagsApi';

export { IFeatureFlagExport, IFeatureFlagMap, IReturnFlag, IFeatureService } from './types';

/**
 * get a list of feature flags for a certain identifier (e.g. tenant)
 * @param names     String table with all names of the feature flags to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  Key value pair of all requested feature flags
 */
export async function getFeatureFlags(names?: string | string[], identifier?: string) {
    const flagNames = names ? typeof names === 'string' ? [names]: names : await getAllFlagNames(); 
    return batchEvaluate( flagNames, identifier);
}

/**
 * get a feature flag value for a certain identifier (e.g. tenant)
 * @param names     String table with all names of the feature flags to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  The value of the requested feature flags
 */
export async function getFeatureFlag(name: string, identifier?: string) {
    if(!name) {
        throw 'Please specify a name for the feature you are looking for.';
    }
    const result = await batchEvaluate( [name], identifier);
    return result[name];
}

/**
 * get a feature flag value for a certain identifier (e.g. tenant)
 * @param name     Name of the feature flag to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  The boolean value of the requested feature flag
 */
export async function getFeatureFlagBoolean(name: string, identifier?: string) {
    const result = await getFeatureFlag(name, identifier);
    if(typeof result === "boolean"){
        return result
    }
    console.warn(`Feature flag ${name} is not of type 'BOOLEAN'`);
    if(typeof result === "string"){
        return result === "true";
    }
    return undefined;
}

/**
 * get a feature flag value for a certain identifier (e.g. tenant)
 * @param names     Name of the feature flag to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  The string of the requested feature flag
 */
export async function getFeatureFlagString(name: string, identifier?: string) {
    const result = await getFeatureFlag(name, identifier);
    if(typeof result === "string"){
        return result
    }
    console.warn(`Feature flag ${name} is not of type 'STRING'`);
    if(typeof result === "boolean"){
        return result ? "true" : "false";
    }
    return undefined;
}

/**
 * Default function to determine identifier.
 * @param req 
 */
function getDomain(req: any) {
    // when using passport req.authInfo will contain tenant info.
    // when using the approuter, req.user.tenant is containing the tenant id.
    return req.authInfo ? req.authInfo.subdomain : req.user ? req.user.tenant : "";
}

/**
 * Easy way to enable a ui5 app to read tenant aware feature flags.
 * @returns An express router. 
 *          default route will list all features
 *          '/:feature-name' will evaluate one feature
 */

export function featureFlagRouter (identifierFn: (Request) => string = getDomain, forConnect: boolean = false) {
    const router = Router();
    
    function respond(res: Response, next: NextFunction, result: any, status: number = 200 ) {
        if(forConnect){
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(result));
        } else {
            res.status(200).json(result);
            next();
        }
    }

    router.use(function checkAuth(req, res, next) {
        //@ts-ignore
        if(!req.authInfo && !req.user) {
            res.statusCode = 401;
            res.end('Unauthorized');
        }
        next();
    })

    router.get( '/:flagName', async (req, res, next) => {
        //@ts-ignore
        const {flagName} = req.params;
        const result = await getFeatureFlags(flagName, identifierFn(req))
        respond(res, next, result);
    });

    router.get( '/', async (req, res, next) => {
        // get all feature-flags
        const flagNames = await getAllFlagNames();
        const result = await getFeatureFlags(flagNames, identifierFn(req))
        respond(res, next, result);
    })

    return router;
}


