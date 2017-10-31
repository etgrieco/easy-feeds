all_feeds = []
user_stories = current_user.stories
  .order('pub_datetime DESC')
  .limit(20)
  .includes(:feed)

json.feeds({})
json.feeds do
  json.byId do
    @subs.each do |subscription|
      feed = subscription.feed
      all_feeds << feed
      json.set! feed.id do
        json.partial! 'api/feeds/feed', feed: feed
        json.stories (user_stories.select { |story| story.feed_id == feed.id })
      end
    end
  end

  json.allIds all_feeds.sort_by(&:last_built).map(&:id).reverse
end


# get basic info about subscription:
json.subscriptions({})
json.subscriptions do
  json.byId do
    @subs.each do |subscription|
      json.set! subscription.feed_id do
        json.subscription_title subscription.title
        json.subscription_id subscription.id
        json.subscribed true
      end
    end
  end
end

# get stories (perhaps later map to collections?)
json.stories({})
json.stories do
  json.byId do
    user_stories.each do |story|
      json.set! story.id do
        json.partial! 'api/stories/story', story: story
      end
    end
  end

  json.allIds user_stories.sort_by(&:pub_datetime).map(&:id).reverse
end
