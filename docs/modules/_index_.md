[sap-cf-features](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### References

* [IFeatureFlagExport](_index_.md#ifeatureflagexport)
* [IFeatureFlagMap](_index_.md#ifeatureflagmap)
* [IFeatureService](_index_.md#ifeatureservice)
* [IReturnFlag](_index_.md#ireturnflag)

### Functions

* [featureFlagRouter](_index_.md#featureflagrouter)
* [getDomain](_index_.md#getdomain)
* [getFeatureFlag](_index_.md#getfeatureflag)
* [getFeatureFlagBoolean](_index_.md#getfeatureflagboolean)
* [getFeatureFlagString](_index_.md#getfeatureflagstring)
* [getFeatureFlags](_index_.md#getfeatureflags)

## References

###  IFeatureFlagExport

• **IFeatureFlagExport**:

___

###  IFeatureFlagMap

• **IFeatureFlagMap**:

___

###  IFeatureService

• **IFeatureService**:

___

###  IReturnFlag

• **IReturnFlag**:

## Functions

###  featureFlagRouter

▸ **featureFlagRouter**(`identifierFn`: function, `forConnect`: boolean): *Router‹›*

*Defined in [index.ts:84](https://github.com/jowavp/sap-cf-features/blob/ce24c53/src/index.ts#L84)*

Easy way to enable a ui5 app to read tenant aware feature flags.

**Parameters:**

▪`Default value`  **identifierFn**: *function*= getDomain

▸ (`Request`: any): *string*

**Parameters:**

Name | Type |
------ | ------ |
`Request` | any |

▪`Default value`  **forConnect**: *boolean*= false

**Returns:** *Router‹›*

An express router.
         default route will list all features
         '/:feature-name' will evaluate one feature

___

###  getDomain

▸ **getDomain**(`req`: any): *any*

*Defined in [index.ts:72](https://github.com/jowavp/sap-cf-features/blob/ce24c53/src/index.ts#L72)*

Default function to determine identifier.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`req` | any |   |

**Returns:** *any*

___

###  getFeatureFlag

▸ **getFeatureFlag**(`name`: string, `identifier?`: undefined | string): *Promise‹string | false | true›*

*Defined in [index.ts:24](https://github.com/jowavp/sap-cf-features/blob/ce24c53/src/index.ts#L24)*

get a feature flag value for a certain identifier (e.g. tenant)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | - |
`identifier?` | undefined &#124; string | To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy. |

**Returns:** *Promise‹string | false | true›*

The value of the requested feature flags

___

###  getFeatureFlagBoolean

▸ **getFeatureFlagBoolean**(`name`: string, `identifier?`: undefined | string): *Promise‹undefined | false | true›*

*Defined in [index.ts:38](https://github.com/jowavp/sap-cf-features/blob/ce24c53/src/index.ts#L38)*

get a feature flag value for a certain identifier (e.g. tenant)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | Name of the feature flag to evaluate |
`identifier?` | undefined &#124; string | To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy. |

**Returns:** *Promise‹undefined | false | true›*

The boolean value of the requested feature flag

___

###  getFeatureFlagString

▸ **getFeatureFlagString**(`name`: string, `identifier?`: undefined | string): *Promise‹undefined | string›*

*Defined in [index.ts:56](https://github.com/jowavp/sap-cf-features/blob/ce24c53/src/index.ts#L56)*

get a feature flag value for a certain identifier (e.g. tenant)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`name` | string | - |
`identifier?` | undefined &#124; string | To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy. |

**Returns:** *Promise‹undefined | string›*

The string of the requested feature flag

___

###  getFeatureFlags

▸ **getFeatureFlags**(`names?`: string | string[], `identifier?`: undefined | string): *Promise‹object›*

*Defined in [index.ts:13](https://github.com/jowavp/sap-cf-features/blob/ce24c53/src/index.ts#L13)*

get a list of feature flags for a certain identifier (e.g. tenant)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`names?` | string &#124; string[] | String table with all names of the feature flags to evaluate |
`identifier?` | undefined &#124; string | To make it tenant aware, you can give the name of the tenant here. You can enable features for certain tenants with the direct delivery strategy. |

**Returns:** *Promise‹object›*

Key value pair of all requested feature flags
