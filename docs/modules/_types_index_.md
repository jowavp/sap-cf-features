[sap-cf-features](../README.md) › [Globals](../globals.md) › ["types/index"](_types_index_.md)

# Module: "types/index"

## Index

### Type aliases

* [IDirectShipment](_types_index_.md#idirectshipment)
* [IFeatureFlag](_types_index_.md#ifeatureflag)
* [IFeatureFlagConfiguration](_types_index_.md#ifeatureflagconfiguration)
* [IFeatureFlagExport](_types_index_.md#ifeatureflagexport)
* [IFeatureFlagMap](_types_index_.md#ifeatureflagmap)
* [IFeatureService](_types_index_.md#ifeatureservice)
* [IReturnFlag](_types_index_.md#ireturnflag)
* [IWeightedChoice](_types_index_.md#iweightedchoice)

## Type aliases

###  IDirectShipment

Ƭ **IDirectShipment**: *object*

*Defined in [types/index.ts:32](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/types/index.ts#L32)*

#### Type declaration:

* **id**: *number*

* **receivers**: *string[]*

* **variationIndex**: *number*

___

###  IFeatureFlag

Ƭ **IFeatureFlag**: *object*

*Defined in [types/index.ts:14](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/types/index.ts#L14)*

#### Type declaration:

* **httpStatus**: *number*

* **type**: *"BOOLEAN" | "STRING"*

* **variation**: *string*

___

###  IFeatureFlagConfiguration

Ƭ **IFeatureFlagConfiguration**: *object*

*Defined in [types/index.ts:20](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/types/index.ts#L20)*

#### Type declaration:

* **defaultVariationIndex**: *number*

* **description**: *string*

* **directShipments**: *[IDirectShipment](_types_index_.md#idirectshipment)[]*

* **enabled**: *boolean*

* **id**: *string*

* **offVariationIndex**: *number*

* **variationType**: *"BOOLEAN" | "STRING"*

* **variations**: *string[]*

* **weightedChoices**: *[IWeightedChoice](_types_index_.md#iweightedchoice)[]*

___

###  IFeatureFlagExport

Ƭ **IFeatureFlagExport**: *object*

*Defined in [types/index.ts:43](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/types/index.ts#L43)*

#### Type declaration:

* **flags**: *[IFeatureFlagConfiguration](_types_index_.md#ifeatureflagconfiguration)[]*

* **overrideStatus**: *boolean*

___

###  IFeatureFlagMap

Ƭ **IFeatureFlagMap**: *object*

*Defined in [types/index.ts:8](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/types/index.ts#L8)*

#### Type declaration:

* \[ **flagKey**: *string*\]: object

* \[ **tenant**: *string*\]: [IFeatureFlag](_types_index_.md#ifeatureflag)

___

###  IFeatureService

Ƭ **IFeatureService**: *object*

*Defined in [types/index.ts:2](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/types/index.ts#L2)*

#### Type declaration:

* **password**: *string*

* **uri**: *string*

* **username**: *string*

___

###  IReturnFlag

Ƭ **IReturnFlag**: *object*

*Defined in [types/index.ts:48](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/types/index.ts#L48)*

#### Type declaration:

* \[ **flagName**: *string*\]: boolean | string

___

###  IWeightedChoice

Ƭ **IWeightedChoice**: *object*

*Defined in [types/index.ts:38](https://github.com/jowavp/sap-cf-features/blob/1547a1c/src/types/index.ts#L38)*

#### Type declaration:

* **variationIndex**: *number*

* **weight**: *number*
