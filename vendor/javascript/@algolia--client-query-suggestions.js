// @algolia/client-query-suggestions@5.17.0 downloaded from https://ga.jspm.io/npm:@algolia/client-query-suggestions@5.17.0/dist/builds/browser.js

import{createXhrRequester as e}from"@algolia/requester-browser-xhr";import{createAuth as r,createTransporter as t,getAlgoliaAgent as a,createNullLogger as n,createMemoryCache as o,createFallbackableCache as s,createBrowserLocalStorageCache as i}from"@algolia/client-common";var c="5.17.0";var u=["eu","us"];function getDefaultHosts(e){const r="query-suggestions.{region}.algolia.com".replace("{region}",e);return[{url:r,accept:"readWrite",protocol:"https"}]}function createQuerySuggestionsClient({appId:e,apiKey:n,authMode:o,algoliaAgents:s,region:i,...u}){const h=r(e,n,o);const d=t({hosts:getDefaultHosts(i),...u,algoliaAgent:a({algoliaAgents:s,client:"QuerySuggestions",version:c}),baseHeaders:{"content-type":"text/plain",...h.headers(),...u.baseHeaders},baseQueryParameters:{...h.queryParameters(),...u.baseQueryParameters}});return{transporter:d,appId:e,clearCache(){return Promise.all([d.requestsCache.clear(),d.responsesCache.clear()]).then((()=>{}))},get _ua(){return d.algoliaAgent.value},
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
setClientApiKey({apiKey:e}){o&&o!=="WithinHeaders"?d.baseQueryParameters["x-algolia-api-key"]=e:d.baseHeaders["x-algolia-api-key"]=e},
/**
     * Creates a new Query Suggestions configuration.  You can have up to 100 configurations per Algolia application.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param configurationWithIndex - The configurationWithIndex object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
createConfig(e,r){if(!e)throw new Error("Parameter `configurationWithIndex` is required when calling `createConfig`.");const t="/1/configs";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return d.request(o,r)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customDelete({path:e,parameters:r},t){if(!e)throw new Error("Parameter `path` is required when calling `customDelete`.");const a="/{path}".replace("{path}",e);const n={};const o=r||{};const s={method:"DELETE",path:a,queryParameters:o,headers:n};return d.request(s,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customGet({path:e,parameters:r},t){if(!e)throw new Error("Parameter `path` is required when calling `customGet`.");const a="/{path}".replace("{path}",e);const n={};const o=r||{};const s={method:"GET",path:a,queryParameters:o,headers:n};return d.request(s,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPost({path:e,parameters:r,body:t},a){if(!e)throw new Error("Parameter `path` is required when calling `customPost`.");const n="/{path}".replace("{path}",e);const o={};const s=r||{};const i={method:"POST",path:n,queryParameters:s,headers:o,data:t||{}};return d.request(i,a)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPut({path:e,parameters:r,body:t},a){if(!e)throw new Error("Parameter `path` is required when calling `customPut`.");const n="/{path}".replace("{path}",e);const o={};const s=r||{};const i={method:"PUT",path:n,queryParameters:s,headers:o,data:t||{}};return d.request(i,a)},
/**
     * Deletes a Query Suggestions configuration.  Deleting only removes the configuration and stops updates to the Query Suggestions index. To delete the Query Suggestions index itself, use the Search API and the `Delete an index` operation.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteConfig - The deleteConfig object.
     * @param deleteConfig.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteConfig({indexName:e},r){if(!e)throw new Error("Parameter `indexName` is required when calling `deleteConfig`.");const t="/1/configs/{indexName}".replace("{indexName}",encodeURIComponent(e));const a={};const n={};const o={method:"DELETE",path:t,queryParameters:n,headers:a};return d.request(o,r)},
/**
     * Retrieves all Query Suggestions configurations of your Algolia application.
     *
     * Required API Key ACLs:
     *  - settings
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getAllConfigs(e){const r="/1/configs";const t={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:t};return d.request(n,e)},
/**
     * Retrieves a single Query Suggestions configuration by its index name.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getConfig - The getConfig object.
     * @param getConfig.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getConfig({indexName:e},r){if(!e)throw new Error("Parameter `indexName` is required when calling `getConfig`.");const t="/1/configs/{indexName}".replace("{indexName}",encodeURIComponent(e));const a={};const n={};const o={method:"GET",path:t,queryParameters:n,headers:a};return d.request(o,r)},
/**
     * Reports the status of a Query Suggestions index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getConfigStatus - The getConfigStatus object.
     * @param getConfigStatus.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getConfigStatus({indexName:e},r){if(!e)throw new Error("Parameter `indexName` is required when calling `getConfigStatus`.");const t="/1/configs/{indexName}/status".replace("{indexName}",encodeURIComponent(e));const a={};const n={};const o={method:"GET",path:t,queryParameters:n,headers:a};return d.request(o,r)},
/**
     * Retrieves the logs for a single Query Suggestions index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param getLogFile - The getLogFile object.
     * @param getLogFile.indexName - Query Suggestions index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getLogFile({indexName:e},r){if(!e)throw new Error("Parameter `indexName` is required when calling `getLogFile`.");const t="/1/logs/{indexName}".replace("{indexName}",encodeURIComponent(e));const a={};const n={};const o={method:"GET",path:t,queryParameters:n,headers:a};return d.request(o,r)},
/**
     * Updates a QuerySuggestions configuration.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param updateConfig - The updateConfig object.
     * @param updateConfig.indexName - Query Suggestions index name.
     * @param updateConfig.configuration - The configuration object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
updateConfig({indexName:e,configuration:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `updateConfig`.");if(!r)throw new Error("Parameter `configuration` is required when calling `updateConfig`.");if(!r.sourceIndices)throw new Error("Parameter `configuration.sourceIndices` is required when calling `updateConfig`.");const a="/1/configs/{indexName}".replace("{indexName}",encodeURIComponent(e));const n={};const o={};const s={method:"PUT",path:a,queryParameters:o,headers:n,data:r};return d.request(s,t)}}}function querySuggestionsClient(r,t,a,h){if(!r||typeof r!=="string")throw new Error("`appId` is missing.");if(!t||typeof t!=="string")throw new Error("`apiKey` is missing.");if(!a||a&&(typeof a!=="string"||!u.includes(a)))throw new Error(`\`region\` is required and must be one of the following: ${u.join(", ")}`);return createQuerySuggestionsClient({appId:r,apiKey:t,region:a,timeouts:{connect:1e3,read:2e3,write:3e4},logger:n(),requester:e(),algoliaAgents:[{segment:"Browser"}],authMode:"WithinQueryParameters",responsesCache:o(),requestsCache:o({serializable:false}),hostsCache:s({caches:[i({key:`${c}-${r}`}),o()]}),...h})}export{c as apiClientVersion,querySuggestionsClient};

