json.stories({})
json.stories do
  json.byId do
    @stories.each do |story|
      json.set! story.id do
        json.partial! 'api/stories/story', story: story
      end
    end
  end

  json.allIds @stories.map(&:id)
end

all_feeds = []
json.feeds({})
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

json.subscriptions({})
json.subscriptions do
  json.byId do
    subscriptions = current_user.subscriptions
    subscriptions.each do |subscription|
      json.set! subscription.feed_id do
        json.subscription_title subscription.title
      end
    end
  end
end
