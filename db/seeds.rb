# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

Feed.destroy_all
seed_urls = (
"http://feeds.bbci.co.uk/news/world/rss.xml*
http://www.cbn.com/cbnnews/world/feed/*
http://feeds.reuters.com/Reuters/worldNews*
http://feeds.bbci.co.uk/news/rss.xml*
http://news.sky.com/sky-news/rss/home/rss.xml*
http://feeds.reuters.com/Reuters/domesticNews*
http://feeds.bbci.co.uk/news/technology/rss.xml*
http://feeds.bbci.co.uk/news/business/rss.xml*
http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml*
http://www.politico.com/rss/congress.xml*
https://www.polygon.com/rss/index.xml*
http://feeds.feedburner.com/TechCrunch/*
https://www.wired.com/feed/rss*
http://www.techradar.com/rss*
http://github.com/blog.atom*
http://rss.nytimes.com/services/xml/rss/nyt/Politics.xml*
http://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml*
http://rss.nytimes.com/services/xml/rss/nyt/Business.xml*
http://www.espn.com/espn/rss/news*
https://www.theringer.com/rss/index.xml*
https://www.boston.com/tag/local-news/feed*
https://www.boston.com/tag/politics/feed*
https://www.politico.com/rss/politics08.xml*
").split("*\n")

feeds = []
seed_urls.each do |url|
  f = Feed.new(rss_url: url)
  feeds << f
  f.save
end

User.destroy_all
users = []

50.times do
  u = User.new(
    email: Faker::Internet.unique.email,
    password: "password",
    first_name: Faker::Name.unique.first_name,
    last_name: Faker::Name.unique.last_name,
  )
  users << u
  u.save
end

Subscription.destroy_all
users.each do |user|
  feed_ids = Array.new(10) do
    feed = feeds.sample
    feed.id
  end
  feed_ids.uniq.each do |feed_id|
    next if feed_id.nil?
    s = Subscription.new(
      subscriber_id: user.id,
      feed_id: feed_id
    )
    s.title = Faker::Ancient.god if Random.rand(3) > 1
    s.save
  end
end
