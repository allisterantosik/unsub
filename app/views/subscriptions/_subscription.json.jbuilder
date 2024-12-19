json.extract! subscription, :id, :name, :user_id, :status, :email, :created_at, :updated_at
json.url subscription_url(subscription, format: :json)
