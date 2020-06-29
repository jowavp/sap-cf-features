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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FeatureFlagsApi_1 = require("./FeatureFlagsApi");
/**
 * get a list of feature flags for a certain identifier (e.g. tenant)
 * @param names     String table with all names of the feature flags to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  Key value pair of all requested feature flags
 */
function getFeatureFlags(names, identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        const flagNames = names ? typeof names === 'string' ? [names] : names : yield FeatureFlagsApi_1.getAllFlagNames();
        return FeatureFlagsApi_1.batchEvaluate(flagNames, identifier);
    });
}
exports.getFeatureFlags = getFeatureFlags;
/**
 * get a feature flag value for a certain identifier (e.g. tenant)
 * @param names     String table with all names of the feature flags to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  The value of the requested feature flags
 */
function getFeatureFlag(name, identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!name) {
            throw 'Please specify a name for the feature you are looking for.';
        }
        const result = yield FeatureFlagsApi_1.batchEvaluate([name], identifier);
        return result[name];
    });
}
exports.getFeatureFlag = getFeatureFlag;
/**
 * get a feature flag value for a certain identifier (e.g. tenant)
 * @param name     Name of the feature flag to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  The boolean value of the requested feature flag
 */
function getFeatureFlagBoolean(name, identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield getFeatureFlag(name, identifier);
        if (typeof result === "boolean") {
            return result;
        }
        console.warn(`Feature flag ${name} is not of type 'BOOLEAN'`);
        return undefined;
    });
}
exports.getFeatureFlagBoolean = getFeatureFlagBoolean;
/**
 * get a feature flag value for a certain identifier (e.g. tenant)
 * @param names     Name of the feature flag to evaluate
 * @param identifier To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy.
 * @returns  The string of the requested feature flag
 */
function getFeatureFlagString(name, identifier) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield getFeatureFlag(name, identifier);
        if (typeof result === "string") {
            return result;
        }
        console.warn(`Feature flag ${name} is not of type 'STRING'`);
        if (typeof result === "boolean") {
            return result ? "true" : "false";
        }
        return undefined;
    });
}
exports.getFeatureFlagString = getFeatureFlagString;
/**
 * Easy way to enable a ui5 app to read tenant aware feature flags.
 * @returns An express router.
 *          default route will list all features
 *          '/:feature-name' will evaluate one feature
 */
function featureFlagRouter() {
    const router = express_1.Router();
    function getDomain(req) {
        return req.authInfo ? req.authInfo.subdomain : "";
    }
    router.get('/:flagName', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        const { flagName } = req.params;
        const result = yield getFeatureFlags(flagName, getDomain(req));
        res.status(200).json(result);
        next();
    }));
    router.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        // get all feature-flags
        const flagNames = yield FeatureFlagsApi_1.getAllFlagNames();
        const result = yield getFeatureFlags(flagNames, getDomain(req));
        res.status(200).json(result);
        next();
    }));
    return router;
}
exports.featureFlagRouter = featureFlagRouter;
