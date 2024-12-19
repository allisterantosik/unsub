// @algolia/client-insights@5.17.0 downloaded from https://ga.jspm.io/npm:@algolia/client-insights@5.17.0/dist/builds/browser.js

import{createXhrRequester as e}from"@algolia/requester-browser-xhr";import{createAuth as t,createTransporter as r,getAlgoliaAgent as a,createNullLogger as s,createMemoryCache as n,createFallbackableCache as o,createBrowserLocalStorageCache as i}from"@algolia/client-common";var h="5.17.0";var c=["de","us"];function getDefaultHosts(e){const t=e?"insights.{region}.algolia.io".replace("{region}",e):"insights.algolia.io";return[{url:t,accept:"readWrite",protocol:"https"}]}function createInsightsClient({appId:e,apiKey:s,authMode:n,algoliaAgents:o,region:i,...c}){const l=t(e,s,n);const u=r({hosts:getDefaultHosts(i),...c,algoliaAgent:a({algoliaAgents:o,client:"Insights",version:h}),baseHeaders:{"content-type":"text/plain",...l.headers(),...c.baseHeaders},baseQueryParameters:{...l.queryParameters(),...c.baseQueryParameters}});return{transporter:u,appId:e,clearCache(){return Promise.all([u.requestsCache.clear(),u.responsesCache.clear()]).then((()=>{}))},get _ua(){return u.algoliaAgent.value},
/**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
addAlgoliaAgent(e,t){u.algoliaAgent.add({segment:e,version:t})},
/**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
setClientApiKey({apiKey:e}){n&&n!=="WithinHeaders"?u.baseQueryParameters["x-algolia-api-key"]=e:u.baseHeaders["x-algolia-api-key"]=e},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customDelete({path:e,parameters:t},r){if(!e)throw new Error("Parameter `path` is required when calling `customDelete`.");const a="/{path}".replace("{path}",e);const s={};const n=t||{};const o={method:"DELETE",path:a,queryParameters:n,headers:s};return u.request(o,r)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customGet({path:e,parameters:t},r){if(!e)throw new Error("Parameter `path` is required when calling `customGet`.");const a="/{path}".replace("{path}",e);const s={};const n=t||{};const o={method:"GET",path:a,queryParameters:n,headers:s};return u.request(o,r)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPost({path:e,parameters:t,body:r},a){if(!e)throw new Error("Parameter `path` is required when calling `customPost`.");const s="/{path}".replace("{path}",e);const n={};const o=t||{};const i={method:"POST",path:s,queryParameters:o,headers:n,data:r||{}};return u.request(i,a)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPut({path:e,parameters:t,body:r},a){if(!e)throw new Error("Parameter `path` is required when calling `customPut`.");const s="/{path}".replace("{path}",e);const n={};const o=t||{};const i={method:"PUT",path:s,queryParameters:o,headers:n,data:r||{}};return u.request(i,a)},
/**
     * Deletes all events related to the specified user token from events metrics and analytics. The deletion is asynchronous, and processed within 48 hours. To delete a personalization user profile, see `Delete a user profile` in the Personalization API.
     * @param deleteUserToken - The deleteUserToken object.
     * @param deleteUserToken.userToken - User token for which to delete all associated events.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteUserToken({userToken:e},t){if(!e)throw new Error("Parameter `userToken` is required when calling `deleteUserToken`.");const r="/1/usertokens/{userToken}".replace("{userToken}",encodeURIComponent(e));const a={};const s={};const n={method:"DELETE",path:r,queryParameters:s,headers:a};return u.request(n,t)},
/**
     * Sends a list of events to the Insights API.  You can include up to 1,000 events in a single request, but the request body must be smaller than 2&nbsp;MB.
     * @param insightsEvents - The insightsEvents object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
pushEvents(e,t){if(!e)throw new Error("Parameter `insightsEvents` is required when calling `pushEvents`.");if(!e.events)throw new Error("Parameter `insightsEvents.events` is required when calling `pushEvents`.");const r="/1/events";const a={};const s={};const n={method:"POST",path:r,queryParameters:s,headers:a,data:e};return u.request(n,t)}}}function insightsClient(t,r,a,l){if(!t||typeof t!=="string")throw new Error("`appId` is missing.");if(!r||typeof r!=="string")throw new Error("`apiKey` is missing.");if(a&&(typeof a!=="string"||!c.includes(a)))throw new Error(`\`region\` must be one of the following: ${c.join(", ")}`);return createInsightsClient({appId:t,apiKey:r,region:a,timeouts:{connect:1e3,read:2e3,write:3e4},logger:s(),requester:e(),algoliaAgents:[{segment:"Browser"}],authMode:"WithinQueryParameters",responsesCache:n(),requestsCache:n({serializable:false}),hostsCache:o({caches:[i({key:`${h}-${t}`}),n()]}),...l})}export{h as apiClientVersion,insightsClient};

