@feeds.each do |feed|
  json.set! feed.id do
    json.partial! 'api/feeds/feed', feed: feed
  end
end
