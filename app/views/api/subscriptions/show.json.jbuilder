# get 20 most-recent stories
all_stories = []
subscription = @subscription

json.stories do
  json.byId do
    stories = subscription.stories.order('pub_datetime DESC').limit(20)
    stories.each do |story|
      all_stories << story
      json.set! story.id do
        json.partial! 'api/stories/story', story: story
      end
    end
  end
end

# get the user's subscribed feed
json.feeds do
  feed = subscription.feed
  json.byId do
    json.set! feed.id do
      json.partial! 'api/feeds/feed', feed: feed
      json.stories all_stories.sort_by(&:pub_datetime).map(&:id).reverse
    end
  end

  # get feedId (in an array for adding to subscriptions array)
  json.allIds [feed.id]
end

# get basic subscription info (in an object)
json.subscriptions do
  json.byId do
    json.set! subscription.feed_id do
      json.subscription_title subscription.title
      json.subscription_id subscription.id
      json.subscribed !!current_user.subscriptions.find_by(id: subscription.id)
    end
  end
end
