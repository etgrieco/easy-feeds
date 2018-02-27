reads_join = "LEFT OUTER JOIN reads
ON reads.story_id = stories.id
AND reads.reader_id = #{current_user.id}"

# get 20 most-recent stories
all_stories = []
subscription = @subscription

json.stories({})
json.stories do
  json.byId({})
  json.byId do
    stories = subscription.stories
                          .select("stories.*, reads.reader_id as read")
                          .joins(reads_join)
                          .order('pub_datetime DESC')
                          .where("reads.id IS NULL
                                 OR reads.updated_at > :within_last_three_minutes",
                                 within_last_three_minutes: Time.now - 180)
                          .limit(20)
                          .offset(params[:offset])

    stories.to_a.each do |story|
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

# get basic subscription info, organized by feed ID.
json.subscriptions do
  json.byId do
    json.set! subscription.feed_id do
      json.subscription_title subscription.title
      json.subscription_id subscription.id
      json.subscribed !!current_user.subscriptions.find_by(id: subscription.id)
    end
  end
end
