
export type IFeatureService = {
    "password": string,
    "uri": string,
    "username": string
};

export type IFeatureFlagMap = {
    [flagKey: string]: {
        [tenant: string] : IFeatureFlag
    }
};

export type IFeatureFlag = {
    httpStatus: number,
    type: "BOOLEAN" | "STRING",
    variation: string
}

export type IFeatureFlagConfiguration =  {
    id: string,
    description: string,
    directShipments:IDirectShipment[],
    weightedChoices: IWeightedChoice[],
    variations: string[],
    offVariationIndex: number,
    variationType: "BOOLEAN" | "STRING",
    defaultVariationIndex: number,
    enabled: boolean
 };

 export type IDirectShipment = {
    id:number,
    variationIndex: number,
    receivers: string[]
 };

 export type IWeightedChoice = {
    variationIndex: number,
    weight: number
 };

 export type IFeatureFlagExport = {
    overrideStatus : boolean,
    flags:IFeatureFlagConfiguration[]
};

export type IReturnFlag = {
    [flagName: string]: boolean | string
}
