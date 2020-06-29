export declare type IFeatureService = {
    "password": string;
    "uri": string;
    "username": string;
};
export declare type IFeatureFlagMap = {
    [flagKey: string]: {
        [tenant: string]: IFeatureFlag;
    };
};
export declare type IFeatureFlag = {
    httpStatus: number;
    type: "BOOLEAN" | "STRING";
    variation: string;
};
export declare type IFeatureFlagConfiguration = {
    id: string;
    description: string;
    directShipments: IDirectShipment[];
    weightedChoices: IWeightedChoice[];
    variations: string[];
    offVariationIndex: number;
    variationType: "BOOLEAN" | "STRING";
    defaultVariationIndex: number;
    enabled: boolean;
};
export declare type IDirectShipment = {
    id: number;
    variationIndex: number;
    receivers: string[];
};
export declare type IWeightedChoice = {
    variationIndex: number;
    weight: number;
};
export declare type IFeatureFlagExport = {
    overrideStatus: boolean;
    flags: IFeatureFlagConfiguration[];
};
export declare type IReturnFlag = {
    [flagName: string]: boolean | string;
};
