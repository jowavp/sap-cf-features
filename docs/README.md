[sap-cf-features](README.md) › [Globals](globals.md)

# sap-cf-features

# sap-cf-features
NodeJS Library to read the features of the feature-flag-service on SAP Cloud Foundry.

## Installation
using npm:

```bash
$ npm i sap-cf-features
```

## Example

You can follow this blog post to get an example application on your trial account.
https://blogs.sap.com/2020/07/01/library-for-feature-flags-in-nodejs-on-cloud-foundry/

### Read a feature-flag 

```js
    const {getFeatureFlags, getFeatureFlag, getFeatureFlagBoolean, getFeatureFlagString} = require('sap-cf-features');

    // get all feature flags
    const featureFlags = await getFeatureFlags(undefined, "tenantName");
    // get some feature flags
    const featureFlags = await getFeatureFlags(["feature-1", "feature-2"], "tenantName");
    // get one feature flag value
    const featureFlagValue = await getFeatureFlag("feature-1", "tenantName");
    const featureFlagValueBoolean = await getFeatureFlagBoolean("feature-1", "tenantName");
    const featureFlagValueString = await getFeatureFlagString("feature-2", "tenantName");
    
```

### add the feature flag to your nodejs express app 

```js
    const {featureFlagRouter} = require('sap-cf-features');

    /**
     *  function to identify the identifier.
     *  @param req Request object
     *  @returns the identifier (string)
     */

    const identifierFn = (req) => req.authInfo.subdomain;

    app.use("/feature-flags", featureFlagRouter(identifierFn));

```
