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
        # json.collections subscription.collections.map(&:id)
        json.stories []
      end
    end
  end

  json.allIds all_feeds.sort_by(&:title).map(&:id)
end

# TODO implement collections
# json.collections({})
# json.collections do
#   json.byId({})
#   json.byId do
#     current_user.collections.includes(:subscriptions).each do |collection|
#       json.set! collection.id do
#         json.name collection.name
#         json.feeds collection.subscriptions.map(&:feed_id)
#       end
#     end
#   end
# end
