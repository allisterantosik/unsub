// @algolia/client-analytics@5.17.0 downloaded from https://ga.jspm.io/npm:@algolia/client-analytics@5.17.0/dist/builds/browser.js

import{createXhrRequester as t}from"@algolia/requester-browser-xhr";import{createAuth as e,createTransporter as r,getAlgoliaAgent as o,createNullLogger as i,createMemoryCache as a,createFallbackableCache as n,createBrowserLocalStorageCache as s}from"@algolia/client-common";var d="5.17.0";var g=["de","us"];function getDefaultHosts(t){const e=t?"analytics.{region}.algolia.com".replace("{region}",t):"analytics.algolia.com";return[{url:e,accept:"readWrite",protocol:"https"}]}function createAnalyticsClient({appId:t,apiKey:i,authMode:a,algoliaAgents:n,region:s,...g}){const c=e(t,i,a);const h=r({hosts:getDefaultHosts(s),...g,algoliaAgent:o({algoliaAgents:n,client:"Analytics",version:d}),baseHeaders:{"content-type":"text/plain",...c.headers(),...g.baseHeaders},baseQueryParameters:{...c.queryParameters(),...g.baseQueryParameters}});return{transporter:h,appId:t,clearCache(){return Promise.all([h.requestsCache.clear(),h.responsesCache.clear()]).then((()=>{}))},get _ua(){return h.algoliaAgent.value},
/**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
addAlgoliaAgent(t,e){h.algoliaAgent.add({segment:t,version:e})},
/**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
setClientApiKey({apiKey:t}){a&&a!=="WithinHeaders"?h.baseQueryParameters["x-algolia-api-key"]=t:h.baseHeaders["x-algolia-api-key"]=t},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customDelete({path:t,parameters:e},r){if(!t)throw new Error("Parameter `path` is required when calling `customDelete`.");const o="/{path}".replace("{path}",t);const i={};const a=e||{};const n={method:"DELETE",path:o,queryParameters:a,headers:i};return h.request(n,r)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customGet({path:t,parameters:e},r){if(!t)throw new Error("Parameter `path` is required when calling `customGet`.");const o="/{path}".replace("{path}",t);const i={};const a=e||{};const n={method:"GET",path:o,queryParameters:a,headers:i};return h.request(n,r)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPost({path:t,parameters:e,body:r},o){if(!t)throw new Error("Parameter `path` is required when calling `customPost`.");const i="/{path}".replace("{path}",t);const a={};const n=e||{};const s={method:"POST",path:i,queryParameters:n,headers:a,data:r||{}};return h.request(s,o)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPut({path:t,parameters:e,body:r},o){if(!t)throw new Error("Parameter `path` is required when calling `customPut`.");const i="/{path}".replace("{path}",t);const a={};const n=e||{};const s={method:"PUT",path:i,queryParameters:n,headers:a,data:r||{}};return h.request(s,o)},
/**
     * Retrieves the add-to-cart rate for all of your searches with at least one add-to-cart event, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getAddToCartRate - The getAddToCartRate object.
     * @param getAddToCartRate.index - Index name.
     * @param getAddToCartRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getAddToCartRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getAddToCartRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getAddToCartRate({index:t,startDate:e,endDate:r,tags:o},i){if(!t)throw new Error("Parameter `index` is required when calling `getAddToCartRate`.");const a="/2/conversions/addToCartRate";const n={};const s={};t!==void 0&&(s.index=t.toString());e!==void 0&&(s.startDate=e.toString());r!==void 0&&(s.endDate=r.toString());o!==void 0&&(s.tags=o.toString());const d={method:"GET",path:a,queryParameters:s,headers:n};return h.request(d,i)},
/**
     * Retrieves the average click position of your search results, including a daily breakdown.  The average click position is the average of all clicked search results\' positions. For example, if users only ever click on the first result for any search, the average click position is 1. By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getAverageClickPosition - The getAverageClickPosition object.
     * @param getAverageClickPosition.index - Index name.
     * @param getAverageClickPosition.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getAverageClickPosition.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getAverageClickPosition.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getAverageClickPosition({index:t,startDate:e,endDate:r,tags:o},i){if(!t)throw new Error("Parameter `index` is required when calling `getAverageClickPosition`.");const a="/2/clicks/averageClickPosition";const n={};const s={};t!==void 0&&(s.index=t.toString());e!==void 0&&(s.startDate=e.toString());r!==void 0&&(s.endDate=r.toString());o!==void 0&&(s.tags=o.toString());const d={method:"GET",path:a,queryParameters:s,headers:n};return h.request(d,i)},
/**
     * Retrieves the positions in the search results and their associated number of clicks.  This lets you check how many clicks the first, second, or tenth search results receive.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getClickPositions - The getClickPositions object.
     * @param getClickPositions.index - Index name.
     * @param getClickPositions.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getClickPositions.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getClickPositions.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getClickPositions({index:t,startDate:e,endDate:r,tags:o},i){if(!t)throw new Error("Parameter `index` is required when calling `getClickPositions`.");const a="/2/clicks/positions";const n={};const s={};t!==void 0&&(s.index=t.toString());e!==void 0&&(s.startDate=e.toString());r!==void 0&&(s.endDate=r.toString());o!==void 0&&(s.tags=o.toString());const d={method:"GET",path:a,queryParameters:s,headers:n};return h.request(d,i)},
/**
     * Retrieves the click-through rate for all of your searches with at least one click event, including a daily breakdown  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getClickThroughRate - The getClickThroughRate object.
     * @param getClickThroughRate.index - Index name.
     * @param getClickThroughRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getClickThroughRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getClickThroughRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getClickThroughRate({index:t,startDate:e,endDate:r,tags:o},i){if(!t)throw new Error("Parameter `index` is required when calling `getClickThroughRate`.");const a="/2/clicks/clickThroughRate";const n={};const s={};t!==void 0&&(s.index=t.toString());e!==void 0&&(s.startDate=e.toString());r!==void 0&&(s.endDate=r.toString());o!==void 0&&(s.tags=o.toString());const d={method:"GET",path:a,queryParameters:s,headers:n};return h.request(d,i)},
/**
     * Retrieves the conversion rate for all of your searches with at least one conversion event, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getConversionRate - The getConversionRate object.
     * @param getConversionRate.index - Index name.
     * @param getConversionRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getConversionRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getConversionRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getConversionRate({index:t,startDate:e,endDate:r,tags:o},i){if(!t)throw new Error("Parameter `index` is required when calling `getConversionRate`.");const a="/2/conversions/conversionRate";const n={};const s={};t!==void 0&&(s.index=t.toString());e!==void 0&&(s.startDate=e.toString());r!==void 0&&(s.endDate=r.toString());o!==void 0&&(s.tags=o.toString());const d={method:"GET",path:a,queryParameters:s,headers:n};return h.request(d,i)},
/**
     * Retrieves the fraction of searches that didn\'t lead to any click within a time range, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getNoClickRate - The getNoClickRate object.
     * @param getNoClickRate.index - Index name.
     * @param getNoClickRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getNoClickRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getNoClickRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getNoClickRate({index:t,startDate:e,endDate:r,tags:o},i){if(!t)throw new Error("Parameter `index` is required when calling `getNoClickRate`.");const a="/2/searches/noClickRate";const n={};const s={};t!==void 0&&(s.index=t.toString());e!==void 0&&(s.startDate=e.toString());r!==void 0&&(s.endDate=r.toString());o!==void 0&&(s.tags=o.toString());const d={method:"GET",path:a,queryParameters:s,headers:n};return h.request(d,i)},
/**
     * Retrieves the fraction of searches that didn\'t return any results within a time range, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getNoResultsRate - The getNoResultsRate object.
     * @param getNoResultsRate.index - Index name.
     * @param getNoResultsRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getNoResultsRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getNoResultsRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getNoResultsRate({index:t,startDate:e,endDate:r,tags:o},i){if(!t)throw new Error("Parameter `index` is required when calling `getNoResultsRate`.");const a="/2/searches/noResultRate";const n={};const s={};t!==void 0&&(s.index=t.toString());e!==void 0&&(s.startDate=e.toString());r!==void 0&&(s.endDate=r.toString());o!==void 0&&(s.tags=o.toString());const d={method:"GET",path:a,queryParameters:s,headers:n};return h.request(d,i)},
/**
     * Retrieves the purchase rate for all of your searches with at least one purchase event, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getPurchaseRate - The getPurchaseRate object.
     * @param getPurchaseRate.index - Index name.
     * @param getPurchaseRate.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getPurchaseRate.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getPurchaseRate.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getPurchaseRate({index:t,startDate:e,endDate:r,tags:o},i){if(!t)throw new Error("Parameter `index` is required when calling `getPurchaseRate`.");const a="/2/conversions/purchaseRate";const n={};const s={};t!==void 0&&(s.index=t.toString());e!==void 0&&(s.startDate=e.toString());r!==void 0&&(s.endDate=r.toString());o!==void 0&&(s.tags=o.toString());const d={method:"GET",path:a,queryParameters:s,headers:n};return h.request(d,i)},
/**
     * Retrieves revenue-related metrics, such as the total revenue or the average order value.  To retrieve revenue-related metrics, sent purchase events. By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getRevenue - The getRevenue object.
     * @param getRevenue.index - Index name.
     * @param getRevenue.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getRevenue.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getRevenue.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getRevenue({index:t,startDate:e,endDate:r,tags:o},i){if(!t)throw new Error("Parameter `index` is required when calling `getRevenue`.");const a="/2/conversions/revenue";const n={};const s={};t!==void 0&&(s.index=t.toString());e!==void 0&&(s.startDate=e.toString());r!==void 0&&(s.endDate=r.toString());o!==void 0&&(s.tags=o.toString());const d={method:"GET",path:a,queryParameters:s,headers:n};return h.request(d,i)},
/**
     * Retrieves the number of searches within a time range, including a daily breakdown.  By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getSearchesCount - The getSearchesCount object.
     * @param getSearchesCount.index - Index name.
     * @param getSearchesCount.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesCount.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesCount.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getSearchesCount({index:t,startDate:e,endDate:r,tags:o},i){if(!t)throw new Error("Parameter `index` is required when calling `getSearchesCount`.");const a="/2/searches/count";const n={};const s={};t!==void 0&&(s.index=t.toString());e!==void 0&&(s.startDate=e.toString());r!==void 0&&(s.endDate=r.toString());o!==void 0&&(s.tags=o.toString());const d={method:"GET",path:a,queryParameters:s,headers:n};return h.request(d,i)},
/**
     * Retrieves the most popular searches that didn\'t lead to any clicks, from the 1,000 most frequent searches.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getSearchesNoClicks - The getSearchesNoClicks object.
     * @param getSearchesNoClicks.index - Index name.
     * @param getSearchesNoClicks.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesNoClicks.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesNoClicks.limit - Number of items to return.
     * @param getSearchesNoClicks.offset - Position of the first item to return.
     * @param getSearchesNoClicks.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getSearchesNoClicks({index:t,startDate:e,endDate:r,limit:o,offset:i,tags:a},n){if(!t)throw new Error("Parameter `index` is required when calling `getSearchesNoClicks`.");const s="/2/searches/noClicks";const d={};const g={};t!==void 0&&(g.index=t.toString());e!==void 0&&(g.startDate=e.toString());r!==void 0&&(g.endDate=r.toString());o!==void 0&&(g.limit=o.toString());i!==void 0&&(g.offset=i.toString());a!==void 0&&(g.tags=a.toString());const c={method:"GET",path:s,queryParameters:g,headers:d};return h.request(c,n)},
/**
     * Retrieves the most popular searches that didn\'t return any results.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getSearchesNoResults - The getSearchesNoResults object.
     * @param getSearchesNoResults.index - Index name.
     * @param getSearchesNoResults.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesNoResults.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getSearchesNoResults.limit - Number of items to return.
     * @param getSearchesNoResults.offset - Position of the first item to return.
     * @param getSearchesNoResults.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getSearchesNoResults({index:t,startDate:e,endDate:r,limit:o,offset:i,tags:a},n){if(!t)throw new Error("Parameter `index` is required when calling `getSearchesNoResults`.");const s="/2/searches/noResults";const d={};const g={};t!==void 0&&(g.index=t.toString());e!==void 0&&(g.startDate=e.toString());r!==void 0&&(g.endDate=r.toString());o!==void 0&&(g.limit=o.toString());i!==void 0&&(g.offset=i.toString());a!==void 0&&(g.tags=a.toString());const c={method:"GET",path:s,queryParameters:g,headers:d};return h.request(c,n)},
/**
     * Retrieves the time when the Analytics data for the specified index was last updated.  The Analytics data is updated every 5 minutes.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getStatus - The getStatus object.
     * @param getStatus.index - Index name.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getStatus({index:t},e){if(!t)throw new Error("Parameter `index` is required when calling `getStatus`.");const r="/2/status";const o={};const i={};t!==void 0&&(i.index=t.toString());const a={method:"GET",path:r,queryParameters:i,headers:o};return h.request(a,e)},
/**
     * Retrieves the countries with the most searches to your index.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopCountries - The getTopCountries object.
     * @param getTopCountries.index - Index name.
     * @param getTopCountries.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopCountries.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopCountries.limit - Number of items to return.
     * @param getTopCountries.offset - Position of the first item to return.
     * @param getTopCountries.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getTopCountries({index:t,startDate:e,endDate:r,limit:o,offset:i,tags:a},n){if(!t)throw new Error("Parameter `index` is required when calling `getTopCountries`.");const s="/2/countries";const d={};const g={};t!==void 0&&(g.index=t.toString());e!==void 0&&(g.startDate=e.toString());r!==void 0&&(g.endDate=r.toString());o!==void 0&&(g.limit=o.toString());i!==void 0&&(g.offset=i.toString());a!==void 0&&(g.tags=a.toString());const c={method:"GET",path:s,queryParameters:g,headers:d};return h.request(c,n)},
/**
     * Retrieves the most frequently used filter attributes.  These are attributes of your records that you included in the `attributesForFaceting` setting.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopFilterAttributes - The getTopFilterAttributes object.
     * @param getTopFilterAttributes.index - Index name.
     * @param getTopFilterAttributes.search - Search query.
     * @param getTopFilterAttributes.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFilterAttributes.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFilterAttributes.limit - Number of items to return.
     * @param getTopFilterAttributes.offset - Position of the first item to return.
     * @param getTopFilterAttributes.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getTopFilterAttributes({index:t,search:e,startDate:r,endDate:o,limit:i,offset:a,tags:n},s){if(!t)throw new Error("Parameter `index` is required when calling `getTopFilterAttributes`.");const d="/2/filters";const g={};const c={};t!==void 0&&(c.index=t.toString());e!==void 0&&(c.search=e.toString());r!==void 0&&(c.startDate=r.toString());o!==void 0&&(c.endDate=o.toString());i!==void 0&&(c.limit=i.toString());a!==void 0&&(c.offset=a.toString());n!==void 0&&(c.tags=n.toString());const l={method:"GET",path:d,queryParameters:c,headers:g};return h.request(l,s)},
/**
     * Retrieves the most frequent filter (facet) values for a filter attribute.  These are attributes of your records that you included in the `attributesForFaceting` setting.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopFilterForAttribute - The getTopFilterForAttribute object.
     * @param getTopFilterForAttribute.attribute - Attribute name.
     * @param getTopFilterForAttribute.index - Index name.
     * @param getTopFilterForAttribute.search - Search query.
     * @param getTopFilterForAttribute.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFilterForAttribute.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFilterForAttribute.limit - Number of items to return.
     * @param getTopFilterForAttribute.offset - Position of the first item to return.
     * @param getTopFilterForAttribute.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getTopFilterForAttribute({attribute:t,index:e,search:r,startDate:o,endDate:i,limit:a,offset:n,tags:s},d){if(!t)throw new Error("Parameter `attribute` is required when calling `getTopFilterForAttribute`.");if(!e)throw new Error("Parameter `index` is required when calling `getTopFilterForAttribute`.");const g="/2/filters/{attribute}".replace("{attribute}",encodeURIComponent(t));const c={};const l={};e!==void 0&&(l.index=e.toString());r!==void 0&&(l.search=r.toString());o!==void 0&&(l.startDate=o.toString());i!==void 0&&(l.endDate=i.toString());a!==void 0&&(l.limit=a.toString());n!==void 0&&(l.offset=n.toString());s!==void 0&&(l.tags=s.toString());const u={method:"GET",path:g,queryParameters:l,headers:c};return h.request(u,d)},
/**
     * Retrieves the most frequently used filters for a search that didn\'t return any results.  To get the most frequent searches without results, use the [Retrieve searches without results](#tag/search/operation/getSearchesNoResults) operation.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopFiltersNoResults - The getTopFiltersNoResults object.
     * @param getTopFiltersNoResults.index - Index name.
     * @param getTopFiltersNoResults.search - Search query.
     * @param getTopFiltersNoResults.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFiltersNoResults.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopFiltersNoResults.limit - Number of items to return.
     * @param getTopFiltersNoResults.offset - Position of the first item to return.
     * @param getTopFiltersNoResults.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getTopFiltersNoResults({index:t,search:e,startDate:r,endDate:o,limit:i,offset:a,tags:n},s){if(!t)throw new Error("Parameter `index` is required when calling `getTopFiltersNoResults`.");const d="/2/filters/noResults";const g={};const c={};t!==void 0&&(c.index=t.toString());e!==void 0&&(c.search=e.toString());r!==void 0&&(c.startDate=r.toString());o!==void 0&&(c.endDate=o.toString());i!==void 0&&(c.limit=i.toString());a!==void 0&&(c.offset=a.toString());n!==void 0&&(c.tags=n.toString());const l={method:"GET",path:d,queryParameters:c,headers:g};return h.request(l,s)},
/**
     * Retrieves the object IDs of the most frequent search results.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopHits - The getTopHits object.
     * @param getTopHits.index - Index name.
     * @param getTopHits.search - Search query.
     * @param getTopHits.clickAnalytics - Whether to include metrics related to click and conversion events in the response.
     * @param getTopHits.revenueAnalytics - Whether to include revenue-related metrics in the response.  If true, metrics related to click and conversion events are also included in the response.
     * @param getTopHits.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopHits.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopHits.limit - Number of items to return.
     * @param getTopHits.offset - Position of the first item to return.
     * @param getTopHits.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getTopHits({index:t,search:e,clickAnalytics:r,revenueAnalytics:o,startDate:i,endDate:a,limit:n,offset:s,tags:d},g){if(!t)throw new Error("Parameter `index` is required when calling `getTopHits`.");const c="/2/hits";const l={};const u={};t!==void 0&&(u.index=t.toString());e!==void 0&&(u.search=e.toString());r!==void 0&&(u.clickAnalytics=r.toString());o!==void 0&&(u.revenueAnalytics=o.toString());i!==void 0&&(u.startDate=i.toString());a!==void 0&&(u.endDate=a.toString());n!==void 0&&(u.limit=n.toString());s!==void 0&&(u.offset=s.toString());d!==void 0&&(u.tags=d.toString());const v={method:"GET",path:c,queryParameters:u,headers:l};return h.request(v,g)},
/**
     * Returns the most popular search terms.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getTopSearches - The getTopSearches object.
     * @param getTopSearches.index - Index name.
     * @param getTopSearches.clickAnalytics - Whether to include metrics related to click and conversion events in the response.
     * @param getTopSearches.revenueAnalytics - Whether to include revenue-related metrics in the response.  If true, metrics related to click and conversion events are also included in the response.
     * @param getTopSearches.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopSearches.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getTopSearches.orderBy - Attribute by which to order the response items.  If the `clickAnalytics` parameter is false, only `searchCount` is available.
     * @param getTopSearches.direction - Sorting direction of the results: ascending or descending.
     * @param getTopSearches.limit - Number of items to return.
     * @param getTopSearches.offset - Position of the first item to return.
     * @param getTopSearches.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getTopSearches({index:t,clickAnalytics:e,revenueAnalytics:r,startDate:o,endDate:i,orderBy:a,direction:n,limit:s,offset:d,tags:g},c){if(!t)throw new Error("Parameter `index` is required when calling `getTopSearches`.");const l="/2/searches";const u={};const v={};t!==void 0&&(v.index=t.toString());e!==void 0&&(v.clickAnalytics=e.toString());r!==void 0&&(v.revenueAnalytics=r.toString());o!==void 0&&(v.startDate=o.toString());i!==void 0&&(v.endDate=i.toString());a!==void 0&&(v.orderBy=a.toString());n!==void 0&&(v.direction=n.toString());s!==void 0&&(v.limit=s.toString());d!==void 0&&(v.offset=d.toString());g!==void 0&&(v.tags=g.toString());const m={method:"GET",path:l,queryParameters:v,headers:u};return h.request(m,c)},
/**
     * Retrieves the number of unique users within a time range, including a daily breakdown.  Since this endpoint returns the number of unique users, the sum of the daily values might be different from the total number.  By default, Algolia distinguishes search users by their IP address, _unless_ you include a pseudonymous user identifier in your search requests with the `userToken` API parameter or `x-algolia-usertoken` request header. By default, the analyzed period includes the last eight days including the current day.
     *
     * Required API Key ACLs:
     *  - analytics
     * @param getUsersCount - The getUsersCount object.
     * @param getUsersCount.index - Index name.
     * @param getUsersCount.startDate - Start date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getUsersCount.endDate - End date of the period to analyze, in `YYYY-MM-DD` format.
     * @param getUsersCount.tags - Tags by which to segment the analytics.  You can combine multiple tags with `OR` and `AND`. Tags must be URL-encoded. For more information, see [Segment your analytics data](https://www.algolia.com/doc/guides/search-analytics/guides/segments/).
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getUsersCount({index:t,startDate:e,endDate:r,tags:o},i){if(!t)throw new Error("Parameter `index` is required when calling `getUsersCount`.");const a="/2/users/count";const n={};const s={};t!==void 0&&(s.index=t.toString());e!==void 0&&(s.startDate=e.toString());r!==void 0&&(s.endDate=r.toString());o!==void 0&&(s.tags=o.toString());const d={method:"GET",path:a,queryParameters:s,headers:n};return h.request(d,i)}}}function analyticsClient(e,r,o,c){if(!e||typeof e!=="string")throw new Error("`appId` is missing.");if(!r||typeof r!=="string")throw new Error("`apiKey` is missing.");if(o&&(typeof o!=="string"||!g.includes(o)))throw new Error(`\`region\` must be one of the following: ${g.join(", ")}`);return createAnalyticsClient({appId:e,apiKey:r,region:o,timeouts:{connect:1e3,read:2e3,write:3e4},logger:i(),requester:t(),algoliaAgents:[{segment:"Browser"}],authMode:"WithinQueryParameters",responsesCache:a(),requestsCache:a({serializable:false}),hostsCache:n({caches:[s({key:`${d}-${e}`}),a()]}),...c})}export{analyticsClient,d as apiClientVersion};

