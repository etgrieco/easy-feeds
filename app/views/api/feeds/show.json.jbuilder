all_stories = []

reads_join = "LEFT OUTER JOIN reads
ON reads.story_id = stories.id
AND reads.reader_id = #{current_user.id}"

json.stories({})
json.stories do
  json.byId({})
  json.byId do
    stories = @feed.stories
      .select("stories.*, reads.reader_id as read")
      .joins(reads_join)
      .order('pub_datetime DESC')
      .limit(20)
    stories.each do |story|
      all_stories << story
      json.set! story.id do
        json.partial! 'api/stories/story', story: story
      end
    end
  end

  json.allIds
end

json.feeds do
  json.byId do
    json.set! @feed.id do
      json.partial! 'api/feeds/feed', feed: @feed
      json.stories([])
      json.stories all_stories.sort_by(&:pub_datetime).map(&:id).reverse
    end
  end
end

json.subscriptions do
  json.byId do
    json.set! @feed.id do
      json.subcription_title @feed.title # dummy data for proper rendering
      json.subscribed !!@feed.subscriptions.find_by(subscriber_id: current_user)
    end
  end
end
