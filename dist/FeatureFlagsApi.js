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
function getAllFlagNames() {
    return __awaiter(this, void 0, void 0, function* () {
        const allFlags = yield exportFlags();
        return allFlags.flags
            // remove the filter here, because there is something wrong with boolean features
            // boolean features that are active are always true. they should only be true when the feature is released no?
            // .filter( (flag) => flag.enabled )
            .map((flag) => flag.id);
    });
}
exports.getAllFlagNames = getAllFlagNames;
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
function batchEvaluate(names, tenant) {
    return __awaiter(this, void 0, void 0, function* () {
        if (names.length === 0) {
            return {};
        }
        const service = getService();
        const url = `/api/v2/evaluateset?${names.map(getFlags).join('&')}&identifier=${tenant || ""}`;
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
function getFlags(name) {
    return `flag=${name}`;
}
// get the feature service configuration
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
