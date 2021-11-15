import * as xsenv from '@sap/xsenv';
import axios from 'axios';
import { IFeatureFlagExport, IFeatureFlagMap, IReturnFlag, IFeatureService } from './types';

/**
 * @returns      Table with the names of all enabled feature flags.
 */
export async function getAllFlagNames() {
    const allFlags = await exportFlags();
    return allFlags.flags
        // hmmm, there is something wrong with boolean features on SAP side
        // boolean features that are active are always default true if they don't have a strategy. 
        // they should have a default value just as the string values
        .filter( (flag) => flag.enabled )
        .map( (flag) => flag.id );
}

/**
 * @returns     Definition of all flags (enabled and disabled) in the system
 */
async function exportFlags() {
    const service = getService();
    const url = "/api/v1/features/export";

    return (await axios.get<IFeatureFlagExport>(url, {
        url,
        method: 'get',
        baseURL: service.uri,
        auth: {
            username: service.username,
            password: service.password
        }
    })).data;
}

/**
 * 
 * @param names     String table with all names of the feature flags to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns     Key value pair of all requested feature flags. 
 */
export async function batchEvaluate(names: string[], identifier?: string) {

    if(names.length === 0) {
        return {};
    }

    const service = getService();
    const identifierUrl = identifier ? `&identifier=${identifier || ""}` : ``;
    const url = `/api/v2/evaluateset?${names.map((name) => `flag=${name}`).join('&')}${identifierUrl}`

    const response = await axios.get<IFeatureFlagMap>(url, {
        url,
        method: 'get',
        baseURL: service.uri,
        auth: {
            username: service.username,
            password: service.password
        },
        validateStatus: function (status) {
            return true; //batch call resolves all statuses. 
        },
    });

    return Object.entries(response.data).reduce<IReturnFlag>(
        ( acc, [flagName, tenant] ) => {
            const value = Object.values(tenant)[0];
            if (value && value.httpStatus !== 404) {
                acc[flagName] = value.type === "BOOLEAN" ? value.variation === "true" : value.variation;
            } else {
                console.error(`Cannot read values for ${flagName}: ${tenant}`);
            }
            return acc;
        },
        {}
    )
}

/**
 * get the feature service configuration
 * @returns connection parameters for the feature flag API
 */
function getService(): IFeatureService {
    const { featureFlags } = xsenv.getServices({
        "feature-flags": {
            tag: 'feature-flags'
        }
    });

    if (!featureFlags) {
        throw ('No feature-flags service available');
    }

    return featureFlags;
}
