# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

Feed.destroy_all
puts "Destroyed all feeds!"
seed_urls = [
  "http://feeds.bbci.co.uk/news/world/rss.xml",
  "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
  "http://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml",
  "http://www.politico.com/rss/congress.xml",
  "https://www.polygon.com/rss/index.xml",
  "http://feeds.feedburner.com/TechCrunch/",
  "http://www.techradar.com/rss",
  "https://blog.github.com/blog.atom",
  "http://www.espn.com/espn/rss/news",
  "https://www.theringer.com/rss/index.xml",
  "https://www.boston.com/tag/local-news/feed",
  "https://www.politico.com/rss/politics08.xml",
  "https://feeds.thedailybeast.com/summary/rss/articles",
  "https://www.wired.com/feed/rss",
]

feeds = seed_urls.map do |url|
  puts "Fetching and parsing #{url}"
  f = Feed.new(rss_url: url)
  if f.save
    puts "Fetch and parsing #{url} succeeded!"
    f
  else
    puts "Fetch and parsing #{url} failed!"
  end
end
.compact!

User.destroy_all
puts "Destroyed all users!"
users = Array.new(50) do
  u = User.new(
    email: Faker::Internet.unique.email,
    password: 'password',
    first_name: Faker::Name.unique.first_name,
    last_name: Faker::Name.unique.last_name
  )
  u if u.save
end
users.compact!
puts "50 seed users created!"

Subscription.destroy_all
puts "Destroyed all subscriptions"
users.each do |user|
  feed_ids = Array.new(10) { Feed.all.sample.id }.compact

  feed_ids.uniq.each do |feed_id|
    s = Subscription.new(
      subscriber_id: user.id,
      feed_id: feed_id
    )
    s.title = Faker::Ancient.god if Random.rand(3) > 1
    s.save
  end
end
puts "Assigned 10 subscriptions for each user!"
