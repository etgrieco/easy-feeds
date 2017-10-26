# get all the user's subscribed feeds
json.feeds do
  @subs.each do |subscription|
    json.set! subscription.feed_id do
      json.partial! 'api/feeds/feed', feed: subscription.feed
    end
  end
end

# get basic info about subscription: 
json.subscriptions do
  @subs.each do |subscription|
    json.set! subscription.feed_id do
      json.subscription_title subscription.title
      json.subscription_id subscription.id
    end
  end
end
