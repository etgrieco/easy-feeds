json.results @feeds, :id

@feeds.each do |feed|
  json.set! feed.id do
    json.partial! 'api/feeds/feed', feed: feed
    #fix n + 1 query?
    json.subscribed feed.subscribed_by?(current_user)
  end
end
