# get all the user's subscribed feeds
json.feeds do
  @subs.each do |subscription|
    json.set! subscription.feed_id do
      json.partial! 'api/feeds/feed', feed: subscription.feed
    end
  end
end

json.subscriptions do
  @subs.each do |subscription|
    json.set! subscription.feed_id do
      json.title subscription.title
    end
  end
end
