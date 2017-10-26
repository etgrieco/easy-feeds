@subs.each do |subscription|
  json.set! subscription.feed.id do
    json.partial! 'api/feeds/user_feed',
      feed: subscription.feed, title: subscription.title
  end
end
