
import {Router} from 'express';
import { batchEvaluate, getAllFlagNames }from './FeatureFlagsApi';

export { IFeatureFlagExport, IFeatureFlagMap, IReturnFlag, IFeatureService } from './types';


export async function getFeatureFlags(names: string | string[] | undefined, tenant: string) {
    const flagNames = names ? typeof names === 'string' ? [names]: names : await getAllFlagNames(); 
    return batchEvaluate( flagNames, tenant);
}

export async function getFeatureFlag(name: string, tenant: string) {
    const result = await batchEvaluate( [name], tenant);
    return result[name];
}

export async function getFeatureFlagBoolean(name: string, tenant: string) {
    const result = await getFeatureFlag(name, tenant);
    if(typeof result === "boolean"){
        return result
    }
    console.warn(`Feature flag ${name} is not of type 'BOOLEAN'`);
    return undefined;
}

export async function getFeatureFlagString(name: string, tenant: string) {
    const result = await getFeatureFlag(name, tenant);
    if(typeof result === "string"){
        return result
    }
    console.warn(`Feature flag ${name} is not of type 'STRING'`);
    if(typeof result === "boolean"){
        return result ? "true" : "false";
    }
    return undefined;
}

export function featureFlagRouter () {
    const router = Router();

    function getDomain(req: any) {
        return req.authInfo ? req.authInfo.subdomain : "";
    }

    router.get( '/:flagName', async (req, res, next) => {
        //@ts-ignore
        const {flagName} = req.params;
        const result = await getFeatureFlags(flagName, getDomain(req))
        res.status(200).json(result);
        next();
    });

    router.get( '/', async (req, res, next) => {
        // get all feature-flags
        const flagNames = await getAllFlagNames();
        const result = await getFeatureFlags(flagNames, getDomain(req))
        res.status(200).json(result);
        next();
    })

    return router;
}
