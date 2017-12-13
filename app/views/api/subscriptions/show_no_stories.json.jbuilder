# get 20 most-recent stories
subscription = @subscription

json.stories do
  json.byId({})
end

# get the user's subscribed feed
json.feeds do
  feed = subscription.feed
  json.byId do
    json.set! feed.id do
      json.partial! 'api/feeds/feed', feed: feed
      json.stories([])
    end
  end

  # get feedId (in an array for adding to subscriptions array)
  json.allIds [feed.id]
end

# get basic subscription info (in an object)
json.subscriptions do
  json.byId do
    json.set! subscription.feed_id do
      json.subscription_title subscription.title
      json.subscription_id subscription.id
      json.subscribed !!current_user.subscriptions.find_by(id: subscription.id)
    end
  end
end
