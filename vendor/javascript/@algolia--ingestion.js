// @algolia/ingestion@1.17.0 downloaded from https://ga.jspm.io/npm:@algolia/ingestion@1.17.0/dist/builds/browser.js

import{createXhrRequester as e}from"@algolia/requester-browser-xhr";import{createAuth as r,createTransporter as t,getAlgoliaAgent as a,createNullLogger as n,createMemoryCache as o,createFallbackableCache as s,createBrowserLocalStorageCache as i}from"@algolia/client-common";var c="1.17.0";var u=["eu","us"];function getDefaultHosts(e){const r="data.{region}.algolia.com".replace("{region}",e);return[{url:r,accept:"readWrite",protocol:"https"}]}function isOnDemandTrigger(e){return e.type==="onDemand"}function isScheduleTrigger(e){return e.type==="schedule"}function isSubscriptionTrigger(e){return e.type==="subscription"}function createIngestionClient({appId:e,apiKey:n,authMode:o,algoliaAgents:s,region:i,...u}){const d=r(e,n,o);const h=t({hosts:getDefaultHosts(i),...u,algoliaAgent:a({algoliaAgents:s,client:"Ingestion",version:c}),baseHeaders:{"content-type":"text/plain",...d.headers(),...u.baseHeaders},baseQueryParameters:{...d.queryParameters(),...u.baseQueryParameters}});return{transporter:h,appId:e,clearCache(){return Promise.all([h.requestsCache.clear(),h.responsesCache.clear()]).then((()=>{}))},get _ua(){return h.algoliaAgent.value},
/**
     * Adds a `segment` to the `x-algolia-agent` sent with every requests.
     *
     * @param segment - The algolia agent (user-agent) segment to add.
     * @param version - The version of the agent.
     */
addAlgoliaAgent(e,r){h.algoliaAgent.add({segment:e,version:r})},
/**
     * Helper method to switch the API key used to authenticate the requests.
     *
     * @param params - Method params.
     * @param params.apiKey - The new API Key to use.
     */
setClientApiKey({apiKey:e}){o&&o!=="WithinHeaders"?h.baseQueryParameters["x-algolia-api-key"]=e:h.baseHeaders["x-algolia-api-key"]=e},
/**
     * Creates a new authentication resource.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param authenticationCreate -
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
createAuthentication(e,r){if(!e)throw new Error("Parameter `authenticationCreate` is required when calling `createAuthentication`.");if(!e.type)throw new Error("Parameter `authenticationCreate.type` is required when calling `createAuthentication`.");if(!e.name)throw new Error("Parameter `authenticationCreate.name` is required when calling `createAuthentication`.");if(!e.input)throw new Error("Parameter `authenticationCreate.input` is required when calling `createAuthentication`.");const t="/1/authentications";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Creates a new destination.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param destinationCreate -
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
createDestination(e,r){if(!e)throw new Error("Parameter `destinationCreate` is required when calling `createDestination`.");if(!e.type)throw new Error("Parameter `destinationCreate.type` is required when calling `createDestination`.");if(!e.name)throw new Error("Parameter `destinationCreate.name` is required when calling `createDestination`.");if(!e.input)throw new Error("Parameter `destinationCreate.input` is required when calling `createDestination`.");const t="/1/destinations";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Creates a new source.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param sourceCreate -
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
createSource(e,r){if(!e)throw new Error("Parameter `sourceCreate` is required when calling `createSource`.");if(!e.type)throw new Error("Parameter `sourceCreate.type` is required when calling `createSource`.");if(!e.name)throw new Error("Parameter `sourceCreate.name` is required when calling `createSource`.");const t="/1/sources";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Creates a new task.
     * @param taskCreate - Request body for creating a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
createTask(e,r){if(!e)throw new Error("Parameter `taskCreate` is required when calling `createTask`.");if(!e.sourceID)throw new Error("Parameter `taskCreate.sourceID` is required when calling `createTask`.");if(!e.destinationID)throw new Error("Parameter `taskCreate.destinationID` is required when calling `createTask`.");if(!e.action)throw new Error("Parameter `taskCreate.action` is required when calling `createTask`.");const t="/2/tasks";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Creates a new task using the v1 endpoint, please use `createTask` instead.
     * @param taskCreate - Request body for creating a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
createTaskV1(e,r){if(!e)throw new Error("Parameter `taskCreate` is required when calling `createTaskV1`.");if(!e.sourceID)throw new Error("Parameter `taskCreate.sourceID` is required when calling `createTaskV1`.");if(!e.destinationID)throw new Error("Parameter `taskCreate.destinationID` is required when calling `createTaskV1`.");if(!e.trigger)throw new Error("Parameter `taskCreate.trigger` is required when calling `createTaskV1`.");if(!e.action)throw new Error("Parameter `taskCreate.action` is required when calling `createTaskV1`.");const t="/1/tasks";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Creates a new transformation.
     * @param transformationCreate - Request body for creating a transformation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
createTransformation(e,r){if(!e)throw new Error("Parameter `transformationCreate` is required when calling `createTransformation`.");if(!e.code)throw new Error("Parameter `transformationCreate.code` is required when calling `createTransformation`.");if(!e.name)throw new Error("Parameter `transformationCreate.name` is required when calling `createTransformation`.");const t="/1/transformations";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customDelete - The customDelete object.
     * @param customDelete.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customDelete.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customDelete({path:e,parameters:r},t){if(!e)throw new Error("Parameter `path` is required when calling `customDelete`.");const a="/{path}".replace("{path}",e);const n={};const o=r||{};const s={method:"DELETE",path:a,queryParameters:o,headers:n};return h.request(s,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customGet - The customGet object.
     * @param customGet.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customGet.parameters - Query parameters to apply to the current query.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customGet({path:e,parameters:r},t){if(!e)throw new Error("Parameter `path` is required when calling `customGet`.");const a="/{path}".replace("{path}",e);const n={};const o=r||{};const s={method:"GET",path:a,queryParameters:o,headers:n};return h.request(s,t)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPost - The customPost object.
     * @param customPost.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPost.parameters - Query parameters to apply to the current query.
     * @param customPost.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPost({path:e,parameters:r,body:t},a){if(!e)throw new Error("Parameter `path` is required when calling `customPost`.");const n="/{path}".replace("{path}",e);const o={};const s=r||{};const i={method:"POST",path:n,queryParameters:s,headers:o,data:t||{}};return h.request(i,a)},
/**
     * This method allow you to send requests to the Algolia REST API.
     * @param customPut - The customPut object.
     * @param customPut.path - Path of the endpoint, anything after \"/1\" must be specified.
     * @param customPut.parameters - Query parameters to apply to the current query.
     * @param customPut.body - Parameters to send with the custom request.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
customPut({path:e,parameters:r,body:t},a){if(!e)throw new Error("Parameter `path` is required when calling `customPut`.");const n="/{path}".replace("{path}",e);const o={};const s=r||{};const i={method:"PUT",path:n,queryParameters:s,headers:o,data:t||{}};return h.request(i,a)},
/**
     * Deletes an authentication resource. You can\'t delete authentication resources that are used by a source or a destination.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param deleteAuthentication - The deleteAuthentication object.
     * @param deleteAuthentication.authenticationID - Unique identifier of an authentication resource.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteAuthentication({authenticationID:e},r){if(!e)throw new Error("Parameter `authenticationID` is required when calling `deleteAuthentication`.");const t="/1/authentications/{authenticationID}".replace("{authenticationID}",encodeURIComponent(e));const a={};const n={};const o={method:"DELETE",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Deletes a destination by its ID. You can\'t delete destinations that are referenced in tasks.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param deleteDestination - The deleteDestination object.
     * @param deleteDestination.destinationID - Unique identifier of a destination.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteDestination({destinationID:e},r){if(!e)throw new Error("Parameter `destinationID` is required when calling `deleteDestination`.");const t="/1/destinations/{destinationID}".replace("{destinationID}",encodeURIComponent(e));const a={};const n={};const o={method:"DELETE",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Deletes a source by its ID. You can\'t delete sources that are referenced in tasks.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param deleteSource - The deleteSource object.
     * @param deleteSource.sourceID - Unique identifier of a source.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteSource({sourceID:e},r){if(!e)throw new Error("Parameter `sourceID` is required when calling `deleteSource`.");const t="/1/sources/{sourceID}".replace("{sourceID}",encodeURIComponent(e));const a={};const n={};const o={method:"DELETE",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Deletes a task by its ID.
     * @param deleteTask - The deleteTask object.
     * @param deleteTask.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteTask({taskID:e},r){if(!e)throw new Error("Parameter `taskID` is required when calling `deleteTask`.");const t="/2/tasks/{taskID}".replace("{taskID}",encodeURIComponent(e));const a={};const n={};const o={method:"DELETE",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Deletes a task by its ID using the v1 endpoint, please use `deleteTask` instead.
     * @param deleteTaskV1 - The deleteTaskV1 object.
     * @param deleteTaskV1.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteTaskV1({taskID:e},r){if(!e)throw new Error("Parameter `taskID` is required when calling `deleteTaskV1`.");const t="/1/tasks/{taskID}".replace("{taskID}",encodeURIComponent(e));const a={};const n={};const o={method:"DELETE",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Deletes a transformation by its ID.
     * @param deleteTransformation - The deleteTransformation object.
     * @param deleteTransformation.transformationID - Unique identifier of a transformation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
deleteTransformation({transformationID:e},r){if(!e)throw new Error("Parameter `transformationID` is required when calling `deleteTransformation`.");const t="/1/transformations/{transformationID}".replace("{transformationID}",encodeURIComponent(e));const a={};const n={};const o={method:"DELETE",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Disables a task.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param disableTask - The disableTask object.
     * @param disableTask.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
disableTask({taskID:e},r){if(!e)throw new Error("Parameter `taskID` is required when calling `disableTask`.");const t="/2/tasks/{taskID}/disable".replace("{taskID}",encodeURIComponent(e));const a={};const n={};const o={method:"PUT",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Disables a task using the v1 endpoint, please use `disableTask` instead.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param disableTaskV1 - The disableTaskV1 object.
     * @param disableTaskV1.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
disableTaskV1({taskID:e},r){if(!e)throw new Error("Parameter `taskID` is required when calling `disableTaskV1`.");const t="/1/tasks/{taskID}/disable".replace("{taskID}",encodeURIComponent(e));const a={};const n={};const o={method:"PUT",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Enables a task.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param enableTask - The enableTask object.
     * @param enableTask.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
enableTask({taskID:e},r){if(!e)throw new Error("Parameter `taskID` is required when calling `enableTask`.");const t="/2/tasks/{taskID}/enable".replace("{taskID}",encodeURIComponent(e));const a={};const n={};const o={method:"PUT",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Enables a task using the v1 endpoint, please use `enableTask` instead.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param enableTaskV1 - The enableTaskV1 object.
     * @param enableTaskV1.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
enableTaskV1({taskID:e},r){if(!e)throw new Error("Parameter `taskID` is required when calling `enableTaskV1`.");const t="/1/tasks/{taskID}/enable".replace("{taskID}",encodeURIComponent(e));const a={};const n={};const o={method:"PUT",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Retrieves an authentication resource by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getAuthentication - The getAuthentication object.
     * @param getAuthentication.authenticationID - Unique identifier of an authentication resource.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getAuthentication({authenticationID:e},r){if(!e)throw new Error("Parameter `authenticationID` is required when calling `getAuthentication`.");const t="/1/authentications/{authenticationID}".replace("{authenticationID}",encodeURIComponent(e));const a={};const n={};const o={method:"GET",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Retrieves a destination by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getDestination - The getDestination object.
     * @param getDestination.destinationID - Unique identifier of a destination.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getDestination({destinationID:e},r){if(!e)throw new Error("Parameter `destinationID` is required when calling `getDestination`.");const t="/1/destinations/{destinationID}".replace("{destinationID}",encodeURIComponent(e));const a={};const n={};const o={method:"GET",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Retrieves a single task run event by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getEvent - The getEvent object.
     * @param getEvent.runID - Unique identifier of a task run.
     * @param getEvent.eventID - Unique identifier of an event.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getEvent({runID:e,eventID:r},t){if(!e)throw new Error("Parameter `runID` is required when calling `getEvent`.");if(!r)throw new Error("Parameter `eventID` is required when calling `getEvent`.");const a="/1/runs/{runID}/events/{eventID}".replace("{runID}",encodeURIComponent(e)).replace("{eventID}",encodeURIComponent(r));const n={};const o={};const s={method:"GET",path:a,queryParameters:o,headers:n};return h.request(s,t)},
/**
     * Retrieve a single task run by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getRun - The getRun object.
     * @param getRun.runID - Unique identifier of a task run.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getRun({runID:e},r){if(!e)throw new Error("Parameter `runID` is required when calling `getRun`.");const t="/1/runs/{runID}".replace("{runID}",encodeURIComponent(e));const a={};const n={};const o={method:"GET",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Retrieve a source by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getSource - The getSource object.
     * @param getSource.sourceID - Unique identifier of a source.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getSource({sourceID:e},r){if(!e)throw new Error("Parameter `sourceID` is required when calling `getSource`.");const t="/1/sources/{sourceID}".replace("{sourceID}",encodeURIComponent(e));const a={};const n={};const o={method:"GET",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Retrieves a task by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getTask - The getTask object.
     * @param getTask.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getTask({taskID:e},r){if(!e)throw new Error("Parameter `taskID` is required when calling `getTask`.");const t="/2/tasks/{taskID}".replace("{taskID}",encodeURIComponent(e));const a={};const n={};const o={method:"GET",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Retrieves a task by its ID using the v1 endpoint, please use `getTask` instead.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getTaskV1 - The getTaskV1 object.
     * @param getTaskV1.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getTaskV1({taskID:e},r){if(!e)throw new Error("Parameter `taskID` is required when calling `getTaskV1`.");const t="/1/tasks/{taskID}".replace("{taskID}",encodeURIComponent(e));const a={};const n={};const o={method:"GET",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Retrieves a transformation by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param getTransformation - The getTransformation object.
     * @param getTransformation.transformationID - Unique identifier of a transformation.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
getTransformation({transformationID:e},r){if(!e)throw new Error("Parameter `transformationID` is required when calling `getTransformation`.");const t="/1/transformations/{transformationID}".replace("{transformationID}",encodeURIComponent(e));const a={};const n={};const o={method:"GET",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Retrieves a list of all authentication resources.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listAuthentications - The listAuthentications object.
     * @param listAuthentications.itemsPerPage - Number of items per page.
     * @param listAuthentications.page - Page number of the paginated API response.
     * @param listAuthentications.type - Type of authentication resource to retrieve.
     * @param listAuthentications.platform - Ecommerce platform for which to retrieve authentications.
     * @param listAuthentications.sort - Property by which to sort the list of authentications.
     * @param listAuthentications.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listAuthentications({itemsPerPage:e,page:r,type:t,platform:a,sort:n,order:o}={},s=void 0){const i="/1/authentications";const c={};const u={};e!==void 0&&(u.itemsPerPage=e.toString());r!==void 0&&(u.page=r.toString());t!==void 0&&(u.type=t.toString());a!==void 0&&(u.platform=a.toString());n!==void 0&&(u.sort=n.toString());o!==void 0&&(u.order=o.toString());const d={method:"GET",path:i,queryParameters:u,headers:c};return h.request(d,s)},
/**
     * Retrieves a list of destinations.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listDestinations - The listDestinations object.
     * @param listDestinations.itemsPerPage - Number of items per page.
     * @param listDestinations.page - Page number of the paginated API response.
     * @param listDestinations.type - Destination type.
     * @param listDestinations.authenticationID - Authentication ID used by destinations.
     * @param listDestinations.transformationID - Get the list of destinations used by a transformation.
     * @param listDestinations.sort - Property by which to sort the destinations.
     * @param listDestinations.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listDestinations({itemsPerPage:e,page:r,type:t,authenticationID:a,transformationID:n,sort:o,order:s}={},i=void 0){const c="/1/destinations";const u={};const d={};e!==void 0&&(d.itemsPerPage=e.toString());r!==void 0&&(d.page=r.toString());t!==void 0&&(d.type=t.toString());a!==void 0&&(d.authenticationID=a.toString());n!==void 0&&(d.transformationID=n.toString());o!==void 0&&(d.sort=o.toString());s!==void 0&&(d.order=s.toString());const m={method:"GET",path:c,queryParameters:d,headers:u};return h.request(m,i)},
/**
     * Retrieves a list of events for a task run, identified by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listEvents - The listEvents object.
     * @param listEvents.runID - Unique identifier of a task run.
     * @param listEvents.itemsPerPage - Number of items per page.
     * @param listEvents.page - Page number of the paginated API response.
     * @param listEvents.status - Event status for filtering the list of task runs.
     * @param listEvents.type - Event type for filtering the list of task runs.
     * @param listEvents.sort - Property by which to sort the list of task run events.
     * @param listEvents.order - Sort order of the response, ascending or descending.
     * @param listEvents.startDate - Date and time in RFC 3339 format for the earliest events to retrieve. By default, the current time minus three hours is used.
     * @param listEvents.endDate - Date and time in RFC 3339 format for the latest events to retrieve. By default, the current time is used.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listEvents({runID:e,itemsPerPage:r,page:t,status:a,type:n,sort:o,order:s,startDate:i,endDate:c},u){if(!e)throw new Error("Parameter `runID` is required when calling `listEvents`.");const d="/1/runs/{runID}/events".replace("{runID}",encodeURIComponent(e));const m={};const l={};r!==void 0&&(l.itemsPerPage=r.toString());t!==void 0&&(l.page=t.toString());a!==void 0&&(l.status=a.toString());n!==void 0&&(l.type=n.toString());o!==void 0&&(l.sort=o.toString());s!==void 0&&(l.order=s.toString());i!==void 0&&(l.startDate=i.toString());c!==void 0&&(l.endDate=c.toString());const w={method:"GET",path:d,queryParameters:l,headers:m};return h.request(w,u)},
/**
     * Retrieve a list of task runs.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listRuns - The listRuns object.
     * @param listRuns.itemsPerPage - Number of items per page.
     * @param listRuns.page - Page number of the paginated API response.
     * @param listRuns.status - Run status for filtering the list of task runs.
     * @param listRuns.type - Run type for filtering the list of task runs.
     * @param listRuns.taskID - Task ID for filtering the list of task runs.
     * @param listRuns.sort - Property by which to sort the list of task runs.
     * @param listRuns.order - Sort order of the response, ascending or descending.
     * @param listRuns.startDate - Date in RFC 3339 format for the earliest run to retrieve. By default, the current day minus seven days is used.
     * @param listRuns.endDate - Date in RFC 3339 format for the latest run to retrieve. By default, the current day is used.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listRuns({itemsPerPage:e,page:r,status:t,type:a,taskID:n,sort:o,order:s,startDate:i,endDate:c}={},u=void 0){const d="/1/runs";const m={};const l={};e!==void 0&&(l.itemsPerPage=e.toString());r!==void 0&&(l.page=r.toString());t!==void 0&&(l.status=t.toString());a!==void 0&&(l.type=a.toString());n!==void 0&&(l.taskID=n.toString());o!==void 0&&(l.sort=o.toString());s!==void 0&&(l.order=s.toString());i!==void 0&&(l.startDate=i.toString());c!==void 0&&(l.endDate=c.toString());const w={method:"GET",path:d,queryParameters:l,headers:m};return h.request(w,u)},
/**
     * Retrieves a list of sources.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listSources - The listSources object.
     * @param listSources.itemsPerPage - Number of items per page.
     * @param listSources.page - Page number of the paginated API response.
     * @param listSources.type - Source type. Some sources require authentication.
     * @param listSources.authenticationID - Authentication IDs of the sources to retrieve. \'none\' returns sources that doesn\'t have an authentication.
     * @param listSources.sort - Property by which to sort the list of sources.
     * @param listSources.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listSources({itemsPerPage:e,page:r,type:t,authenticationID:a,sort:n,order:o}={},s=void 0){const i="/1/sources";const c={};const u={};e!==void 0&&(u.itemsPerPage=e.toString());r!==void 0&&(u.page=r.toString());t!==void 0&&(u.type=t.toString());a!==void 0&&(u.authenticationID=a.toString());n!==void 0&&(u.sort=n.toString());o!==void 0&&(u.order=o.toString());const d={method:"GET",path:i,queryParameters:u,headers:c};return h.request(d,s)},
/**
     * Retrieves a list of tasks.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listTasks - The listTasks object.
     * @param listTasks.itemsPerPage - Number of items per page.
     * @param listTasks.page - Page number of the paginated API response.
     * @param listTasks.action - Actions for filtering the list of tasks.
     * @param listTasks.enabled - Whether to filter the list of tasks by the `enabled` status.
     * @param listTasks.sourceID - Source IDs for filtering the list of tasks.
     * @param listTasks.sourceType - Filters the tasks with the specified source type.
     * @param listTasks.destinationID - Destination IDs for filtering the list of tasks.
     * @param listTasks.triggerType - Type of task trigger for filtering the list of tasks.
     * @param listTasks.sort - Property by which to sort the list of tasks.
     * @param listTasks.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listTasks({itemsPerPage:e,page:r,action:t,enabled:a,sourceID:n,sourceType:o,destinationID:s,triggerType:i,sort:c,order:u}={},d=void 0){const m="/2/tasks";const l={};const w={};e!==void 0&&(w.itemsPerPage=e.toString());r!==void 0&&(w.page=r.toString());t!==void 0&&(w.action=t.toString());a!==void 0&&(w.enabled=a.toString());n!==void 0&&(w.sourceID=n.toString());o!==void 0&&(w.sourceType=o.toString());s!==void 0&&(w.destinationID=s.toString());i!==void 0&&(w.triggerType=i.toString());c!==void 0&&(w.sort=c.toString());u!==void 0&&(w.order=u.toString());const p={method:"GET",path:m,queryParameters:w,headers:l};return h.request(p,d)},
/**
     * Retrieves a list of tasks using the v1 endpoint, please use `getTasks` instead.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listTasksV1 - The listTasksV1 object.
     * @param listTasksV1.itemsPerPage - Number of items per page.
     * @param listTasksV1.page - Page number of the paginated API response.
     * @param listTasksV1.action - Actions for filtering the list of tasks.
     * @param listTasksV1.enabled - Whether to filter the list of tasks by the `enabled` status.
     * @param listTasksV1.sourceID - Source IDs for filtering the list of tasks.
     * @param listTasksV1.destinationID - Destination IDs for filtering the list of tasks.
     * @param listTasksV1.triggerType - Type of task trigger for filtering the list of tasks.
     * @param listTasksV1.sort - Property by which to sort the list of tasks.
     * @param listTasksV1.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listTasksV1({itemsPerPage:e,page:r,action:t,enabled:a,sourceID:n,destinationID:o,triggerType:s,sort:i,order:c}={},u=void 0){const d="/1/tasks";const m={};const l={};e!==void 0&&(l.itemsPerPage=e.toString());r!==void 0&&(l.page=r.toString());t!==void 0&&(l.action=t.toString());a!==void 0&&(l.enabled=a.toString());n!==void 0&&(l.sourceID=n.toString());o!==void 0&&(l.destinationID=o.toString());s!==void 0&&(l.triggerType=s.toString());i!==void 0&&(l.sort=i.toString());c!==void 0&&(l.order=c.toString());const w={method:"GET",path:d,queryParameters:l,headers:m};return h.request(w,u)},
/**
     * Retrieves a list of transformations.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param listTransformations - The listTransformations object.
     * @param listTransformations.itemsPerPage - Number of items per page.
     * @param listTransformations.page - Page number of the paginated API response.
     * @param listTransformations.sort - Property by which to sort the list of transformations.
     * @param listTransformations.order - Sort order of the response, ascending or descending.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
listTransformations({itemsPerPage:e,page:r,sort:t,order:a}={},n=void 0){const o="/1/transformations";const s={};const i={};e!==void 0&&(i.itemsPerPage=e.toString());r!==void 0&&(i.page=r.toString());t!==void 0&&(i.sort=t.toString());a!==void 0&&(i.order=a.toString());const c={method:"GET",path:o,queryParameters:i,headers:s};return h.request(c,n)},
/**
     * Push a `batch` request payload through the Pipeline. You can check the status of task pushes with the observability endpoints.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param pushTask - The pushTask object.
     * @param pushTask.taskID - Unique identifier of a task.
     * @param pushTask.pushTaskPayload - Request body of a Search API `batch` request that will be pushed in the Connectors pipeline.
     * @param pushTask.watch - When provided, the push operation will be synchronous and the API will wait for the ingestion to be finished before responding.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
pushTask({taskID:e,pushTaskPayload:r,watch:t},a){if(!e)throw new Error("Parameter `taskID` is required when calling `pushTask`.");if(!r)throw new Error("Parameter `pushTaskPayload` is required when calling `pushTask`.");if(!r.action)throw new Error("Parameter `pushTaskPayload.action` is required when calling `pushTask`.");if(!r.records)throw new Error("Parameter `pushTaskPayload.records` is required when calling `pushTask`.");const n="/2/tasks/{taskID}/push".replace("{taskID}",encodeURIComponent(e));const o={};const s={};t!==void 0&&(s.watch=t.toString());const i={method:"POST",path:n,queryParameters:s,headers:o,data:r};return h.request(i,a)},
/**
     * Runs all tasks linked to a source, only available for Shopify sources. It will create 1 run per task.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param runSource - The runSource object.
     * @param runSource.sourceID - Unique identifier of a source.
     * @param runSource.runSourcePayload -
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
runSource({sourceID:e,runSourcePayload:r},t){if(!e)throw new Error("Parameter `sourceID` is required when calling `runSource`.");const a="/1/sources/{sourceID}/run".replace("{sourceID}",encodeURIComponent(e));const n={};const o={};const s={method:"POST",path:a,queryParameters:o,headers:n,data:r||{}};return h.request(s,t)},
/**
     * Runs a task. You can check the status of task runs with the observability endpoints.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param runTask - The runTask object.
     * @param runTask.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
runTask({taskID:e},r){if(!e)throw new Error("Parameter `taskID` is required when calling `runTask`.");const t="/2/tasks/{taskID}/run".replace("{taskID}",encodeURIComponent(e));const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Runs a task using the v1 endpoint, please use `runTask` instead. You can check the status of task runs with the observability endpoints.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param runTaskV1 - The runTaskV1 object.
     * @param runTaskV1.taskID - Unique identifier of a task.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
runTaskV1({taskID:e},r){if(!e)throw new Error("Parameter `taskID` is required when calling `runTaskV1`.");const t="/1/tasks/{taskID}/run".replace("{taskID}",encodeURIComponent(e));const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Searches for authentication resources.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param authenticationSearch - The authenticationSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchAuthentications(e,r){if(!e)throw new Error("Parameter `authenticationSearch` is required when calling `searchAuthentications`.");if(!e.authenticationIDs)throw new Error("Parameter `authenticationSearch.authenticationIDs` is required when calling `searchAuthentications`.");const t="/1/authentications/search";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Searches for destinations.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param destinationSearch - The destinationSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchDestinations(e,r){if(!e)throw new Error("Parameter `destinationSearch` is required when calling `searchDestinations`.");if(!e.destinationIDs)throw new Error("Parameter `destinationSearch.destinationIDs` is required when calling `searchDestinations`.");const t="/1/destinations/search";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Searches for sources.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param sourceSearch - The sourceSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchSources(e,r){if(!e)throw new Error("Parameter `sourceSearch` is required when calling `searchSources`.");if(!e.sourceIDs)throw new Error("Parameter `sourceSearch.sourceIDs` is required when calling `searchSources`.");const t="/1/sources/search";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Searches for tasks.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param taskSearch - The taskSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchTasks(e,r){if(!e)throw new Error("Parameter `taskSearch` is required when calling `searchTasks`.");if(!e.taskIDs)throw new Error("Parameter `taskSearch.taskIDs` is required when calling `searchTasks`.");const t="/2/tasks/search";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Searches for tasks using the v1 endpoint, please use `searchTasks` instead.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param taskSearch - The taskSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchTasksV1(e,r){if(!e)throw new Error("Parameter `taskSearch` is required when calling `searchTasksV1`.");if(!e.taskIDs)throw new Error("Parameter `taskSearch.taskIDs` is required when calling `searchTasksV1`.");const t="/1/tasks/search";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Searches for transformations.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param transformationSearch - The transformationSearch object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
searchTransformations(e,r){if(!e)throw new Error("Parameter `transformationSearch` is required when calling `searchTransformations`.");if(!e.transformationIDs)throw new Error("Parameter `transformationSearch.transformationIDs` is required when calling `searchTransformations`.");const t="/1/transformations/search";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Triggers a stream-listing request for a source. Triggering stream-listing requests only works with sources with `type: docker` and `imageType: singer`.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param triggerDockerSourceDiscover - The triggerDockerSourceDiscover object.
     * @param triggerDockerSourceDiscover.sourceID - Unique identifier of a source.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
triggerDockerSourceDiscover({sourceID:e},r){if(!e)throw new Error("Parameter `sourceID` is required when calling `triggerDockerSourceDiscover`.");const t="/1/sources/{sourceID}/discover".replace("{sourceID}",encodeURIComponent(e));const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a};return h.request(o,r)},
/**
     * Try a transformation before creating it.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param transformationTry - The transformationTry object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
tryTransformation(e,r){if(!e)throw new Error("Parameter `transformationTry` is required when calling `tryTransformation`.");if(!e.code)throw new Error("Parameter `transformationTry.code` is required when calling `tryTransformation`.");if(!e.sampleRecord)throw new Error("Parameter `transformationTry.sampleRecord` is required when calling `tryTransformation`.");const t="/1/transformations/try";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e};return h.request(o,r)},
/**
     * Try a transformation before updating it.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param tryTransformationBeforeUpdate - The tryTransformationBeforeUpdate object.
     * @param tryTransformationBeforeUpdate.transformationID - Unique identifier of a transformation.
     * @param tryTransformationBeforeUpdate.transformationTry - The transformationTry object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
tryTransformationBeforeUpdate({transformationID:e,transformationTry:r},t){if(!e)throw new Error("Parameter `transformationID` is required when calling `tryTransformationBeforeUpdate`.");if(!r)throw new Error("Parameter `transformationTry` is required when calling `tryTransformationBeforeUpdate`.");if(!r.code)throw new Error("Parameter `transformationTry.code` is required when calling `tryTransformationBeforeUpdate`.");if(!r.sampleRecord)throw new Error("Parameter `transformationTry.sampleRecord` is required when calling `tryTransformationBeforeUpdate`.");const a="/1/transformations/{transformationID}/try".replace("{transformationID}",encodeURIComponent(e));const n={};const o={};const s={method:"POST",path:a,queryParameters:o,headers:n,data:r};return h.request(s,t)},
/**
     * Updates an authentication resource.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param updateAuthentication - The updateAuthentication object.
     * @param updateAuthentication.authenticationID - Unique identifier of an authentication resource.
     * @param updateAuthentication.authenticationUpdate - The authenticationUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
updateAuthentication({authenticationID:e,authenticationUpdate:r},t){if(!e)throw new Error("Parameter `authenticationID` is required when calling `updateAuthentication`.");if(!r)throw new Error("Parameter `authenticationUpdate` is required when calling `updateAuthentication`.");const a="/1/authentications/{authenticationID}".replace("{authenticationID}",encodeURIComponent(e));const n={};const o={};const s={method:"PATCH",path:a,queryParameters:o,headers:n,data:r};return h.request(s,t)},
/**
     * Updates the destination by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param updateDestination - The updateDestination object.
     * @param updateDestination.destinationID - Unique identifier of a destination.
     * @param updateDestination.destinationUpdate - The destinationUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
updateDestination({destinationID:e,destinationUpdate:r},t){if(!e)throw new Error("Parameter `destinationID` is required when calling `updateDestination`.");if(!r)throw new Error("Parameter `destinationUpdate` is required when calling `updateDestination`.");const a="/1/destinations/{destinationID}".replace("{destinationID}",encodeURIComponent(e));const n={};const o={};const s={method:"PATCH",path:a,queryParameters:o,headers:n,data:r};return h.request(s,t)},
/**
     * Updates a source by its ID.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param updateSource - The updateSource object.
     * @param updateSource.sourceID - Unique identifier of a source.
     * @param updateSource.sourceUpdate - The sourceUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
updateSource({sourceID:e,sourceUpdate:r},t){if(!e)throw new Error("Parameter `sourceID` is required when calling `updateSource`.");if(!r)throw new Error("Parameter `sourceUpdate` is required when calling `updateSource`.");const a="/1/sources/{sourceID}".replace("{sourceID}",encodeURIComponent(e));const n={};const o={};const s={method:"PATCH",path:a,queryParameters:o,headers:n,data:r};return h.request(s,t)},
/**
     * Updates a task by its ID.
     * @param updateTask - The updateTask object.
     * @param updateTask.taskID - Unique identifier of a task.
     * @param updateTask.taskUpdate - The taskUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
updateTask({taskID:e,taskUpdate:r},t){if(!e)throw new Error("Parameter `taskID` is required when calling `updateTask`.");if(!r)throw new Error("Parameter `taskUpdate` is required when calling `updateTask`.");const a="/2/tasks/{taskID}".replace("{taskID}",encodeURIComponent(e));const n={};const o={};const s={method:"PATCH",path:a,queryParameters:o,headers:n,data:r};return h.request(s,t)},
/**
     * Updates a task by its ID using the v1 endpoint, please use `updateTask` instead.
     * @param updateTaskV1 - The updateTaskV1 object.
     * @param updateTaskV1.taskID - Unique identifier of a task.
     * @param updateTaskV1.taskUpdate - The taskUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
updateTaskV1({taskID:e,taskUpdate:r},t){if(!e)throw new Error("Parameter `taskID` is required when calling `updateTaskV1`.");if(!r)throw new Error("Parameter `taskUpdate` is required when calling `updateTaskV1`.");const a="/1/tasks/{taskID}".replace("{taskID}",encodeURIComponent(e));const n={};const o={};const s={method:"PATCH",path:a,queryParameters:o,headers:n,data:r};return h.request(s,t)},
/**
     * Updates a transformation by its ID.
     * @param updateTransformation - The updateTransformation object.
     * @param updateTransformation.transformationID - Unique identifier of a transformation.
     * @param updateTransformation.transformationCreate - The transformationCreate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
updateTransformation({transformationID:e,transformationCreate:r},t){if(!e)throw new Error("Parameter `transformationID` is required when calling `updateTransformation`.");if(!r)throw new Error("Parameter `transformationCreate` is required when calling `updateTransformation`.");if(!r.code)throw new Error("Parameter `transformationCreate.code` is required when calling `updateTransformation`.");if(!r.name)throw new Error("Parameter `transformationCreate.name` is required when calling `updateTransformation`.");const a="/1/transformations/{transformationID}".replace("{transformationID}",encodeURIComponent(e));const n={};const o={};const s={method:"PUT",path:a,queryParameters:o,headers:n,data:r};return h.request(s,t)},
/**
     * Validates a source payload to ensure it can be created and that the data source can be reached by Algolia.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param sourceCreate -
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
validateSource(e,r=void 0){const t="/1/sources/validate";const a={};const n={};const o={method:"POST",path:t,queryParameters:n,headers:a,data:e||{}};return h.request(o,r)},
/**
     * Validates an update of a source payload to ensure it can be created and that the data source can be reached by Algolia.
     *
     * Required API Key ACLs:
     *  - addObject
     *  - deleteIndex
     *  - editSettings
     * @param validateSourceBeforeUpdate - The validateSourceBeforeUpdate object.
     * @param validateSourceBeforeUpdate.sourceID - Unique identifier of a source.
     * @param validateSourceBeforeUpdate.sourceUpdate - The sourceUpdate object.
     * @param requestOptions - The requestOptions to send along with the query, they will be merged with the transporter requestOptions.
     */
validateSourceBeforeUpdate({sourceID:e,sourceUpdate:r},t){if(!e)throw new Error("Parameter `sourceID` is required when calling `validateSourceBeforeUpdate`.");if(!r)throw new Error("Parameter `sourceUpdate` is required when calling `validateSourceBeforeUpdate`.");const a="/1/sources/{sourceID}/validate".replace("{sourceID}",encodeURIComponent(e));const n={};const o={};const s={method:"POST",path:a,queryParameters:o,headers:n,data:r};return h.request(s,t)}}}function ingestionClient(r,t,a,d){if(!r||typeof r!=="string")throw new Error("`appId` is missing.");if(!t||typeof t!=="string")throw new Error("`apiKey` is missing.");if(!a||a&&(typeof a!=="string"||!u.includes(a)))throw new Error(`\`region\` is required and must be one of the following: ${u.join(", ")}`);return createIngestionClient({appId:r,apiKey:t,region:a,timeouts:{connect:25e3,read:25e3,write:25e3},logger:n(),requester:e(),algoliaAgents:[{segment:"Browser"}],authMode:"WithinQueryParameters",responsesCache:o(),requestsCache:o({serializable:false}),hostsCache:s({caches:[i({key:`${c}-${r}`}),o()]}),...d})}export{c as apiClientVersion,ingestionClient,isOnDemandTrigger,isScheduleTrigger,isSubscriptionTrigger};

