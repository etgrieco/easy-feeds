# json.results (@feeds.map {|feed| feed.id })
json.results @feeds.map(&:id)

json.feeds do
  json.byId do
    @feeds.each do |feed|
      json.set! feed.id do
        json.partial! 'api/feeds/feed', feed: feed
        json.subscribed !!feed.followed
      end
    end
  end
end
