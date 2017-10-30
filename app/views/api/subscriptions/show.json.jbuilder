# get all the user's subscribed feeds
json.feed do
  json.set! @subscription.feed_id do
    json.partial! 'api/feeds/feed', feed: @subscription.feed
  end
end

# get basic info about subscription:
json.subscription do
  json.set! @subscription.feed_id do
    json.subscription_title @subscription.title
    json.subscription_id @subscription.id
    json.subscribed true
  end
end

json.stories do
  subbed_stories = @subscription.stories
  json.byId do
    subbed_stories.each do |story|
      json.set! story.id do
        json.partial! 'api/stories/story', story: story
      end
    end
  end
end

# FIX THIS
# json.allIds do
#   stories.map(&:id)
# end
