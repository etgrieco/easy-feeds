json.feeds do
  json.byId do
    json.set! @story.feed.id do
      json.partial! 'api/feeds/feed', feed: @story.feed
      json.stories [@story.id]
    end
  end
end

json.stories do
  json.byId do
    json.set! @story.id do
      json.partial! "api/stories/story", story: @story
    end
  end
end

json.subscriptions do
  json.byId do
    json.set! @story.feed.id do
      user_sub = current_user.subscriptions.find_by(feed_id: @story.feed)
      json.subscription_title user_sub&.title || @story.feed.title
      json.subscribed !!user_sub
    end
  end
end
