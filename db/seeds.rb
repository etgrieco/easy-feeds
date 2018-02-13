# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

Feed.destroy_all
seed_urls = [
  "http://feeds.bbci.co.uk/news/world/rss.xml",
  "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  "http://www.politico.com/rss/congress.xml",
  "https://www.polygon.com/rss/index.xml",
  "http://feeds.feedburner.com/TechCrunch/",
  "http://www.techradar.com/rss",
  "http://github.com/blog.atom",
  "http://www.espn.com/espn/rss/news",
  "https://www.theringer.com/rss/index.xml",
  "https://www.boston.com/tag/local-news/feed",
  "https://www.politico.com/rss/politics08.xml",
  "https://feeds.thedailybeast.com/summary/rss/articles",
  "https://www.wired.com/feed/rss",
]

feeds = seed_urls.map do |url|
  f = Feed.new(rss_url: url)
  f if f.save
end
  .compact

User.destroy_all
users = Array.new(50) do
  u = User.new(
    email: Faker::Internet.unique.email,
    password: "password",
    first_name: Faker::Name.unique.first_name,
    last_name: Faker::Name.unique.last_name,
  )
  u if u.save
end
  .compact

Subscription.destroy_all
users.each do |user|
  feed_ids = Array.new(10) { feeds.sample.id }.compact

  feed_ids.uniq.each do |feed_id|
    s = Subscription.new(
      subscriber_id: user.id,
      feed_id: feed_id
    )
    s.title = Faker::Ancient.god if Random.rand(3) > 1
    s.save
  end
end
