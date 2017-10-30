json.results @feeds.map(&:id)

json.feeds do
  @feeds.each do |feed|
    json.set! feed.id do
      json.partial! 'api/feeds/feed', feed: feed
      json.subscribed !!feed.followed
    end
  end
end
