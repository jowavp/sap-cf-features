"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xsenv = __importStar(require("@sap/xsenv"));
const axios_1 = __importDefault(require("axios"));
/**
 * @returns      Table with the names of all enabled feature flags.
 */
function getAllFlagNames() {
    return __awaiter(this, void 0, void 0, function* () {
        const allFlags = yield exportFlags();
        return allFlags.flags
            // hmmm, there is something wrong with boolean features on SAP side
            // boolean features that are active are always default true if they don't have a strategy. 
            // they should have a default value just as the string values
            .filter((flag) => flag.enabled)
            .map((flag) => flag.id);
    });
}
exports.getAllFlagNames = getAllFlagNames;
/**
 * @returns     Definition of all flags (enabled and disabled) in the system
 */
function exportFlags() {
    return __awaiter(this, void 0, void 0, function* () {
        const service = getService();
        const url = "/api/v1/features/export";
        return (yield axios_1.default.get(url, {
            url,
            method: 'get',
            baseURL: service.uri,
            auth: {
                username: service.username,
                password: service.password
            }
        })).data;
    });
}
/**
 *
 * @param names     String table with all names of the feature flags to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns     Key value pair of all requested feature flags.
 */
function batchEvaluate(names, identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        if (names.length === 0) {
            return {};
        }
        const service = getService();
        const url = `/api/v2/evaluateset?${names.map((name) => `flag=${name}`).join('&')}` + identifier ? `&identifier=${identifier || ""}` : ``;
        const response = yield axios_1.default.get(url, {
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
        return Object.entries(response.data).reduce((acc, [flagName, tenant]) => {
            const value = Object.values(tenant)[0];
            if (value.httpStatus !== 404) {
                acc[flagName] = value.type === "BOOLEAN" ? value.variation === "true" : value.variation;
            }
            return acc;
        }, {});
    });
}
exports.batchEvaluate = batchEvaluate;
/**
 * get the feature service configuration
 * @returns connection parameters for the feature flag API
 */
function getService() {
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
