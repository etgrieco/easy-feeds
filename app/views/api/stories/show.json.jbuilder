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
      json.feedInfo do
        json.id @story.feed.id
        json.title @story.feed.subscription_title(current_user)
      end
    end
  end
  json.allIds [@story.id]
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
