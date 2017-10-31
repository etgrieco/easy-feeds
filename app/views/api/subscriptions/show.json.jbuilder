all_stories = []
json.stories do
  json.byId do
    stories = @subscription
    .stories.order('pub_datetime DESC')
    .limit(20)

    stories.each do |story|
      all_stories << story
      json.set! story.id do
        json.partial! 'api/stories/story', story: story
      end
    end
  end
end

# get all the user's subscribed feed
json.feeds do
  feed = @subscription.feed
  json.byId do
    json.set! feed.id do
      json.partial! 'api/feeds/feed', feed: feed
      json.stories all_stories.sort_by(&:pub_datetime).map(&:id).reverse
    end
  end

  json.allIds [feed.id]
end

# get basic info about subscription:
json.subscriptions do
  subscription = @subscription
  json.byId do
    json.set! subscription.feed_id do
      json.subscription_title subscription.title
      json.subscription_id subscription.id
      json.subscribed true
    end
  end
end
