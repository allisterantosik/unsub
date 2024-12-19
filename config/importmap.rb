# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "flowbite", to: "https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.turbo.min.js"
pin "algoliasearch" # @5.17.0
pin "@algolia/client-abtesting", to: "@algolia--client-abtesting.js" # @5.17.0
pin "@algolia/client-analytics", to: "@algolia--client-analytics.js" # @5.17.0
pin "@algolia/client-common", to: "@algolia--client-common.js" # @5.17.0
pin "@algolia/client-insights", to: "@algolia--client-insights.js" # @5.17.0
pin "@algolia/client-personalization", to: "@algolia--client-personalization.js" # @5.17.0
pin "@algolia/client-query-suggestions", to: "@algolia--client-query-suggestions.js" # @5.17.0
pin "@algolia/client-search", to: "@algolia--client-search.js" # @5.17.0
pin "@algolia/ingestion", to: "@algolia--ingestion.js" # @1.17.0
pin "@algolia/monitoring", to: "@algolia--monitoring.js" # @1.17.0
pin "@algolia/recommend", to: "@algolia--recommend.js" # @5.17.0
pin "@algolia/requester-browser-xhr", to: "@algolia--requester-browser-xhr.js" # @5.17.0
