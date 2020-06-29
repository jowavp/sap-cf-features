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
function getFeatureFlags(names, tenant) {
    return __awaiter(this, void 0, void 0, function* () {
        const flagNames = names ? typeof names === 'string' ? [names] : names : yield FeatureFlagsApi_1.getAllFlagNames();
        return FeatureFlagsApi_1.batchEvaluate(flagNames, tenant);
    });
}
exports.getFeatureFlags = getFeatureFlags;
function getFeatureFlag(name, tenant) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield FeatureFlagsApi_1.batchEvaluate([name], tenant);
        return result[name];
    });
}
exports.getFeatureFlag = getFeatureFlag;
function getFeatureFlagBoolean(name, tenant) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield getFeatureFlag(name, tenant);
        if (typeof result === "boolean") {
            return result;
        }
        console.warn(`Feature flag ${name} is not of type 'BOOLEAN'`);
        return undefined;
    });
}
exports.getFeatureFlagBoolean = getFeatureFlagBoolean;
function getFeatureFlagString(name, tenant) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield getFeatureFlag(name, tenant);
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
function featureFlagRouter() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.featureFlagRouter = featureFlagRouter;
