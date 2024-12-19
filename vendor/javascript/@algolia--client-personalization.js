// @algolia/client-personalization@5.17.0 downloaded from https://ga.jspm.io/npm:@algolia/client-personalization@5.17.0/dist/builds/browser.js

import{createXhrRequester as e}from"@algolia/requester-browser-xhr";import{createAuth as r,createTransporter as t,getAlgoliaAgent as a,createNullLogger as o,createMemoryCache as s,createFallbackableCache as n,createBrowserLocalStorageCache as i}from"@algolia/client-common";var l="5.17.0";var c=["eu","us"];function getDefaultHosts(e){const r="personalization.{region}.algolia.com".replace("{region}",e);return[{url:r,accept:"readWrite",protocol:"https"}]}function createPersonalizationClient({appId:e,apiKey:o,authMode:s,algoliaAgents:n,region:i,...c}){const p=r(e,o,s);const u=t({hosts:getDefaultHosts(i),...c,algoliaAgent:a({algoliaAgents:n,client:"Personalization",version:l}),baseHeaders:{"content-type":"text/plain",...p.headers(),...c.baseHeaders},baseQueryParameters:{...p.queryParameters(),...c.baseQueryParameters}});return{transporter:u,appId:e,clearCache(){return Promise.all([u.requestsCache.clear(),u.responsesCache.clear()]).then((()=>{}))},get _ua(){return u.algoliaAgent.value},
/**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
addAlgoliaAgent(e,r){u.algoliaAgent.add({segment:e,version:r})},
/**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
setClientApiKey({apiKey:e}){s&&s!=="WithinHeaders"?u.baseQueryParameters["x-algolia-api-key"]=e:u.baseHeaders["x-algolia-api-key"]=e},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customDelete({path:e,parameters:r},t){if(!e)throw new Error("Parameter `path` is required when calling `customDelete`.");const a="/{path}".replace("{path}",e);const o={};const s=r||{};const n={method:"DELETE",path:a,queryParameters:s,headers:o};return u.request(n,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customGet({path:e,parameters:r},t){if(!e)throw new Error("Parameter `path` is required when calling `customGet`.");const a="/{path}".replace("{path}",e);const o={};const s=r||{};const n={method:"GET",path:a,queryParameters:s,headers:o};return u.request(n,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPost({path:e,parameters:r,body:t},a){if(!e)throw new Error("Parameter `path` is required when calling `customPost`.");const o="/{path}".replace("{path}",e);const s={};const n=r||{};const i={method:"POST",path:o,queryParameters:n,headers:s,data:t||{}};return u.request(i,a)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPut({path:e,parameters:r,body:t},a){if(!e)throw new Error("Parameter `path` is required when calling `customPut`.");const o="/{path}".replace("{path}",e);const s={};const n=r||{};const i={method:"PUT",path:o,queryParameters:n,headers:s,data:t||{}};return u.request(i,a)},
/**
     * Deletes a user profile.  The response includes a date and time when the user profile can safely be considered deleted.
     *
     * Required API Key ACLs:
     *  - recommendation
     * @param deleteUserProfile - The deleteUserProfile object.
     * @param deleteUserProfile.userToken - Unique identifier representing a user for which to fetch the personalization profile.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteUserProfile({userToken:e},r){if(!e)throw new Error("Parameter `userToken` is required when calling `deleteUserProfile`.");const t="/1/profiles/{userToken}".replace("{userToken}",encodeURIComponent(e));const a={};const o={};const s={method:"DELETE",path:t,queryParameters:o,headers:a};return u.request(s,r)},
/**
     * Retrieves the current personalization strategy.
     *
     * Required API Key ACLs:
     *  - recommendation
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getPersonalizationStrategy(e){const r="/1/strategies/personalization";const t={};const a={};const o={method:"GET",path:r,queryParameters:a,headers:t};return u.request(o,e)},
/**
     * Retrieves a user profile and their affinities for different facets.
     *
     * Required API Key ACLs:
     *  - recommendation
     * @param getUserTokenProfile - The getUserTokenProfile object.
     * @param getUserTokenProfile.userToken - Unique identifier representing a user for which to fetch the personalization profile.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getUserTokenProfile({userToken:e},r){if(!e)throw new Error("Parameter `userToken` is required when calling `getUserTokenProfile`.");const t="/1/profiles/personalization/{userToken}".replace("{userToken}",encodeURIComponent(e));const a={};const o={};const s={method:"GET",path:t,queryParameters:o,headers:a};return u.request(s,r)},
/**
     * Creates a new personalization strategy.
     *
     * Required API Key ACLs:
     *  - recommendation
     * @param personalizationStrategyParams - The personalizationStrategyParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
setPersonalizationStrategy(e,r){if(!e)throw new Error("Parameter `personalizationStrategyParams` is required when calling `setPersonalizationStrategy`.");if(!e.eventScoring)throw new Error("Parameter `personalizationStrategyParams.eventScoring` is required when calling `setPersonalizationStrategy`.");if(!e.facetScoring)throw new Error("Parameter `personalizationStrategyParams.facetScoring` is required when calling `setPersonalizationStrategy`.");if(!e.personalizationImpact)throw new Error("Parameter `personalizationStrategyParams.personalizationImpact` is required when calling `setPersonalizationStrategy`.");const t="/1/strategies/personalization";const a={};const o={};const s={method:"POST",path:t,queryParameters:o,headers:a,data:e};return u.request(s,r)}}}function personalizationClient(r,t,a,p){if(!r||typeof r!=="string")throw new Error("`appId` is missing.");if(!t||typeof t!=="string")throw new Error("`apiKey` is missing.");if(!a||a&&(typeof a!=="string"||!c.includes(a)))throw new Error(`\`region\` is required and must be one of the following: ${c.join(", ")}`);return createPersonalizationClient({appId:r,apiKey:t,region:a,timeouts:{connect:1e3,read:2e3,write:3e4},logger:o(),requester:e(),algoliaAgents:[{segment:"Browser"}],authMode:"WithinQueryParameters",responsesCache:s(),requestsCache:s({serializable:false}),hostsCache:n({caches:[i({key:`${l}-${r}`}),s()]}),...p})}export{l as apiClientVersion,personalizationClient};

