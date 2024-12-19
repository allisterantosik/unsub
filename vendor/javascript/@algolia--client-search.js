// @algolia/client-search@5.17.0 downloaded from https://ga.jspm.io/npm:@algolia/client-search@5.17.0/dist/builds/browser.js

import{createXhrRequester as e}from"@algolia/requester-browser-xhr";import{shuffle as r,createAuth as t,createTransporter as a,getAlgoliaAgent as n,createIterablePromise as s,ApiError as o,createNullLogger as i,createMemoryCache as c,createFallbackableCache as d,createBrowserLocalStorageCache as h}from"@algolia/client-common";var m="5.17.0";function getDefaultHosts(e){return[{url:`${e}-dsn.algolia.net`,accept:"read",protocol:"https"},{url:`${e}.algolia.net`,accept:"write",protocol:"https"}].concat(r([{url:`${e}-1.algolianet.com`,accept:"readWrite",protocol:"https"},{url:`${e}-2.algolianet.com`,accept:"readWrite",protocol:"https"},{url:`${e}-3.algolianet.com`,accept:"readWrite",protocol:"https"}]))}function createSearchClient({appId:e,apiKey:r,authMode:i,algoliaAgents:c,...d}){const h=t(e,r,i);const u=a({hosts:getDefaultHosts(e),...d,algoliaAgent:n({algoliaAgents:c,client:"Search",version:m}),baseHeaders:{"content-type":"text/plain",...h.headers(),...d.baseHeaders},baseQueryParameters:{...h.queryParameters(),...d.baseQueryParameters}});return{transporter:u,appId:e,clearCache(){return Promise.all([u.requestsCache.clear(),u.responsesCache.clear()]).then((()=>{}))},get _ua(){return u.algoliaAgent.value},
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
setClientApiKey({apiKey:e}){i&&i!=="WithinHeaders"?u.baseQueryParameters["x-algolia-api-key"]=e:u.baseHeaders["x-algolia-api-key"]=e},
/**
     * Helper: Wait for a task to be published (completed) for a given `indexName` and `taskID`.
     *
     * @summary Helper method that waits for a task to be published (completed).
     * @param waitForTaskOptions - The `waitForTaskOptions` object.
     * @param waitForTaskOptions.indexName - The `indexName` where the operation was performed.
     * @param waitForTaskOptions.taskID - The `taskID` returned in the method response.
     * @param waitForTaskOptions.maxRetries - The maximum number of retries. 50 by default.
     * @param waitForTaskOptions.timeout - The function to decide how long to wait between retries.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
waitForTask({indexName:e,taskID:r,maxRetries:t=50,timeout:a=(e=>Math.min(e*200,5e3))},n){let o=0;return s({func:()=>this.getTask({indexName:e,taskID:r},n),validate:e=>e.status==="published",aggregator:()=>o+=1,error:{validate:()=>o>=t,message:()=>`The maximum number of retries exceeded. (${o}/${t})`},timeout:()=>a(o)})},
/**
     * Helper: Wait for an application-level task to complete for a given `taskID`.
     *
     * @summary Helper method that waits for a task to be published (completed).
     * @param waitForAppTaskOptions - The `waitForTaskOptions` object.
     * @param waitForAppTaskOptions.taskID - The `taskID` returned in the method response.
     * @param waitForAppTaskOptions.maxRetries - The maximum number of retries. 50 by default.
     * @param waitForAppTaskOptions.timeout - The function to decide how long to wait between retries.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
waitForAppTask({taskID:e,maxRetries:r=50,timeout:t=(e=>Math.min(e*200,5e3))},a){let n=0;return s({func:()=>this.getAppTask({taskID:e},a),validate:e=>e.status==="published",aggregator:()=>n+=1,error:{validate:()=>n>=r,message:()=>`The maximum number of retries exceeded. (${n}/${r})`},timeout:()=>t(n)})},
/**
     * Helper: Wait for an API key to be added, updated or deleted based on a given `operation`.
     *
     * @summary Helper method that waits for an API key task to be processed.
     * @param waitForApiKeyOptions - The `waitForApiKeyOptions` object.
     * @param waitForApiKeyOptions.operation - The `operation` that was done on a `key`.
     * @param waitForApiKeyOptions.key - The `key` that has been added, deleted or updated.
     * @param waitForApiKeyOptions.apiKey - Necessary to know if an `update` operation has been processed, compare fields of the response with it.
     * @param waitForApiKeyOptions.maxRetries - The maximum number of retries. 50 by default.
     * @param waitForApiKeyOptions.timeout - The function to decide how long to wait between retries.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getApikey` method and merged with the transporter requestOptions.
     */
waitForApiKey({operation:e,key:r,apiKey:t,maxRetries:a=50,timeout:n=(e=>Math.min(e*200,5e3))},o){let i=0;const c={aggregator:()=>i+=1,error:{validate:()=>i>=a,message:()=>`The maximum number of retries exceeded. (${i}/${a})`},timeout:()=>n(i)};if(e==="update"){if(!t)throw new Error("`apiKey` is required when waiting for an `update` operation.");return s({...c,func:()=>this.getApiKey({key:r},o),validate:e=>{for(const r of Object.keys(t)){const a=t[r];const n=e[r];if(Array.isArray(a)&&Array.isArray(n)){if(a.length!==n.length||a.some(((e,r)=>e!==n[r])))return false}else if(a!==n)return false}return true}})}return s({...c,func:()=>this.getApiKey({key:r},o).catch((e=>{if(e.status!==404)throw e})),validate:r=>e==="add"?r!==void 0:r===void 0})},
/**
     * Helper: Iterate on the `browse` method of the client to allow aggregating objects of an index.
     *
     * @summary Helper method that iterates on the `browse` method.
     * @param browseObjects - The `browseObjects` object.
     * @param browseObjects.indexName - The index in which to perform the request.
     * @param browseObjects.browseParams - The `browse` parameters.
     * @param browseObjects.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is no `cursor` in the response.
     * @param browseObjects.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `browse` method and merged with the transporter requestOptions.
     */
browseObjects({indexName:e,browseParams:r,...t},a){return s({func:t=>this.browse({indexName:e,browseParams:{cursor:t?t.cursor:void 0,hitsPerPage:1e3,...r}},a),validate:e=>e.cursor===void 0,...t})},
/**
     * Helper: Iterate on the `searchRules` method of the client to allow aggregating rules of an index.
     *
     * @summary Helper method that iterates on the `searchRules` method.
     * @param browseRules - The `browseRules` object.
     * @param browseRules.indexName - The index in which to perform the request.
     * @param browseRules.searchRulesParams - The `searchRules` method parameters.
     * @param browseRules.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is less hits returned than the number of maximum hits (1000).
     * @param browseRules.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `searchRules` method and merged with the transporter requestOptions.
     */
browseRules({indexName:e,searchRulesParams:r,...t},a){const n={hitsPerPage:1e3,...r};return s({func:r=>this.searchRules({indexName:e,searchRulesParams:{...n,page:r?r.page+1:n.page||0}},a),validate:e=>e.hits.length<n.hitsPerPage,...t})},
/**
     * Helper: Iterate on the `searchSynonyms` method of the client to allow aggregating rules of an index.
     *
     * @summary Helper method that iterates on the `searchSynonyms` method.
     * @param browseSynonyms - The `browseSynonyms` object.
     * @param browseSynonyms.indexName - The index in which to perform the request.
     * @param browseSynonyms.validate - The validator function. It receive the resolved return of the API call. By default, stops when there is less hits returned than the number of maximum hits (1000).
     * @param browseSynonyms.aggregator - The function that runs right after the API call has been resolved, allows you to do anything with the response before `validate`.
     * @param browseSynonyms.searchSynonymsParams - The `searchSynonyms` method parameters.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `searchSynonyms` method and merged with the transporter requestOptions.
     */
browseSynonyms({indexName:e,searchSynonymsParams:r,...t},a){const n={page:0,...r,hitsPerPage:1e3};return s({func:r=>{const t=this.searchSynonyms({indexName:e,searchSynonymsParams:{...n,page:n.page}},a);n.page+=1;return t},validate:e=>e.hits.length<n.hitsPerPage,...t})},
/**
     * Helper: Chunks the given `objects` list in subset of 1000 elements max in order to make it fit in `batch` requests.
     *
     * @summary Helper: Chunks the given `objects` list in subset of 1000 elements max in order to make it fit in `batch` requests.
     * @param chunkedBatch - The `chunkedBatch` object.
     * @param chunkedBatch.indexName - The `indexName` to replace `objects` in.
     * @param chunkedBatch.objects - The array of `objects` to store in the given Algolia `indexName`.
     * @param chunkedBatch.action - The `batch` `action` to perform on the given array of `objects`, defaults to `addObject`.
     * @param chunkedBatch.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param chunkedBatch.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
async chunkedBatch({indexName:e,objects:r,action:t="addObject",waitForTasks:a,batchSize:n=1e3},s){let o=[];const i=[];const c=r.entries();for(const[a,d]of c){o.push({action:t,body:d});if(o.length===n||a===r.length-1){i.push(await this.batch({indexName:e,batchWriteParams:{requests:o}},s));o=[]}}if(a)for(const r of i)await this.waitForTask({indexName:e,taskID:r.taskID});return i},
/**
     * Helper: Saves the given array of objects in the given index. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     *
     * @summary Helper: Saves the given array of objects in the given index. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     * @param saveObjects - The `saveObjects` object.
     * @param saveObjects.indexName - The `indexName` to save `objects` in.
     * @param saveObjects.objects - The array of `objects` to store in the given Algolia `indexName`.
     * @param chunkedBatch.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
     * @param saveObjects.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch` method and merged with the transporter requestOptions.
     */
async saveObjects({indexName:e,objects:r,waitForTasks:t,batchSize:a},n){return await this.chunkedBatch({indexName:e,objects:r,action:"addObject",waitForTasks:t,batchSize:a},n)},
/**
     * Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.
     *
     * @summary Helper: Deletes every records for the given objectIDs. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objectIDs in it.
     * @param deleteObjects - The `deleteObjects` object.
     * @param deleteObjects.indexName - The `indexName` to delete `objectIDs` from.
     * @param deleteObjects.objectIDs - The objectIDs to delete.
     * @param chunkedBatch.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
     * @param deleteObjects.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch` method and merged with the transporter requestOptions.
     */
async deleteObjects({indexName:e,objectIDs:r,waitForTasks:t,batchSize:a},n){return await this.chunkedBatch({indexName:e,objects:r.map((e=>({objectID:e}))),action:"deleteObject",waitForTasks:t,batchSize:a},n)},
/**
     * Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     *
     * @summary Helper: Replaces object content of all the given objects according to their respective `objectID` field. The `chunkedBatch` helper is used under the hood, which creates a `batch` requests with at most 1000 objects in it.
     * @param partialUpdateObjects - The `partialUpdateObjects` object.
     * @param partialUpdateObjects.indexName - The `indexName` to update `objects` in.
     * @param partialUpdateObjects.objects - The array of `objects` to update in the given Algolia `indexName`.
     * @param partialUpdateObjects.createIfNotExists - To be provided if non-existing objects are passed, otherwise, the call will fail..
     * @param chunkedBatch.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `length(objects) / batchSize`. Defaults to 1000.
     * @param partialUpdateObjects.waitForTasks - Whether or not we should wait until every `batch` tasks has been processed, this operation may slow the total execution time of this method but is more reliable.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `getTask` method and merged with the transporter requestOptions.
     */
async partialUpdateObjects({indexName:e,objects:r,createIfNotExists:t,waitForTasks:a,batchSize:n},s){return await this.chunkedBatch({indexName:e,objects:r,action:t?"partialUpdateObject":"partialUpdateObjectNoCreate",batchSize:n,waitForTasks:a},s)},
/**
     * Helper: Replaces all objects (records) in the given `index_name` with the given `objects`. A temporary index is created during this process in order to backup your data.
     * See https://api-clients-automation.netlify.app/docs/add-new-api-client#5-helpers for implementation details.
     *
     * @summary Helper: Replaces all objects (records) in the given `index_name` with the given `objects`. A temporary index is created during this process in order to backup your data.
     * @param replaceAllObjects - The `replaceAllObjects` object.
     * @param replaceAllObjects.indexName - The `indexName` to replace `objects` in.
     * @param replaceAllObjects.objects - The array of `objects` to store in the given Algolia `indexName`.
     * @param replaceAllObjects.batchSize - The size of the chunk of `objects`. The number of `batch` calls will be equal to `objects.length / batchSize`. Defaults to 1000.
     * @param requestOptions - The requestOptions to send along with the query, they will be forwarded to the `batch`, `operationIndex` and `getTask` method and merged with the transporter requestOptions.
     */
async replaceAllObjects({indexName:e,objects:r,batchSize:t},a){const n=Math.floor(Math.random()*1e6)+1e5;const s=`${e}_tmp_${n}`;let o=await this.operationIndex({indexName:e,operationIndexParams:{operation:"copy",destination:s,scope:["settings","rules","synonyms"]}},a);const i=await this.chunkedBatch({indexName:s,objects:r,waitForTasks:true,batchSize:t},a);await this.waitForTask({indexName:s,taskID:o.taskID});o=await this.operationIndex({indexName:e,operationIndexParams:{operation:"copy",destination:s,scope:["settings","rules","synonyms"]}},a);await this.waitForTask({indexName:s,taskID:o.taskID});const c=await this.operationIndex({indexName:s,operationIndexParams:{operation:"move",destination:e}},a);await this.waitForTask({indexName:s,taskID:c.taskID});return{copyOperationResponse:o,batchResponses:i,moveOperationResponse:c}},async indexExists({indexName:e}){try{await this.getSettings({indexName:e})}catch(e){if(e instanceof o&&e.status===404)return false;throw e}return true},
/**
     * Helper: calls the `search` method but with certainty that we will only request Algolia records (hits) and not facets.
     * Disclaimer: We don't assert that the parameters you pass to this method only contains `hits` requests to prevent impacting search performances, this helper is purely for typing purposes.
     *
     * @summary Search multiple indices for `hits`.
     * @param searchMethodParams - Query requests and strategies. Results will be received in the same order as the queries.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchForHits(e,r){return this.search(e,r)},
/**
     * Helper: calls the `search` method but with certainty that we will only request Algolia facets and not records (hits).
     * Disclaimer: We don't assert that the parameters you pass to this method only contains `facets` requests to prevent impacting search performances, this helper is purely for typing purposes.
     *
     * @summary Search multiple indices for `facets`.
     * @param searchMethodParams - Query requests and strategies. Results will be received in the same order as the queries.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchForFacets(e,r){return this.search(e,r)},
/**
     * Creates a new API key with specific permissions and restrictions.
     *
     * Required API Key ACLs:
     *  - admin
     * @param apiKey - The apiKey object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
addApiKey(e,r){if(!e)throw new Error("Parameter `apiKey` is required when calling `addApiKey`.");if(!e.acl)throw new Error("Parameter `apiKey.acl` is required when calling `addApiKey`.");const t="/1/keys";const a={};const n={};const s={method:"POST",path:t,queryParameters:n,headers:a,data:e};return u.request(s,r)},
/**
     * If a record with the specified object ID exists, the existing record is replaced. Otherwise, a new record is added to the index.  If you want to use auto-generated object IDs, use the [`saveObject` operation](#tag/Records/operation/saveObject). To update _some_ attributes of an existing record, use the [`partial` operation](#tag/Records/operation/partialUpdateObject) instead. To add, update, or replace multiple records, use the [`batch` operation](#tag/Records/operation/batch).
     *
     * Required API Key ACLs:
     *  - addObject
     * @param addOrUpdateObject - The addOrUpdateObject object.
     * @param addOrUpdateObject.indexName - Name of the index on which to perform the operation.
     * @param addOrUpdateObject.objectID - Unique record identifier.
     * @param addOrUpdateObject.body - The record. A schemaless object with attributes that are useful in the context of search and discovery.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
addOrUpdateObject({indexName:e,objectID:r,body:t},a){if(!e)throw new Error("Parameter `indexName` is required when calling `addOrUpdateObject`.");if(!r)throw new Error("Parameter `objectID` is required when calling `addOrUpdateObject`.");if(!t)throw new Error("Parameter `body` is required when calling `addOrUpdateObject`.");const n="/1/indexes/{indexName}/{objectID}".replace("{indexName}",encodeURIComponent(e)).replace("{objectID}",encodeURIComponent(r));const s={};const o={};const i={method:"PUT",path:n,queryParameters:o,headers:s,data:t};return u.request(i,a)},
/**
     * Adds a source to the list of allowed sources.
     *
     * Required API Key ACLs:
     *  - admin
     * @param source - Source to add.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
appendSource(e,r){if(!e)throw new Error("Parameter `source` is required when calling `appendSource`.");if(!e.source)throw new Error("Parameter `source.source` is required when calling `appendSource`.");const t="/1/security/sources/append";const a={};const n={};const s={method:"POST",path:t,queryParameters:n,headers:a,data:e};return u.request(s,r)},
/**
     * Assigns or moves a user ID to a cluster.  The time it takes to move a user is proportional to the amount of data linked to the user ID.
     *
     * Required API Key ACLs:
     *  - admin
     * @param assignUserId - The assignUserId object.
     * @param assignUserId.xAlgoliaUserID - Unique identifier of the user who makes the search request.
     * @param assignUserId.assignUserIdParams - The assignUserIdParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
assignUserId({xAlgoliaUserID:e,assignUserIdParams:r},t){if(!e)throw new Error("Parameter `xAlgoliaUserID` is required when calling `assignUserId`.");if(!r)throw new Error("Parameter `assignUserIdParams` is required when calling `assignUserId`.");if(!r.cluster)throw new Error("Parameter `assignUserIdParams.cluster` is required when calling `assignUserId`.");const a="/1/clusters/mapping";const n={};const s={};e!==void 0&&(n["X-Algolia-User-ID"]=e.toString());const o={method:"POST",path:a,queryParameters:s,headers:n,data:r};return u.request(o,t)},
/**
     * Adds, updates, or deletes records in one index with a single API request.  Batching index updates reduces latency and increases data integrity.  - Actions are applied in the order they\'re specified. - Actions are equivalent to the individual API requests of the same name.  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     * @param batch - The batch object.
     * @param batch.indexName - Name of the index on which to perform the operation.
     * @param batch.batchWriteParams - The batchWriteParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
batch({indexName:e,batchWriteParams:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `batch`.");if(!r)throw new Error("Parameter `batchWriteParams` is required when calling `batch`.");if(!r.requests)throw new Error("Parameter `batchWriteParams.requests` is required when calling `batch`.");const a="/1/indexes/{indexName}/batch".replace("{indexName}",encodeURIComponent(e));const n={};const s={};const o={method:"POST",path:a,queryParameters:s,headers:n,data:r};return u.request(o,t)},
/**
     * Assigns multiple user IDs to a cluster.  **You can\'t move users with this operation**.
     *
     * Required API Key ACLs:
     *  - admin
     * @param batchAssignUserIds - The batchAssignUserIds object.
     * @param batchAssignUserIds.xAlgoliaUserID - Unique identifier of the user who makes the search request.
     * @param batchAssignUserIds.batchAssignUserIdsParams - The batchAssignUserIdsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
batchAssignUserIds({xAlgoliaUserID:e,batchAssignUserIdsParams:r},t){if(!e)throw new Error("Parameter `xAlgoliaUserID` is required when calling `batchAssignUserIds`.");if(!r)throw new Error("Parameter `batchAssignUserIdsParams` is required when calling `batchAssignUserIds`.");if(!r.cluster)throw new Error("Parameter `batchAssignUserIdsParams.cluster` is required when calling `batchAssignUserIds`.");if(!r.users)throw new Error("Parameter `batchAssignUserIdsParams.users` is required when calling `batchAssignUserIds`.");const a="/1/clusters/mapping/batch";const n={};const s={};e!==void 0&&(n["X-Algolia-User-ID"]=e.toString());const o={method:"POST",path:a,queryParameters:s,headers:n,data:r};return u.request(o,t)},
/**
     * Adds or deletes multiple entries from your plurals, segmentation, or stop word dictionaries.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param batchDictionaryEntries - The batchDictionaryEntries object.
     * @param batchDictionaryEntries.dictionaryName - Dictionary type in which to search.
     * @param batchDictionaryEntries.batchDictionaryEntriesParams - The batchDictionaryEntriesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
batchDictionaryEntries({dictionaryName:e,batchDictionaryEntriesParams:r},t){if(!e)throw new Error("Parameter `dictionaryName` is required when calling `batchDictionaryEntries`.");if(!r)throw new Error("Parameter `batchDictionaryEntriesParams` is required when calling `batchDictionaryEntries`.");if(!r.requests)throw new Error("Parameter `batchDictionaryEntriesParams.requests` is required when calling `batchDictionaryEntries`.");const a="/1/dictionaries/{dictionaryName}/batch".replace("{dictionaryName}",encodeURIComponent(e));const n={};const s={};const o={method:"POST",path:a,queryParameters:s,headers:n,data:r};return u.request(o,t)},
/**
     * Retrieves records from an index, up to 1,000 per request.  While searching retrieves _hits_ (records augmented with attributes for highlighting and ranking details), browsing _just_ returns matching records. This can be useful if you want to export your indices.  - The Analytics API doesn\'t collect data when using `browse`. - Records are ranked by attributes and custom ranking. - There\'s no ranking for: typo-tolerance, number of matched words, proximity, geo distance.  Browse requests automatically apply these settings:  - `advancedSyntax`: `false` - `attributesToHighlight`: `[]` - `attributesToSnippet`: `[]` - `distinct`: `false` - `enablePersonalization`: `false` - `enableRules`: `false` - `facets`: `[]` - `getRankingInfo`: `false` - `ignorePlurals`: `false` - `optionalFilters`: `[]` - `typoTolerance`: `true` or `false` (`min` and `strict` evaluate to `true`)  If you send these parameters with your browse requests, they\'ll be ignored.
     *
     * Required API Key ACLs:
     *  - browse
     * @param browse - The browse object.
     * @param browse.indexName - Name of the index on which to perform the operation.
     * @param browse.browseParams - The browseParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
browse({indexName:e,browseParams:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `browse`.");const a="/1/indexes/{indexName}/browse".replace("{indexName}",encodeURIComponent(e));const n={};const s={};const o={method:"POST",path:a,queryParameters:s,headers:n,data:r||{},useReadTransporter:true};return u.request(o,t)},
/**
     * Deletes only the records from an index while keeping settings, synonyms, and rules. This operation is resource-intensive and subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - deleteIndex
     * @param clearObjects - The clearObjects object.
     * @param clearObjects.indexName - Name of the index on which to perform the operation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
clearObjects({indexName:e},r){if(!e)throw new Error("Parameter `indexName` is required when calling `clearObjects`.");const t="/1/indexes/{indexName}/clear".replace("{indexName}",encodeURIComponent(e));const a={};const n={};const s={method:"POST",path:t,queryParameters:n,headers:a};return u.request(s,r)},
/**
     * Deletes all rules from the index.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param clearRules - The clearRules object.
     * @param clearRules.indexName - Name of the index on which to perform the operation.
     * @param clearRules.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
clearRules({indexName:e,forwardToReplicas:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `clearRules`.");const a="/1/indexes/{indexName}/rules/clear".replace("{indexName}",encodeURIComponent(e));const n={};const s={};r!==void 0&&(s.forwardToReplicas=r.toString());const o={method:"POST",path:a,queryParameters:s,headers:n};return u.request(o,t)},
/**
     * Deletes all synonyms from the index.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param clearSynonyms - The clearSynonyms object.
     * @param clearSynonyms.indexName - Name of the index on which to perform the operation.
     * @param clearSynonyms.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
clearSynonyms({indexName:e,forwardToReplicas:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `clearSynonyms`.");const a="/1/indexes/{indexName}/synonyms/clear".replace("{indexName}",encodeURIComponent(e));const n={};const s={};r!==void 0&&(s.forwardToReplicas=r.toString());const o={method:"POST",path:a,queryParameters:s,headers:n};return u.request(o,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customDelete({path:e,parameters:r},t){if(!e)throw new Error("Parameter `path` is required when calling `customDelete`.");const a="/{path}".replace("{path}",e);const n={};const s=r||{};const o={method:"DELETE",path:a,queryParameters:s,headers:n};return u.request(o,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customGet({path:e,parameters:r},t){if(!e)throw new Error("Parameter `path` is required when calling `customGet`.");const a="/{path}".replace("{path}",e);const n={};const s=r||{};const o={method:"GET",path:a,queryParameters:s,headers:n};return u.request(o,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPost({path:e,parameters:r,body:t},a){if(!e)throw new Error("Parameter `path` is required when calling `customPost`.");const n="/{path}".replace("{path}",e);const s={};const o=r||{};const i={method:"POST",path:n,queryParameters:o,headers:s,data:t||{}};return u.request(i,a)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPut({path:e,parameters:r,body:t},a){if(!e)throw new Error("Parameter `path` is required when calling `customPut`.");const n="/{path}".replace("{path}",e);const s={};const o=r||{};const i={method:"PUT",path:n,queryParameters:o,headers:s,data:t||{}};return u.request(i,a)},
/**
     * Deletes the API key.
     *
     * Required API Key ACLs:
     *  - admin
     * @param deleteApiKey - The deleteApiKey object.
     * @param deleteApiKey.key - API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteApiKey({key:e},r){if(!e)throw new Error("Parameter `key` is required when calling `deleteApiKey`.");const t="/1/keys/{key}".replace("{key}",encodeURIComponent(e));const a={};const n={};const s={method:"DELETE",path:t,queryParameters:n,headers:a};return u.request(s,r)},
/**
     * This operation doesn\'t accept empty filters.  This operation is resource-intensive. You should only use it if you can\'t get the object IDs of the records you want to delete. It\'s more efficient to get a list of object IDs with the [`browse` operation](#tag/Search/operation/browse), and then delete the records using the [`batch` operation](#tag/Records/operation/batch).  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - deleteIndex
     * @param deleteBy - The deleteBy object.
     * @param deleteBy.indexName - Name of the index on which to perform the operation.
     * @param deleteBy.deleteByParams - The deleteByParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteBy({indexName:e,deleteByParams:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `deleteBy`.");if(!r)throw new Error("Parameter `deleteByParams` is required when calling `deleteBy`.");const a="/1/indexes/{indexName}/deleteByQuery".replace("{indexName}",encodeURIComponent(e));const n={};const s={};const o={method:"POST",path:a,queryParameters:s,headers:n,data:r};return u.request(o,t)},
/**
     * Deletes an index and all its settings.  - Deleting an index doesn\'t delete its analytics data. - If you try to delete a non-existing index, the operation is ignored without warning. - If the index you want to delete has replica indices, the replicas become independent indices. - If the index you want to delete is a replica index, you must first unlink it from its primary index before you can delete it.   For more information, see [Delete replica indices](https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/how-to/deleting-replicas/).
     *
     * Required API Key ACLs:
     *  - deleteIndex
     * @param deleteIndex - The deleteIndex object.
     * @param deleteIndex.indexName - Name of the index on which to perform the operation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteIndex({indexName:e},r){if(!e)throw new Error("Parameter `indexName` is required when calling `deleteIndex`.");const t="/1/indexes/{indexName}".replace("{indexName}",encodeURIComponent(e));const a={};const n={};const s={method:"DELETE",path:t,queryParameters:n,headers:a};return u.request(s,r)},
/**
     * Deletes a record by its object ID.  To delete more than one record, use the [`batch` operation](#tag/Records/operation/batch). To delete records matching a query, use the [`deleteByQuery` operation](#tag/Records/operation/deleteBy).
     *
     * Required API Key ACLs:
     *  - deleteObject
     * @param deleteObject - The deleteObject object.
     * @param deleteObject.indexName - Name of the index on which to perform the operation.
     * @param deleteObject.objectID - Unique record identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteObject({indexName:e,objectID:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `deleteObject`.");if(!r)throw new Error("Parameter `objectID` is required when calling `deleteObject`.");const a="/1/indexes/{indexName}/{objectID}".replace("{indexName}",encodeURIComponent(e)).replace("{objectID}",encodeURIComponent(r));const n={};const s={};const o={method:"DELETE",path:a,queryParameters:s,headers:n};return u.request(o,t)},
/**
     * Deletes a rule by its ID. To find the object ID for rules, use the [`search` operation](#tag/Rules/operation/searchRules).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteRule - The deleteRule object.
     * @param deleteRule.indexName - Name of the index on which to perform the operation.
     * @param deleteRule.objectID - Unique identifier of a rule object.
     * @param deleteRule.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteRule({indexName:e,objectID:r,forwardToReplicas:t},a){if(!e)throw new Error("Parameter `indexName` is required when calling `deleteRule`.");if(!r)throw new Error("Parameter `objectID` is required when calling `deleteRule`.");const n="/1/indexes/{indexName}/rules/{objectID}".replace("{indexName}",encodeURIComponent(e)).replace("{objectID}",encodeURIComponent(r));const s={};const o={};t!==void 0&&(o.forwardToReplicas=t.toString());const i={method:"DELETE",path:n,queryParameters:o,headers:s};return u.request(i,a)},
/**
     * Deletes a source from the list of allowed sources.
     *
     * Required API Key ACLs:
     *  - admin
     * @param deleteSource - The deleteSource object.
     * @param deleteSource.source - IP address range of the source.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteSource({source:e},r){if(!e)throw new Error("Parameter `source` is required when calling `deleteSource`.");const t="/1/security/sources/{source}".replace("{source}",encodeURIComponent(e));const a={};const n={};const s={method:"DELETE",path:t,queryParameters:n,headers:a};return u.request(s,r)},
/**
     * Deletes a synonym by its ID. To find the object IDs of your synonyms, use the [`search` operation](#tag/Synonyms/operation/searchSynonyms).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param deleteSynonym - The deleteSynonym object.
     * @param deleteSynonym.indexName - Name of the index on which to perform the operation.
     * @param deleteSynonym.objectID - Unique identifier of a synonym object.
     * @param deleteSynonym.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteSynonym({indexName:e,objectID:r,forwardToReplicas:t},a){if(!e)throw new Error("Parameter `indexName` is required when calling `deleteSynonym`.");if(!r)throw new Error("Parameter `objectID` is required when calling `deleteSynonym`.");const n="/1/indexes/{indexName}/synonyms/{objectID}".replace("{indexName}",encodeURIComponent(e)).replace("{objectID}",encodeURIComponent(r));const s={};const o={};t!==void 0&&(o.forwardToReplicas=t.toString());const i={method:"DELETE",path:n,queryParameters:o,headers:s};return u.request(i,a)},
/**
     * Gets the permissions and restrictions of an API key.  When authenticating with the admin API key, you can request information for any of your application\'s keys. When authenticating with other API keys, you can only retrieve information for that key, with the description replaced by `<redacted>`.
     * @param getApiKey - The getApiKey object.
     * @param getApiKey.key - API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getApiKey({key:e},r){if(!e)throw new Error("Parameter `key` is required when calling `getApiKey`.");const t="/1/keys/{key}".replace("{key}",encodeURIComponent(e));const a={};const n={};const s={method:"GET",path:t,queryParameters:n,headers:a};return u.request(s,r)},
/**
     * Checks the status of a given application task.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param getAppTask - The getAppTask object.
     * @param getAppTask.taskID - Unique task identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getAppTask({taskID:e},r){if(!e)throw new Error("Parameter `taskID` is required when calling `getAppTask`.");const t="/1/task/{taskID}".replace("{taskID}",encodeURIComponent(e));const a={};const n={};const s={method:"GET",path:t,queryParameters:n,headers:a};return u.request(s,r)},
/**
     * Lists supported languages with their supported dictionary types and number of custom entries.
     *
     * Required API Key ACLs:
     *  - settings
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getDictionaryLanguages(e){const r="/1/dictionaries/*/languages";const t={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:t};return u.request(n,e)},
/**
     * Retrieves the languages for which standard dictionary entries are turned off.
     *
     * Required API Key ACLs:
     *  - settings
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getDictionarySettings(e){const r="/1/dictionaries/*/settings";const t={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:t};return u.request(n,e)},
/**
     * The request must be authenticated by an API key with the [`logs` ACL](https://www.algolia.com/doc/guides/security/api-keys/#access-control-list-acl).  - Logs are held for the last seven days. - Up to 1,000 API requests per server are logged. - This request counts towards your [operations quota](https://support.algolia.com/hc/en-us/articles/4406981829777-How-does-Algolia-count-records-and-operations-) but doesn\'t appear in the logs itself.
     *
     * Required API Key ACLs:
     *  - logs
     * @param getLogs - The getLogs object.
     * @param getLogs.offset - First log entry to retrieve. The most recent entries are listed first.
     * @param getLogs.length - Maximum number of entries to retrieve.
     * @param getLogs.indexName - Index for which to retrieve log entries. By default, log entries are retrieved for all indices.
     * @param getLogs.type - Type of log entries to retrieve. By default, all log entries are retrieved.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getLogs({offset:e,length:r,indexName:t,type:a}={},n=void 0){const s="/1/logs";const o={};const i={};e!==void 0&&(i.offset=e.toString());r!==void 0&&(i.length=r.toString());t!==void 0&&(i.indexName=t.toString());a!==void 0&&(i.type=a.toString());const c={method:"GET",path:s,queryParameters:i,headers:o};return u.request(c,n)},
/**
     * Retrieves one record by its object ID.  To retrieve more than one record, use the [`objects` operation](#tag/Records/operation/getObjects).
     *
     * Required API Key ACLs:
     *  - search
     * @param getObject - The getObject object.
     * @param getObject.indexName - Name of the index on which to perform the operation.
     * @param getObject.objectID - Unique record identifier.
     * @param getObject.attributesToRetrieve - Attributes to include with the records in the response. This is useful to reduce the size of the API response. By default, all retrievable attributes are returned.  `objectID` is always retrieved.  Attributes included in `unretrievableAttributes` won\'t be retrieved unless the request is authenticated with the admin API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getObject({indexName:e,objectID:r,attributesToRetrieve:t},a){if(!e)throw new Error("Parameter `indexName` is required when calling `getObject`.");if(!r)throw new Error("Parameter `objectID` is required when calling `getObject`.");const n="/1/indexes/{indexName}/{objectID}".replace("{indexName}",encodeURIComponent(e)).replace("{objectID}",encodeURIComponent(r));const s={};const o={};t!==void 0&&(o.attributesToRetrieve=t.toString());const i={method:"GET",path:n,queryParameters:o,headers:s};return u.request(i,a)},
/**
     * Retrieves one or more records, potentially from different indices.  Records are returned in the same order as the requests.
     *
     * Required API Key ACLs:
     *  - search
     * @param getObjectsParams - Request object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getObjects(e,r){if(!e)throw new Error("Parameter `getObjectsParams` is required when calling `getObjects`.");if(!e.requests)throw new Error("Parameter `getObjectsParams.requests` is required when calling `getObjects`.");const t="/1/indexes/*/objects";const a={};const n={};const s={method:"POST",path:t,queryParameters:n,headers:a,data:e,useReadTransporter:true,cacheable:true};return u.request(s,r)},
/**
     * Retrieves a rule by its ID. To find the object ID of rules, use the [`search` operation](#tag/Rules/operation/searchRules).
     *
     * Required API Key ACLs:
     *  - settings
     * @param getRule - The getRule object.
     * @param getRule.indexName - Name of the index on which to perform the operation.
     * @param getRule.objectID - Unique identifier of a rule object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getRule({indexName:e,objectID:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `getRule`.");if(!r)throw new Error("Parameter `objectID` is required when calling `getRule`.");const a="/1/indexes/{indexName}/rules/{objectID}".replace("{indexName}",encodeURIComponent(e)).replace("{objectID}",encodeURIComponent(r));const n={};const s={};const o={method:"GET",path:a,queryParameters:s,headers:n};return u.request(o,t)},
/**
     * Retrieves an object with non-null index settings.
     *
     * Required API Key ACLs:
     *  - search
     * @param getSettings - The getSettings object.
     * @param getSettings.indexName - Name of the index on which to perform the operation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getSettings({indexName:e},r){if(!e)throw new Error("Parameter `indexName` is required when calling `getSettings`.");const t="/1/indexes/{indexName}/settings".replace("{indexName}",encodeURIComponent(e));const a={};const n={};const s={method:"GET",path:t,queryParameters:n,headers:a};return u.request(s,r)},
/**
     * Retrieves all allowed IP addresses with access to your application.
     *
     * Required API Key ACLs:
     *  - admin
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getSources(e){const r="/1/security/sources";const t={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:t};return u.request(n,e)},
/**
     * Retrieves a synonym by its ID. To find the object IDs for your synonyms, use the [`search` operation](#tag/Synonyms/operation/searchSynonyms).
     *
     * Required API Key ACLs:
     *  - settings
     * @param getSynonym - The getSynonym object.
     * @param getSynonym.indexName - Name of the index on which to perform the operation.
     * @param getSynonym.objectID - Unique identifier of a synonym object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getSynonym({indexName:e,objectID:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `getSynonym`.");if(!r)throw new Error("Parameter `objectID` is required when calling `getSynonym`.");const a="/1/indexes/{indexName}/synonyms/{objectID}".replace("{indexName}",encodeURIComponent(e)).replace("{objectID}",encodeURIComponent(r));const n={};const s={};const o={method:"GET",path:a,queryParameters:s,headers:n};return u.request(o,t)},
/**
     * Checks the status of a given task.  Indexing tasks are asynchronous. When you add, update, or delete records or indices, a task is created on a queue and completed depending on the load on the server.  The indexing tasks\' responses include a task ID that you can use to check the status.
     *
     * Required API Key ACLs:
     *  - addObject
     * @param getTask - The getTask object.
     * @param getTask.indexName - Name of the index on which to perform the operation.
     * @param getTask.taskID - Unique task identifier.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getTask({indexName:e,taskID:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `getTask`.");if(!r)throw new Error("Parameter `taskID` is required when calling `getTask`.");const a="/1/indexes/{indexName}/task/{taskID}".replace("{indexName}",encodeURIComponent(e)).replace("{taskID}",encodeURIComponent(r));const n={};const s={};const o={method:"GET",path:a,queryParameters:s,headers:n};return u.request(o,t)},
/**
     * Get the IDs of the 10 users with the highest number of records per cluster.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
     *
     * Required API Key ACLs:
     *  - admin
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getTopUserIds(e){const r="/1/clusters/mapping/top";const t={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:t};return u.request(n,e)},
/**
     * Returns the user ID data stored in the mapping.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
     *
     * Required API Key ACLs:
     *  - admin
     * @param getUserId - The getUserId object.
     * @param getUserId.userID - Unique identifier of the user who makes the search request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getUserId({userID:e},r){if(!e)throw new Error("Parameter `userID` is required when calling `getUserId`.");const t="/1/clusters/mapping/{userID}".replace("{userID}",encodeURIComponent(e));const a={};const n={};const s={method:"GET",path:t,queryParameters:n,headers:a};return u.request(s,r)},
/**
     * To determine when the time-consuming process of creating a large batch of users or migrating users from one cluster to another is complete, this operation retrieves the status of the process.
     *
     * Required API Key ACLs:
     *  - admin
     * @param hasPendingMappings - The hasPendingMappings object.
     * @param hasPendingMappings.getClusters - Whether to include the cluster\'s pending mapping state in the response.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
hasPendingMappings({getClusters:e}={},r=void 0){const t="/1/clusters/mapping/pending";const a={};const n={};e!==void 0&&(n.getClusters=e.toString());const s={method:"GET",path:t,queryParameters:n,headers:a};return u.request(s,r)},
/**
     * Lists all API keys associated with your Algolia application, including their permissions and restrictions.
     *
     * Required API Key ACLs:
     *  - admin
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listApiKeys(e){const r="/1/keys";const t={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:t};return u.request(n,e)},
/**
     * Lists the available clusters in a multi-cluster setup.
     *
     * Required API Key ACLs:
     *  - admin
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listClusters(e){const r="/1/clusters";const t={};const a={};const n={method:"GET",path:r,queryParameters:a,headers:t};return u.request(n,e)},
/**
     * Lists all indices in the current Algolia application.  The request follows any index restrictions of the API key you use to make the request.
     *
     * Required API Key ACLs:
     *  - listIndexes
     * @param listIndices - The listIndices object.
     * @param listIndices.page - Requested page of the API response. If `null`, the API response is not paginated.
     * @param listIndices.hitsPerPage - Number of hits per page.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listIndices({page:e,hitsPerPage:r}={},t=void 0){const a="/1/indexes";const n={};const s={};e!==void 0&&(s.page=e.toString());r!==void 0&&(s.hitsPerPage=r.toString());const o={method:"GET",path:a,queryParameters:s,headers:n};return u.request(o,t)},
/**
     * Lists the userIDs assigned to a multi-cluster application.  Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.
     *
     * Required API Key ACLs:
     *  - admin
     * @param listUserIds - The listUserIds object.
     * @param listUserIds.page - Requested page of the API response. If `null`, the API response is not paginated.
     * @param listUserIds.hitsPerPage - Number of hits per page.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listUserIds({page:e,hitsPerPage:r}={},t=void 0){const a="/1/clusters/mapping";const n={};const s={};e!==void 0&&(s.page=e.toString());r!==void 0&&(s.hitsPerPage=r.toString());const o={method:"GET",path:a,queryParameters:s,headers:n};return u.request(o,t)},
/**
     * Adds, updates, or deletes records in multiple indices with a single API request.  - Actions are applied in the order they are specified. - Actions are equivalent to the individual API requests of the same name.  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     * @param batchParams - The batchParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
multipleBatch(e,r){if(!e)throw new Error("Parameter `batchParams` is required when calling `multipleBatch`.");if(!e.requests)throw new Error("Parameter `batchParams.requests` is required when calling `multipleBatch`.");const t="/1/indexes/*/batch";const a={};const n={};const s={method:"POST",path:t,queryParameters:n,headers:a,data:e};return u.request(s,r)},
/**
     * Copies or moves (renames) an index within the same Algolia application.  - Existing destination indices are overwritten, except for their analytics data. - If the destination index doesn\'t exist yet, it\'ll be created. - This operation is resource-intensive.  **Copy**  - Copying a source index that doesn\'t exist creates a new index with 0 records and default settings. - The API keys of the source index are merged with the existing keys in the destination index. - You can\'t copy the `enableReRanking`, `mode`, and `replicas` settings. - You can\'t copy to a destination index that already has replicas. - Be aware of the [size limits](https://www.algolia.com/doc/guides/scaling/algolia-service-limits/#application-record-and-index-limits). - Related guide: [Copy indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/copy-indices/)  **Move**  - Moving a source index that doesn\'t exist is ignored without returning an error. - When moving an index, the analytics data keeps its original name, and a new set of analytics data is started for the new name.   To access the original analytics in the dashboard, create an index with the original name. - If the destination index has replicas, moving will overwrite the existing index and copy the data to the replica indices. - Related guide: [Move indices](https://www.algolia.com/doc/guides/sending-and-managing-data/manage-indices-and-apps/manage-indices/how-to/move-indices/).  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - addObject
     * @param operationIndex - The operationIndex object.
     * @param operationIndex.indexName - Name of the index on which to perform the operation.
     * @param operationIndex.operationIndexParams - The operationIndexParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
operationIndex({indexName:e,operationIndexParams:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `operationIndex`.");if(!r)throw new Error("Parameter `operationIndexParams` is required when calling `operationIndex`.");if(!r.operation)throw new Error("Parameter `operationIndexParams.operation` is required when calling `operationIndex`.");if(!r.destination)throw new Error("Parameter `operationIndexParams.destination` is required when calling `operationIndex`.");const a="/1/indexes/{indexName}/operation".replace("{indexName}",encodeURIComponent(e));const n={};const s={};const o={method:"POST",path:a,queryParameters:s,headers:n,data:r};return u.request(o,t)},
/**
     * Adds new attributes to a record, or updates existing ones.  - If a record with the specified object ID doesn\'t exist,   a new record is added to the index **if** `createIfNotExists` is true. - If the index doesn\'t exist yet, this method creates a new index. - You can use any first-level attribute but not nested attributes.   If you specify a nested attribute, this operation replaces its first-level ancestor.  To update an attribute without pushing the entire record, you can use these built-in operations. These operations can be helpful if you don\'t have access to your initial data.  - Increment: increment a numeric attribute - Decrement: decrement a numeric attribute - Add: append a number or string element to an array attribute - Remove: remove all matching number or string elements from an array attribute made of numbers or strings - AddUnique: add a number or string element to an array attribute made of numbers or strings only if it\'s not already present - IncrementFrom: increment a numeric integer attribute only if the provided value matches the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementFrom value of 2 for the version attribute, but the current value of the attribute is 1, the engine ignores the update. If the object doesn\'t exist, the engine only creates it if you pass an IncrementFrom value of 0. - IncrementSet: increment a numeric integer attribute only if the provided value is greater than the current value, and otherwise ignore the whole object update. For example, if you pass an IncrementSet value of 2 for the version attribute, and the current value of the attribute is 1, the engine updates the object. If the object doesn\'t exist yet, the engine only creates it if you pass an IncrementSet value greater than 0.  You can specify an operation by providing an object with the attribute to update as the key and its value being an object with the following properties:  - _operation: the operation to apply on the attribute - value: the right-hand side argument to the operation, for example, increment or decrement step, value to add or remove.  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - addObject
     * @param partialUpdateObject - The partialUpdateObject object.
     * @param partialUpdateObject.indexName - Name of the index on which to perform the operation.
     * @param partialUpdateObject.objectID - Unique record identifier.
     * @param partialUpdateObject.attributesToUpdate - Attributes with their values.
     * @param partialUpdateObject.createIfNotExists - Whether to create a new record if it doesn\'t exist.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
partialUpdateObject({indexName:e,objectID:r,attributesToUpdate:t,createIfNotExists:a},n){if(!e)throw new Error("Parameter `indexName` is required when calling `partialUpdateObject`.");if(!r)throw new Error("Parameter `objectID` is required when calling `partialUpdateObject`.");if(!t)throw new Error("Parameter `attributesToUpdate` is required when calling `partialUpdateObject`.");const s="/1/indexes/{indexName}/{objectID}/partial".replace("{indexName}",encodeURIComponent(e)).replace("{objectID}",encodeURIComponent(r));const o={};const i={};a!==void 0&&(i.createIfNotExists=a.toString());const c={method:"POST",path:s,queryParameters:i,headers:o,data:t};return u.request(c,n)},
/**
     * Deletes a user ID and its associated data from the clusters.
     *
     * Required API Key ACLs:
     *  - admin
     * @param removeUserId - The removeUserId object.
     * @param removeUserId.userID - Unique identifier of the user who makes the search request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
removeUserId({userID:e},r){if(!e)throw new Error("Parameter `userID` is required when calling `removeUserId`.");const t="/1/clusters/mapping/{userID}".replace("{userID}",encodeURIComponent(e));const a={};const n={};const s={method:"DELETE",path:t,queryParameters:n,headers:a};return u.request(s,r)},
/**
     * Replaces the list of allowed sources.
     *
     * Required API Key ACLs:
     *  - admin
     * @param replaceSources - The replaceSources object.
     * @param replaceSources.source - Allowed sources.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
replaceSources({source:e},r){if(!e)throw new Error("Parameter `source` is required when calling `replaceSources`.");const t="/1/security/sources";const a={};const n={};const s={method:"PUT",path:t,queryParameters:n,headers:a,data:e};return u.request(s,r)},
/**
     * Restores a deleted API key.  Restoring resets the `validity` attribute to `0`.  Algolia stores up to 1,000 API keys per application. If you create more, the oldest API keys are deleted and can\'t be restored.
     *
     * Required API Key ACLs:
     *  - admin
     * @param restoreApiKey - The restoreApiKey object.
     * @param restoreApiKey.key - API key.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
restoreApiKey({key:e},r){if(!e)throw new Error("Parameter `key` is required when calling `restoreApiKey`.");const t="/1/keys/{key}/restore".replace("{key}",encodeURIComponent(e));const a={};const n={};const s={method:"POST",path:t,queryParameters:n,headers:a};return u.request(s,r)},
/**
     * Adds a record to an index or replaces it.  - If the record doesn\'t have an object ID, a new record with an auto-generated object ID is added to your index. - If a record with the specified object ID exists, the existing record is replaced. - If a record with the specified object ID doesn\'t exist, a new record is added to your index. - If you add a record to an index that doesn\'t exist yet, a new index is created.  To update _some_ attributes of a record, use the [`partial` operation](#tag/Records/operation/partialUpdateObject). To add, update, or replace multiple records, use the [`batch` operation](#tag/Records/operation/batch).  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - addObject
     * @param saveObject - The saveObject object.
     * @param saveObject.indexName - Name of the index on which to perform the operation.
     * @param saveObject.body - The record. A schemaless object with attributes that are useful in the context of search and discovery.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
saveObject({indexName:e,body:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `saveObject`.");if(!r)throw new Error("Parameter `body` is required when calling `saveObject`.");const a="/1/indexes/{indexName}".replace("{indexName}",encodeURIComponent(e));const n={};const s={};const o={method:"POST",path:a,queryParameters:s,headers:n,data:r};return u.request(o,t)},
/**
     * If a rule with the specified object ID doesn\'t exist, it\'s created. Otherwise, the existing rule is replaced.  To create or update more than one rule, use the [`batch` operation](#tag/Rules/operation/saveRules).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveRule - The saveRule object.
     * @param saveRule.indexName - Name of the index on which to perform the operation.
     * @param saveRule.objectID - Unique identifier of a rule object.
     * @param saveRule.rule - The rule object.
     * @param saveRule.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
saveRule({indexName:e,objectID:r,rule:t,forwardToReplicas:a},n){if(!e)throw new Error("Parameter `indexName` is required when calling `saveRule`.");if(!r)throw new Error("Parameter `objectID` is required when calling `saveRule`.");if(!t)throw new Error("Parameter `rule` is required when calling `saveRule`.");if(!t.objectID)throw new Error("Parameter `rule.objectID` is required when calling `saveRule`.");if(!t.consequence)throw new Error("Parameter `rule.consequence` is required when calling `saveRule`.");const s="/1/indexes/{indexName}/rules/{objectID}".replace("{indexName}",encodeURIComponent(e)).replace("{objectID}",encodeURIComponent(r));const o={};const i={};a!==void 0&&(i.forwardToReplicas=a.toString());const c={method:"PUT",path:s,queryParameters:i,headers:o,data:t};return u.request(c,n)},
/**
     * Create or update multiple rules.  If a rule with the specified object ID doesn\'t exist, Algolia creates a new one. Otherwise, existing rules are replaced.  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveRules - The saveRules object.
     * @param saveRules.indexName - Name of the index on which to perform the operation.
     * @param saveRules.rules - The rules object.
     * @param saveRules.forwardToReplicas - Whether changes are applied to replica indices.
     * @param saveRules.clearExistingRules - Whether existing rules should be deleted before adding this batch.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
saveRules({indexName:e,rules:r,forwardToReplicas:t,clearExistingRules:a},n){if(!e)throw new Error("Parameter `indexName` is required when calling `saveRules`.");if(!r)throw new Error("Parameter `rules` is required when calling `saveRules`.");const s="/1/indexes/{indexName}/rules/batch".replace("{indexName}",encodeURIComponent(e));const o={};const i={};t!==void 0&&(i.forwardToReplicas=t.toString());a!==void 0&&(i.clearExistingRules=a.toString());const c={method:"POST",path:s,queryParameters:i,headers:o,data:r};return u.request(c,n)},
/**
     * If a synonym with the specified object ID doesn\'t exist, Algolia adds a new one. Otherwise, the existing synonym is replaced. To add multiple synonyms in a single API request, use the [`batch` operation](#tag/Synonyms/operation/saveSynonyms).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveSynonym - The saveSynonym object.
     * @param saveSynonym.indexName - Name of the index on which to perform the operation.
     * @param saveSynonym.objectID - Unique identifier of a synonym object.
     * @param saveSynonym.synonymHit - The synonymHit object.
     * @param saveSynonym.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
saveSynonym({indexName:e,objectID:r,synonymHit:t,forwardToReplicas:a},n){if(!e)throw new Error("Parameter `indexName` is required when calling `saveSynonym`.");if(!r)throw new Error("Parameter `objectID` is required when calling `saveSynonym`.");if(!t)throw new Error("Parameter `synonymHit` is required when calling `saveSynonym`.");if(!t.objectID)throw new Error("Parameter `synonymHit.objectID` is required when calling `saveSynonym`.");if(!t.type)throw new Error("Parameter `synonymHit.type` is required when calling `saveSynonym`.");const s="/1/indexes/{indexName}/synonyms/{objectID}".replace("{indexName}",encodeURIComponent(e)).replace("{objectID}",encodeURIComponent(r));const o={};const i={};a!==void 0&&(i.forwardToReplicas=a.toString());const c={method:"PUT",path:s,queryParameters:i,headers:o,data:t};return u.request(c,n)},
/**
     * If a synonym with the `objectID` doesn\'t exist, Algolia adds a new one. Otherwise, existing synonyms are replaced.  This operation is subject to [indexing rate limits](https://support.algolia.com/hc/en-us/articles/4406975251089-Is-there-a-rate-limit-for-indexing-on-Algolia).
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param saveSynonyms - The saveSynonyms object.
     * @param saveSynonyms.indexName - Name of the index on which to perform the operation.
     * @param saveSynonyms.synonymHit - The synonymHit object.
     * @param saveSynonyms.forwardToReplicas - Whether changes are applied to replica indices.
     * @param saveSynonyms.replaceExistingSynonyms - Whether to replace all synonyms in the index with the ones sent with this request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
saveSynonyms({indexName:e,synonymHit:r,forwardToReplicas:t,replaceExistingSynonyms:a},n){if(!e)throw new Error("Parameter `indexName` is required when calling `saveSynonyms`.");if(!r)throw new Error("Parameter `synonymHit` is required when calling `saveSynonyms`.");const s="/1/indexes/{indexName}/synonyms/batch".replace("{indexName}",encodeURIComponent(e));const o={};const i={};t!==void 0&&(i.forwardToReplicas=t.toString());a!==void 0&&(i.replaceExistingSynonyms=a.toString());const c={method:"POST",path:s,queryParameters:i,headers:o,data:r};return u.request(c,n)},
/**
     * Sends multiple search requests to one or more indices.  This can be useful in these cases:  - Different indices for different purposes, such as, one index for products, another one for marketing content. - Multiple searches to the same index—for example, with different filters.
     *
     * Required API Key ACLs:
     *  - search
     * @param searchMethodParams - Muli-search request body. Results are returned in the same order as the requests.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
search(e,r){if(e&&Array.isArray(e)){const r={requests:e.map((({params:e,...r})=>r.type==="facet"?{...r,...e,type:"facet"}:{...r,...e,facet:void 0,maxFacetHits:void 0,facetQuery:void 0}))};e=r}if(!e)throw new Error("Parameter `searchMethodParams` is required when calling `search`.");if(!e.requests)throw new Error("Parameter `searchMethodParams.requests` is required when calling `search`.");const t="/1/indexes/*/queries";const a={};const n={};const s={method:"POST",path:t,queryParameters:n,headers:a,data:e,useReadTransporter:true,cacheable:true};return u.request(s,r)},
/**
     * Searches for standard and custom dictionary entries.
     *
     * Required API Key ACLs:
     *  - settings
     * @param searchDictionaryEntries - The searchDictionaryEntries object.
     * @param searchDictionaryEntries.dictionaryName - Dictionary type in which to search.
     * @param searchDictionaryEntries.searchDictionaryEntriesParams - The searchDictionaryEntriesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchDictionaryEntries({dictionaryName:e,searchDictionaryEntriesParams:r},t){if(!e)throw new Error("Parameter `dictionaryName` is required when calling `searchDictionaryEntries`.");if(!r)throw new Error("Parameter `searchDictionaryEntriesParams` is required when calling `searchDictionaryEntries`.");if(!r.query)throw new Error("Parameter `searchDictionaryEntriesParams.query` is required when calling `searchDictionaryEntries`.");const a="/1/dictionaries/{dictionaryName}/search".replace("{dictionaryName}",encodeURIComponent(e));const n={};const s={};const o={method:"POST",path:a,queryParameters:s,headers:n,data:r,useReadTransporter:true,cacheable:true};return u.request(o,t)},
/**
     * Searches for values of a specified facet attribute.  - By default, facet values are sorted by decreasing count.   You can adjust this with the `sortFacetValueBy` parameter. - Searching for facet values doesn\'t work if you have **more than 65 searchable facets and searchable attributes combined**.
     *
     * Required API Key ACLs:
     *  - search
     * @param searchForFacetValues - The searchForFacetValues object.
     * @param searchForFacetValues.indexName - Name of the index on which to perform the operation.
     * @param searchForFacetValues.facetName - Facet attribute in which to search for values.  This attribute must be included in the `attributesForFaceting` index setting with the `searchable()` modifier.
     * @param searchForFacetValues.searchForFacetValuesRequest - The searchForFacetValuesRequest object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchForFacetValues({indexName:e,facetName:r,searchForFacetValuesRequest:t},a){if(!e)throw new Error("Parameter `indexName` is required when calling `searchForFacetValues`.");if(!r)throw new Error("Parameter `facetName` is required when calling `searchForFacetValues`.");const n="/1/indexes/{indexName}/facets/{facetName}/query".replace("{indexName}",encodeURIComponent(e)).replace("{facetName}",encodeURIComponent(r));const s={};const o={};const i={method:"POST",path:n,queryParameters:o,headers:s,data:t||{},useReadTransporter:true,cacheable:true};return u.request(i,a)},
/**
     * Searches for rules in your index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param searchRules - The searchRules object.
     * @param searchRules.indexName - Name of the index on which to perform the operation.
     * @param searchRules.searchRulesParams - The searchRulesParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchRules({indexName:e,searchRulesParams:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `searchRules`.");const a="/1/indexes/{indexName}/rules/search".replace("{indexName}",encodeURIComponent(e));const n={};const s={};const o={method:"POST",path:a,queryParameters:s,headers:n,data:r||{},useReadTransporter:true,cacheable:true};return u.request(o,t)},
/**
     * Searches a single index and returns matching search results (_hits_).  This method lets you retrieve up to 1,000 hits. If you need more, use the [`browse` operation](#tag/Search/operation/browse) or increase the `paginatedLimitedTo` index setting.
     *
     * Required API Key ACLs:
     *  - search
     * @param searchSingleIndex - The searchSingleIndex object.
     * @param searchSingleIndex.indexName - Name of the index on which to perform the operation.
     * @param searchSingleIndex.searchParams - The searchParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchSingleIndex({indexName:e,searchParams:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `searchSingleIndex`.");const a="/1/indexes/{indexName}/query".replace("{indexName}",encodeURIComponent(e));const n={};const s={};const o={method:"POST",path:a,queryParameters:s,headers:n,data:r||{},useReadTransporter:true,cacheable:true};return u.request(o,t)},
/**
     * Searches for synonyms in your index.
     *
     * Required API Key ACLs:
     *  - settings
     * @param searchSynonyms - The searchSynonyms object.
     * @param searchSynonyms.indexName - Name of the index on which to perform the operation.
     * @param searchSynonyms.searchSynonymsParams - Body of the `searchSynonyms` operation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchSynonyms({indexName:e,searchSynonymsParams:r},t){if(!e)throw new Error("Parameter `indexName` is required when calling `searchSynonyms`.");const a="/1/indexes/{indexName}/synonyms/search".replace("{indexName}",encodeURIComponent(e));const n={};const s={};const o={method:"POST",path:a,queryParameters:s,headers:n,data:r||{},useReadTransporter:true,cacheable:true};return u.request(o,t)},
/**
     * Since it can take a few seconds to get the data from the different clusters, the response isn\'t real-time.  To ensure rapid updates, the user IDs index isn\'t built at the same time as the mapping. Instead, it\'s built every 12 hours, at the same time as the update of user ID usage. For example, if you add or move a user ID, the search will show an old value until the next time the mapping is rebuilt (every 12 hours).
     *
     * Required API Key ACLs:
     *  - admin
     * @param searchUserIdsParams - The searchUserIdsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchUserIds(e,r){if(!e)throw new Error("Parameter `searchUserIdsParams` is required when calling `searchUserIds`.");if(!e.query)throw new Error("Parameter `searchUserIdsParams.query` is required when calling `searchUserIds`.");const t="/1/clusters/mapping/search";const a={};const n={};const s={method:"POST",path:t,queryParameters:n,headers:a,data:e,useReadTransporter:true,cacheable:true};return u.request(s,r)},
/**
     * Turns standard stop word dictionary entries on or off for a given language.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param dictionarySettingsParams - The dictionarySettingsParams object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
setDictionarySettings(e,r){if(!e)throw new Error("Parameter `dictionarySettingsParams` is required when calling `setDictionarySettings`.");if(!e.disableStandardEntries)throw new Error("Parameter `dictionarySettingsParams.disableStandardEntries` is required when calling `setDictionarySettings`.");const t="/1/dictionaries/*/settings";const a={};const n={};const s={method:"PUT",path:t,queryParameters:n,headers:a,data:e};return u.request(s,r)},
/**
     * Update the specified index settings.  Index settings that you don\'t specify are left unchanged. Specify `null` to reset a setting to its default value.  For best performance, update the index settings before you add new records to your index.
     *
     * Required API Key ACLs:
     *  - editSettings
     * @param setSettings - The setSettings object.
     * @param setSettings.indexName - Name of the index on which to perform the operation.
     * @param setSettings.indexSettings - The indexSettings object.
     * @param setSettings.forwardToReplicas - Whether changes are applied to replica indices.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
setSettings({indexName:e,indexSettings:r,forwardToReplicas:t},a){if(!e)throw new Error("Parameter `indexName` is required when calling `setSettings`.");if(!r)throw new Error("Parameter `indexSettings` is required when calling `setSettings`.");const n="/1/indexes/{indexName}/settings".replace("{indexName}",encodeURIComponent(e));const s={};const o={};t!==void 0&&(o.forwardToReplicas=t.toString());const i={method:"PUT",path:n,queryParameters:o,headers:s,data:r};return u.request(i,a)},
/**
     * Replaces the permissions of an existing API key.  Any unspecified attribute resets that attribute to its default value.
     *
     * Required API Key ACLs:
     *  - admin
     * @param updateApiKey - The updateApiKey object.
     * @param updateApiKey.key - API key.
     * @param updateApiKey.apiKey - The apiKey object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
updateApiKey({key:e,apiKey:r},t){if(!e)throw new Error("Parameter `key` is required when calling `updateApiKey`.");if(!r)throw new Error("Parameter `apiKey` is required when calling `updateApiKey`.");if(!r.acl)throw new Error("Parameter `apiKey.acl` is required when calling `updateApiKey`.");const a="/1/keys/{key}".replace("{key}",encodeURIComponent(e));const n={};const s={};const o={method:"PUT",path:a,queryParameters:s,headers:n,data:r};return u.request(o,t)}}}function searchClient(r,t,a){if(!r||typeof r!=="string")throw new Error("`appId` is missing.");if(!t||typeof t!=="string")throw new Error("`apiKey` is missing.");return createSearchClient({appId:r,apiKey:t,timeouts:{connect:1e3,read:2e3,write:3e4},logger:i(),requester:e(),algoliaAgents:[{segment:"Browser"}],authMode:"WithinQueryParameters",responsesCache:c(),requestsCache:c({serializable:false}),hostsCache:d({caches:[h({key:`${m}-${r}`}),c()]}),...a})}export{m as apiClientVersion,searchClient};

