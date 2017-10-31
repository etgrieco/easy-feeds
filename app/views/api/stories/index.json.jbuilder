json.stories({})
json.stories do
  json.byId do
    @stories.each do |story|
      json.set! story.id do
        json.partial! 'api/stories/story', story: story
      end
    end
  end

  json.allIds @stories.sort_by(&:pub_datetime).map(&:id).reverse
end

all_feeds = []
json.feeds do
  json.byId do
    @stories.each do |story|
      feed = story.feed
      all_feeds << feed
      json.set! feed.id do
        json.partial! 'api/feeds/feed', feed: feed
      end
    end
  end
end

json.subscriptions do
  json.byId do
    @stories.each do |story|
      json.set! story.feed_id do
        subscription = story.subscriptions.first
        json.subscription_id subscription.id
        json.subscription_title subscription.title
        json.subscribed true
      end
    end
  end
end
