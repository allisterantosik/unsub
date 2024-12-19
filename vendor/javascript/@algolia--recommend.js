// @algolia/recommend@5.17.0 downloaded from https://ga.jspm.io/npm:@algolia/recommend@5.17.0/dist/builds/browser.js

import{createXhrRequester as e}from"@algolia/requester-browser-xhr";import{shuffle as r,createAuth as t,createTransporter as a,getAlgoliaAgent as o,createNullLogger as n,createMemoryCache as s,createFallbackableCache as c,createBrowserLocalStorageCache as m}from"@algolia/client-common";var i="5.17.0";function getDefaultHosts(e){return[{url:`${e}-dsn.algolia.net`,accept:"read",protocol:"https"},{url:`${e}.algolia.net`,accept:"write",protocol:"https"}].concat(r([{url:`${e}-1.algolianet.com`,accept:"readWrite",protocol:"https"},{url:`${e}-2.algolianet.com`,accept:"readWrite",protocol:"https"},{url:`${e}-3.algolianet.com`,accept:"readWrite",protocol:"https"}]))}function createRecommendClient({appId:e,apiKey:r,authMode:n,algoliaAgents:s,...c}){const m=t(e,r,n);const d=a({hosts:getDefaultHosts(e),...c,algoliaAgent:o({algoliaAgents:s,client:"Recommend",version:i}),baseHeaders:{"content-type":"text/plain",...m.headers(),...c.baseHeaders},baseQueryParameters:{...m.queryParameters(),...c.baseQueryParameters}});return{transporter:d,appId:e,clearCache(){return Promise.all([d.requestsCache.clear(),d.responsesCache.clear()]).then((()=>{}))},get _ua(){return d.algoliaAgent.value},
/**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
addAlgoliaAgent(e,r){d.algoliaAgent.add({segment:e,version:r})},
/**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
setClientApiKey({apiKey:e}){n&&n!=="WithinHeaders"?d.baseQueryParameters["x-algolia-api-key"]=e:d.baseHeaders["x-algolia-api-key"]=e},
/**
     * Create or update a batch of Recommend Rules  Each Recommend Rule is created or updated, depending on whether a Recommend Rule with the same `objectID` already exists. You may also specify `true` for `clearExistingRules`, in which case the batch will atomically replace all the existing Recommend Rules.  Recommend Rules are similar to Search Rules, except that the conditions and consequences apply to a [source item](/doc/guides/algolia-recommend/overview/#recommend-models) instead of a query. The main differences are the following: - Conditions `pattern` and `anchoring` are unavailable. - Condition `filters` triggers if the source item matches the specified filters. - Condition `filters` accepts numeric filters. - Consequence `params` only covers filtering parameters. - Consequence `automaticFacetFilters` doesn\'t require a facet value placeholder (it tries to match the data source item\'s attributes instead).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param batchRecommendRules - The batchRecommendRules object.
     * @param batchRecommendRules.indexName - Name of the index on which to perform the operation.
     * @param batchRecommendRules.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param batchRecommendRules.recommendRule - The recommendRule object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
batchRecommendRules({indexName:e,model:r,recommendRule:t},a){if(!e)throw new Error("Parameter `indexName` is required when calling `batchRecommendRules`.");if(!r)throw new Error("Parameter `model` is required when calling `batchRecommendRules`.");const o="/1/indexes/{indexName}/{model}/recommend/rules/batch".replace("{indexName}",encodeURIComponent(e)).replace("{model}",encodeURIComponent(r));const n={};const s={};const c={method:"POST",path:o,queryParameters:s,headers:n,data:t||{}};return d.request(c,a)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customDelete({path:e,parameters:r},t){if(!e)throw new Error("Parameter `path` is required when calling `customDelete`.");const a="/{path}".replace("{path}",e);const o={};const n=r||{};const s={method:"DELETE",path:a,queryParameters:n,headers:o};return d.request(s,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customGet({path:e,parameters:r},t){if(!e)throw new Error("Parameter `path` is required when calling `customGet`.");const a="/{path}".replace("{path}",e);const o={};const n=r||{};const s={method:"GET",path:a,queryParameters:n,headers:o};return d.request(s,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPost({path:e,parameters:r,body:t},a){if(!e)throw new Error("Parameter `path` is required when calling `customPost`.");const o="/{path}".replace("{path}",e);const n={};const s=r||{};const c={method:"POST",path:o,queryParameters:s,headers:n,data:t||{}};return d.request(c,a)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPut({path:e,parameters:r,body:t},a){if(!e)throw new Error("Parameter `path` is required when calling `customPut`.");const o="/{path}".replace("{path}",e);const n={};const s=r||{};const c={method:"PUT",path:o,queryParameters:s,headers:n,data:t||{}};return d.request(c,a)},
/**
     * Deletes a Recommend rule from a recommendation scenario.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteRecommendRule - The deleteRecommendRule object.
     * @param deleteRecommendRule.indexName - Name of the index on which to perform the operation.
     * @param deleteRecommendRule.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param deleteRecommendRule.objectID - Unique record identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteRecommendRule({indexName:e,model:r,objectID:t},a){if(!e)throw new Error("Parameter `indexName` is required when calling `deleteRecommendRule`.");if(!r)throw new Error("Parameter `model` is required when calling `deleteRecommendRule`.");if(!t)throw new Error("Parameter `objectID` is required when calling `deleteRecommendRule`.");const o="/1/indexes/{indexName}/{model}/recommend/rules/{objectID}".replace("{indexName}",encodeURIComponent(e)).replace("{model}",encodeURIComponent(r)).replace("{objectID}",encodeURIComponent(t));const n={};const s={};const c={method:"DELETE",path:o,queryParameters:s,headers:n};return d.request(c,a)},
/**
     * Retrieves a Recommend rule that you previously created in the Algolia dashboard.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getRecommendRule - The getRecommendRule object.
     * @param getRecommendRule.indexName - Name of the index on which to perform the operation.
     * @param getRecommendRule.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param getRecommendRule.objectID - Unique record identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getRecommendRule({indexName:e,model:r,objectID:t},a){if(!e)throw new Error("Parameter `indexName` is required when calling `getRecommendRule`.");if(!r)throw new Error("Parameter `model` is required when calling `getRecommendRule`.");if(!t)throw new Error("Parameter `objectID` is required when calling `getRecommendRule`.");const o="/1/indexes/{indexName}/{model}/recommend/rules/{objectID}".replace("{indexName}",encodeURIComponent(e)).replace("{model}",encodeURIComponent(r)).replace("{objectID}",encodeURIComponent(t));const n={};const s={};const c={method:"GET",path:o,queryParameters:s,headers:n};return d.request(c,a)},
/**
     * Checks the status of a given task.  Deleting a Recommend rule is asynchronous. When you delete a rule, a task is created on a queue and completed depending on the load on the server. The API response includes a task ID that you can use to check the status.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param getRecommendStatus - The getRecommendStatus object.
     * @param getRecommendStatus.indexName - Name of the index on which to perform the operation.
     * @param getRecommendStatus.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param getRecommendStatus.taskID - Unique task identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getRecommendStatus({indexName:e,model:r,taskID:t},a){if(!e)throw new Error("Parameter `indexName` is required when calling `getRecommendStatus`.");if(!r)throw new Error("Parameter `model` is required when calling `getRecommendStatus`.");if(!t)throw new Error("Parameter `taskID` is required when calling `getRecommendStatus`.");const o="/1/indexes/{indexName}/{model}/task/{taskID}".replace("{indexName}",encodeURIComponent(e)).replace("{model}",encodeURIComponent(r)).replace("{taskID}",encodeURIComponent(t));const n={};const s={};const c={method:"GET",path:o,queryParameters:s,headers:n};return d.request(c,a)},
/**
     * Retrieves recommendations from selected AI models.
     *
     * Required API Key ACLs:
     *  - search
     * @param getRecommendationsParams - The getRecommendationsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getRecommendations(e,r){if(e&&Array.isArray(e)){const r={requests:e};e=r}if(!e)throw new Error("Parameter `getRecommendationsParams` is required when calling `getRecommendations`.");if(!e.requests)throw new Error("Parameter `getRecommendationsParams.requests` is required when calling `getRecommendations`.");const t="/1/indexes/*/recommendations";const a={};const o={};const n={method:"POST",path:t,queryParameters:o,headers:a,data:e,useReadTransporter:true,cacheable:true};return d.request(n,r)},
/**
     * Searches for Recommend rules.  Use an empty query to list all rules for this recommendation scenario.
     *
     * Required API Key ACLs:
     *  - settings
     * @param searchRecommendRules - The searchRecommendRules object.
     * @param searchRecommendRules.indexName - Name of the index on which to perform the operation.
     * @param searchRecommendRules.model - [Recommend model](https://www.algolia.com/doc/guides/algolia-recommend/overview/#recommend-models).
     * @param searchRecommendRules.searchRecommendRulesParams - The searchRecommendRulesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchRecommendRules({indexName:e,model:r,searchRecommendRulesParams:t},a){if(!e)throw new Error("Parameter `indexName` is required when calling `searchRecommendRules`.");if(!r)throw new Error("Parameter `model` is required when calling `searchRecommendRules`.");const o="/1/indexes/{indexName}/{model}/recommend/rules/search".replace("{indexName}",encodeURIComponent(e)).replace("{model}",encodeURIComponent(r));const n={};const s={};const c={method:"POST",path:o,queryParameters:s,headers:n,data:t||{},useReadTransporter:true,cacheable:true};return d.request(c,a)}}}function recommendClient(r,t,a){if(!r||typeof r!=="string")throw new Error("`appId` is missing.");if(!t||typeof t!=="string")throw new Error("`apiKey` is missing.");return createRecommendClient({appId:r,apiKey:t,timeouts:{connect:1e3,read:2e3,write:3e4},logger:n(),requester:e(),algoliaAgents:[{segment:"Browser"}],authMode:"WithinQueryParameters",responsesCache:s(),requestsCache:s({serializable:false}),hostsCache:c({caches:[m({key:`${i}-${r}`}),s()]}),...a})}export{i as apiClientVersion,recommendClient};

