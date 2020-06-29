import * as xsenv from '@sap/xsenv';
import axios from 'axios';
import { IFeatureFlagExport, IFeatureFlagMap, IReturnFlag, IFeatureService } from './types';


export async function getAllFlagNames() {
    const allFlags = await exportFlags();
    return allFlags.flags
        // remove the filter here, because there is something wrong with boolean features
        // boolean features that are active are always true. they should only be true when the feature is released no?
        // .filter( (flag) => flag.enabled )
        .map( (flag) => flag.id );
}

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

export async function batchEvaluate(names: string[], tenant: string) {

    if(names.length === 0) {
        return {};
    }

    const service = getService();
    const url = `/api/v2/evaluateset?${names.map(getFlags).join('&')}&identifier=${tenant || ""}`;

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
            if (value.httpStatus !== 404) {
                acc[flagName] = value.type === "BOOLEAN" ? value.variation === "true" : value.variation;
            }
            return acc;
        },
        {}
    )
}

function getFlags (name) {
    return `flag=${name}`
}

// get the feature service configuration
function getService(): IFeatureService {
    const { featureFlags } = xsenv.getServices({
        featureFlags: {
            tag: 'feature-flags'
        }
    });

    if (!featureFlags) {
        throw ('No feature-flags service available');
    }

    return featureFlags;
}