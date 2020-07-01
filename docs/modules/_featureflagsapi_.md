[sap-cf-features](../README.md) › [Globals](../globals.md) › ["FeatureFlagsApi"](_featureflagsapi_.md)

# Module: "FeatureFlagsApi"

## Index

### Functions

* [batchEvaluate](_featureflagsapi_.md#batchevaluate)
* [exportFlags](_featureflagsapi_.md#exportflags)
* [getAllFlagNames](_featureflagsapi_.md#getallflagnames)
* [getService](_featureflagsapi_.md#getservice)

## Functions

###  batchEvaluate

▸ **batchEvaluate**(`names`: string[], `identifier?`: undefined | string): *Promise‹object›*

*Defined in [FeatureFlagsApi.ts:42](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/FeatureFlagsApi.ts#L42)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`names` | string[] | String table with all names of the feature flags to evaluate |
`identifier?` | undefined &#124; string | To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy. |

**Returns:** *Promise‹object›*

Key value pair of all requested feature flags.

___

###  exportFlags

▸ **exportFlags**(): *Promise‹object›*

*Defined in [FeatureFlagsApi.ts:21](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/FeatureFlagsApi.ts#L21)*

**Returns:** *Promise‹object›*

Definition of all flags (enabled and disabled) in the system

___

###  getAllFlagNames

▸ **getAllFlagNames**(): *Promise‹string[]›*

*Defined in [FeatureFlagsApi.ts:8](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/FeatureFlagsApi.ts#L8)*

**Returns:** *Promise‹string[]›*

Table with the names of all enabled feature flags.

___

###  getService

▸ **getService**(): *[IFeatureService](_types_index_.md#ifeatureservice)*

*Defined in [FeatureFlagsApi.ts:83](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/FeatureFlagsApi.ts#L83)*

get the feature service configuration

**Returns:** *[IFeatureService](_types_index_.md#ifeatureservice)*

connection parameters for the feature flag API
