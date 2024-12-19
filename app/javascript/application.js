// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import "@hotwired/turbo-rails"
import 'flowbite';

import "controllers"

import { algoliasearch } from "algoliasearch";

const appID = "EAIITQF2QB";
// API key with `addObject` and `editSettings` ACL
const apiKey = "1c71b46157776abb2d51892a36cec48c";
const indexName = "Subscription";

const client = algoliasearch(appID, apiKey);

// Search for "test"
const { results } = await client.search({
    requests: [
        {
            indexName,
            query: "allister",
        },
    ],
});

console.log(JSON.stringify(results));