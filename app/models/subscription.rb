class Subscription < ApplicationRecord
  include AlgoliaSearch

  belongs_to :user
  enum :status, [:read, :keep, :unsubscribe]

  algoliasearch do
    attributes :email, :name, :status
  end

end
