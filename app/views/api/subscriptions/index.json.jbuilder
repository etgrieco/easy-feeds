# get basic info about subscriptions:
json.subscriptions({})
json.subscriptions do
  json.byId({})
  json.byId do
    @subscriptions.each do |subscription|
      json.set! subscription.feed_id do
        json.subscription_title subscription.title
        json.subscription_id subscription.id
        json.subscribed true
      end
    end
  end
end

# basic feeds info
all_feeds = []
json.feeds({})
json.feeds do
  json.byId({})
  json.byId do
    @subscriptions.each do |subscription|
      feed = subscription.feed
      all_feeds << feed
      json.set! feed.id do
        json.partial! 'api/feeds/feed', feed: feed
      end
    end
  end

  json.allIds all_feeds.sort_by(&:title).map(&:id)
end
