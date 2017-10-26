@subs.each do |subscription|
  json.set! subscription.feed_id do
    json.partial! 'api/feeds/subscribed_feed',
      feed: subscription.feed, title: subscription.title
  end
end
