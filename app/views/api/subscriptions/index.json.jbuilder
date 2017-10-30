# get all the user's subscribed feeds
json.feeds({})
json.feeds do
  @subs.each do |subscription|
    json.set! subscription.feed_id do
      json.partial! 'api/feeds/feed', feed: subscription.feed
    end
  end
end

# get basic info about subscription:
json.subscriptions({})
json.subscriptions do
  @subs.each do |subscription|
    json.set! subscription.feed_id do
      json.subscription_title subscription.title
      json.subscription_id subscription.id
      json.subscribed true
    end
  end
end

# get stories (perhaps later map to collections?)
json.stories({})
json.stories do
  @subs.each do |subscription|
    subbed_stories = subscription.stories.limit(10)
    subbed_stories.each do |story|
      json.set! story.id do
        json.partial! 'api/stories/story', story: story
      end
    end
  end
end
