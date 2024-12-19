// @algolia/client-abtesting@5.17.0 downloaded from https://ga.jspm.io/npm:@algolia/client-abtesting@5.17.0/dist/builds/browser.js

import{createXhrRequester as e}from"@algolia/requester-browser-xhr";import{createAuth as t,createTransporter as r,getAlgoliaAgent as s,createNullLogger as a,createMemoryCache as n,createFallbackableCache as i,createBrowserLocalStorageCache as o}from"@algolia/client-common";var c="5.17.0";var d=["de","us"];function getDefaultHosts(e){const t=e?"analytics.{region}.algolia.com".replace("{region}",e):"analytics.algolia.com";return[{url:t,accept:"readWrite",protocol:"https"}]}function createAbtestingClient({appId:e,apiKey:a,authMode:n,algoliaAgents:i,region:o,...d}){const h=t(e,a,n);const l=r({hosts:getDefaultHosts(o),...d,algoliaAgent:s({algoliaAgents:i,client:"Abtesting",version:c}),baseHeaders:{"content-type":"text/plain",...h.headers(),...d.baseHeaders},baseQueryParameters:{...h.queryParameters(),...d.baseQueryParameters}});return{transporter:l,appId:e,clearCache(){return Promise.all([l.requestsCache.clear(),l.responsesCache.clear()]).then((()=>{}))},get _ua(){return l.algoliaAgent.value},
/**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
addAlgoliaAgent(e,t){l.algoliaAgent.add({segment:e,version:t})},
/**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
setClientApiKey({apiKey:e}){n&&n!=="WithinHeaders"?l.baseQueryParameters["x-algolia-api-key"]=e:l.baseHeaders["x-algolia-api-key"]=e},
/**
     * Creates a new A/B test.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param addABTestsRequest - The addABTestsRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
addABTests(e,t){if(!e)throw new Error("Parameter `addABTestsRequest` is required when calling `addABTests`.");if(!e.name)throw new Error("Parameter `addABTestsRequest.name` is required when calling `addABTests`.");if(!e.variants)throw new Error("Parameter `addABTestsRequest.variants` is required when calling `addABTests`.");if(!e.endAt)throw new Error("Parameter `addABTestsRequest.endAt` is required when calling `addABTests`.");const r="/2/abtests";const s={};const a={};const n={method:"POST",path:r,queryParameters:a,headers:s,data:e};return l.request(n,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customDelete({path:e,parameters:t},r){if(!e)throw new Error("Parameter `path` is required when calling `customDelete`.");const s="/{path}".replace("{path}",e);const a={};const n=t||{};const i={method:"DELETE",path:s,queryParameters:n,headers:a};return l.request(i,r)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customGet({path:e,parameters:t},r){if(!e)throw new Error("Parameter `path` is required when calling `customGet`.");const s="/{path}".replace("{path}",e);const a={};const n=t||{};const i={method:"GET",path:s,queryParameters:n,headers:a};return l.request(i,r)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPost({path:e,parameters:t,body:r},s){if(!e)throw new Error("Parameter `path` is required when calling `customPost`.");const a="/{path}".replace("{path}",e);const n={};const i=t||{};const o={method:"POST",path:a,queryParameters:i,headers:n,data:r||{}};return l.request(o,s)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPut({path:e,parameters:t,body:r},s){if(!e)throw new Error("Parameter `path` is required when calling `customPut`.");const a="/{path}".replace("{path}",e);const n={};const i=t||{};const o={method:"PUT",path:a,queryParameters:i,headers:n,data:r||{}};return l.request(o,s)},
/**
     * Deletes an A/B test by its ID.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteABTest - The deleteABTest object.
     * @param deleteABTest.id - Unique A/B test identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteABTest({id:e},t){if(!e)throw new Error("Parameter `id` is required when calling `deleteABTest`.");const r="/2/abtests/{id}".replace("{id}",encodeURIComponent(e));const s={};const a={};const n={method:"DELETE",path:r,queryParameters:a,headers:s};return l.request(n,t)},
/**
     * Given the traffic percentage and the expected effect size, this endpoint estimates the sample size and duration of an A/B test based on historical traffic.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param estimateABTestRequest - The estimateABTestRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
estimateABTest(e,t){if(!e)throw new Error("Parameter `estimateABTestRequest` is required when calling `estimateABTest`.");if(!e.configuration)throw new Error("Parameter `estimateABTestRequest.configuration` is required when calling `estimateABTest`.");if(!e.variants)throw new Error("Parameter `estimateABTestRequest.variants` is required when calling `estimateABTest`.");const r="/2/abtests/estimate";const s={};const a={};const n={method:"POST",path:r,queryParameters:a,headers:s,data:e};return l.request(n,t)},
/**
     * Retrieves the details for an A/B test by its ID.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getABTest - The getABTest object.
     * @param getABTest.id - Unique A/B test identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getABTest({id:e},t){if(!e)throw new Error("Parameter `id` is required when calling `getABTest`.");const r="/2/abtests/{id}".replace("{id}",encodeURIComponent(e));const s={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:s};return l.request(n,t)},
/**
     * Lists all A/B tests you configured for this application.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param listABTests - The listABTests object.
     * @param listABTests.offset - Position of the first item to return.
     * @param listABTests.limit - Number of items to return.
     * @param listABTests.indexPrefix - Index name prefix. Only A/B tests for indices starting with this string are included in the response.
     * @param listABTests.indexSuffix - Index name suffix. Only A/B tests for indices ending with this string are included in the response.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listABTests({offset:e,limit:t,indexPrefix:r,indexSuffix:s}={},a=void 0){const n="/2/abtests";const i={};const o={};e!==void 0&&(o.offset=e.toString());t!==void 0&&(o.limit=t.toString());r!==void 0&&(o.indexPrefix=r.toString());s!==void 0&&(o.indexSuffix=s.toString());const c={method:"GET",path:n,queryParameters:o,headers:i};return l.request(c,a)},
/**
     * Schedule an A/B test to be started at a later time.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param scheduleABTestsRequest - The scheduleABTestsRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
scheduleABTest(e,t){if(!e)throw new Error("Parameter `scheduleABTestsRequest` is required when calling `scheduleABTest`.");if(!e.name)throw new Error("Parameter `scheduleABTestsRequest.name` is required when calling `scheduleABTest`.");if(!e.variants)throw new Error("Parameter `scheduleABTestsRequest.variants` is required when calling `scheduleABTest`.");if(!e.scheduledAt)throw new Error("Parameter `scheduleABTestsRequest.scheduledAt` is required when calling `scheduleABTest`.");if(!e.endAt)throw new Error("Parameter `scheduleABTestsRequest.endAt` is required when calling `scheduleABTest`.");const r="/2/abtests/schedule";const s={};const a={};const n={method:"POST",path:r,queryParameters:a,headers:s,data:e};return l.request(n,t)},
/**
     * Stops an A/B test by its ID.  You can\'t restart stopped A/B tests.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param stopABTest - The stopABTest object.
     * @param stopABTest.id - Unique A/B test identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
stopABTest({id:e},t){if(!e)throw new Error("Parameter `id` is required when calling `stopABTest`.");const r="/2/abtests/{id}/stop".replace("{id}",encodeURIComponent(e));const s={};const a={};const n={method:"POST",path:r,queryParameters:a,headers:s};return l.request(n,t)}}}function abtestingClient(t,r,s,h){if(!t||typeof t!=="string")throw new Error("`appId` is missing.");if(!r||typeof r!=="string")throw new Error("`apiKey` is missing.");if(s&&(typeof s!=="string"||!d.includes(s)))throw new Error(`\`region\` must be one of the following: ${d.join(", ")}`);return createAbtestingClient({appId:t,apiKey:r,region:s,timeouts:{connect:1e3,read:2e3,write:3e4},logger:a(),requester:e(),algoliaAgents:[{segment:"Browser"}],authMode:"WithinQueryParameters",responsesCache:n(),requestsCache:n({serializable:false}),hostsCache:i({caches:[o({key:`${c}-${t}`}),n()]}),...h})}export{abtestingClient,c as apiClientVersion};

