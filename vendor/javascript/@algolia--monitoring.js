// @algolia/monitoring@1.17.0 downloaded from https://ga.jspm.io/npm:@algolia/monitoring@1.17.0/dist/builds/browser.js

import{createXhrRequester as e}from"@algolia/requester-browser-xhr";import{createAuth as t,createTransporter as r,getAlgoliaAgent as s,createNullLogger as a,createMemoryCache as n,createFallbackableCache as o,createBrowserLocalStorageCache as c}from"@algolia/client-common";var i="1.17.0";function getDefaultHosts(){return[{url:"status.algolia.com",accept:"readWrite",protocol:"https"}]}function createMonitoringClient({appId:e,apiKey:a,authMode:n,algoliaAgents:o,...c}){const u=t(e,a,n);const l=r({hosts:getDefaultHosts(),...c,algoliaAgent:s({algoliaAgents:o,client:"Monitoring",version:i}),baseHeaders:{"content-type":"text/plain",...u.headers(),...c.baseHeaders},baseQueryParameters:{...u.queryParameters(),...c.baseQueryParameters}});return{transporter:l,appId:e,clearCache(){return Promise.all([l.requestsCache.clear(),l.responsesCache.clear()]).then((()=>{}))},get _ua(){return l.algoliaAgent.value},
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
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customDelete({path:e,parameters:t},r){if(!e)throw new Error("Parameter `path` is required when calling `customDelete`.");const s="/{path}".replace("{path}",e);const a={};const n=t||{};const o={method:"DELETE",path:s,queryParameters:n,headers:a};return l.request(o,r)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customGet({path:e,parameters:t},r){if(!e)throw new Error("Parameter `path` is required when calling `customGet`.");const s="/{path}".replace("{path}",e);const a={};const n=t||{};const o={method:"GET",path:s,queryParameters:n,headers:a};return l.request(o,r)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPost({path:e,parameters:t,body:r},s){if(!e)throw new Error("Parameter `path` is required when calling `customPost`.");const a="/{path}".replace("{path}",e);const n={};const o=t||{};const c={method:"POST",path:a,queryParameters:o,headers:n,data:r||{}};return l.request(c,s)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPut({path:e,parameters:t,body:r},s){if(!e)throw new Error("Parameter `path` is required when calling `customPut`.");const a="/{path}".replace("{path}",e);const n={};const o=t||{};const c={method:"PUT",path:a,queryParameters:o,headers:n,data:r||{}};return l.request(c,s)},
/**
     * Retrieves known incidents for the selected clusters.
     * @param getClusterIncidents - The getClusterIncidents object.
     * @param getClusterIncidents.clusters - Subset of clusters, separated by commas.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getClusterIncidents({clusters:e},t){if(!e)throw new Error("Parameter `clusters` is required when calling `getClusterIncidents`.");const r="/1/incidents/{clusters}".replace("{clusters}",encodeURIComponent(e));const s={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:s};return l.request(n,t)},
/**
     * Retrieves the status of selected clusters.
     * @param getClusterStatus - The getClusterStatus object.
     * @param getClusterStatus.clusters - Subset of clusters, separated by commas.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getClusterStatus({clusters:e},t){if(!e)throw new Error("Parameter `clusters` is required when calling `getClusterStatus`.");const r="/1/status/{clusters}".replace("{clusters}",encodeURIComponent(e));const s={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:s};return l.request(n,t)},
/**
     * Retrieves known incidents for all clusters.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getIncidents(e){const t="/1/incidents";const r={};const s={};const a={method:"GET",path:t,queryParameters:s,headers:r};return l.request(a,e)},
/**
     * Retrieves average times for indexing operations for selected clusters.
     * @param getIndexingTime - The getIndexingTime object.
     * @param getIndexingTime.clusters - Subset of clusters, separated by commas.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getIndexingTime({clusters:e},t){if(!e)throw new Error("Parameter `clusters` is required when calling `getIndexingTime`.");const r="/1/indexing/{clusters}".replace("{clusters}",encodeURIComponent(e));const s={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:s};return l.request(n,t)},
/**
     * Retrieves the average latency for search requests for selected clusters.
     * @param getLatency - The getLatency object.
     * @param getLatency.clusters - Subset of clusters, separated by commas.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getLatency({clusters:e},t){if(!e)throw new Error("Parameter `clusters` is required when calling `getLatency`.");const r="/1/latency/{clusters}".replace("{clusters}",encodeURIComponent(e));const s={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:s};return l.request(n,t)},
/**
     * Retrieves metrics related to your Algolia infrastructure, aggregated over a selected time window.  Access to this API is available as part of the [Premium or Elevate plans](https://www.algolia.com/pricing). You must authenticate requests with the `x-algolia-application-id` and `x-algolia-api-key` headers (using the Monitoring API key).
     * @param getMetrics - The getMetrics object.
     * @param getMetrics.metric - Metric to report.  For more information about the individual metrics, see the description of the API response. To include all metrics, use `*`.
     * @param getMetrics.period - Period over which to aggregate the metrics:  - `minute`. Aggregate the last minute. 1 data point per 10 seconds. - `hour`. Aggregate the last hour. 1 data point per minute. - `day`. Aggregate the last day. 1 data point per 10 minutes. - `week`. Aggregate the last week. 1 data point per hour. - `month`. Aggregate the last month. 1 data point per day.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getMetrics({metric:e,period:t},r){if(!e)throw new Error("Parameter `metric` is required when calling `getMetrics`.");if(!t)throw new Error("Parameter `period` is required when calling `getMetrics`.");const s="/1/infrastructure/{metric}/period/{period}".replace("{metric}",encodeURIComponent(e)).replace("{period}",encodeURIComponent(t));const a={};const n={};const o={method:"GET",path:s,queryParameters:n,headers:a};return l.request(o,r)},
/**
     * Test whether clusters are reachable or not.
     * @param getReachability - The getReachability object.
     * @param getReachability.clusters - Subset of clusters, separated by commas.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getReachability({clusters:e},t){if(!e)throw new Error("Parameter `clusters` is required when calling `getReachability`.");const r="/1/reachability/{clusters}/probes".replace("{clusters}",encodeURIComponent(e));const s={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:s};return l.request(n,t)},
/**
     * Retrieves the servers that belong to clusters.  The response depends on whether you authenticate your API request:  - With authentication, the response lists the servers assigned to your Algolia application\'s cluster.  - Without authentication, the response lists the servers for all Algolia clusters.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getServers(e){const t="/1/inventory/servers";const r={};const s={};const a={method:"GET",path:t,queryParameters:s,headers:r};return l.request(a,e)},
/**
     * Retrieves the status of all Algolia clusters and instances.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getStatus(e){const t="/1/status";const r={};const s={};const a={method:"GET",path:t,queryParameters:s,headers:r};return l.request(a,e)}}}function monitoringClient(t,r,s){if(!t||typeof t!=="string")throw new Error("`appId` is missing.");if(!r||typeof r!=="string")throw new Error("`apiKey` is missing.");return createMonitoringClient({appId:t,apiKey:r,timeouts:{connect:1e3,read:2e3,write:3e4},logger:a(),requester:e(),algoliaAgents:[{segment:"Browser"}],authMode:"WithinQueryParameters",responsesCache:n(),requestsCache:n({serializable:false}),hostsCache:o({caches:[c({key:`${i}-${t}`}),n()]}),...s})}export{i as apiClientVersion,monitoringClient};

