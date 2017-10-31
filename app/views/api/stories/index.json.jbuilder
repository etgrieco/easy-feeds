json.stories({})
json.stories do
  json.byId do
    @stories.each do |story|
      json.set! story.id do
        json.partial! 'api/stories/story', story: story
      end
    end
  end

  json.allIds @stories.sort_by(&:pub_datetime).map(&:id).reverse
end
