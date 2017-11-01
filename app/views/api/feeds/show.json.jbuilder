all_stories = []
json.stories do
  json.byId do
    stories = @feed.stories.order('pub_datetime DESC').limit(20)
    stories.each do |story|
      json.partial! 'api/stories/story', story: story
      all_stories << story
    end
  end

  json.allIds
end

json.feeds do
  json.byId do
    json.set! @feed.id do
      json.partial! 'api/feeds/feed', feed: @feed
      json.subcription_title @feed.title # dummy data for proper rendering
      json.subscribed 
      json.stories([])
      json.stories all_stories.sort_by(&:pub_datetime).map(&:id).reverse
    end
  end
end
