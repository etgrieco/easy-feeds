# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

User.destroy_all!

users = []
50.times do
  u = User.new(
    email: Faker::Internet.unique.email,
    password: "password",
    first_name: Faker::Name.unique.first_name,
    last_name: Faker::Name.unique.last_name,
  )
  users << u
  u.save!
end

Feed.destroy_all

seed_urls = (
  "http://feeds.bbci.co.uk/news/world/rss.xml*
http://www.cbn.com/cbnnews/world/feed/*
http://feeds.reuters.com/Reuters/worldNews*
http://feeds.bbci.co.uk/news/rss.xml*
http://news.sky.com/sky-news/rss/home/rss.xml*
http://www.cbn.com/cbnnews/us/feed/*
http://feeds.reuters.com/Reuters/domesticNews*
http://news.yahoo.com/rss/*
http://feeds.bbci.co.uk/news/technology/rss.xml*
http://feeds.bbci.co.uk/news/business/rss.xml*
http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml*
http://www.politico.com/rss/congress.xml*
https://www.polygon.com/rss/index.xml*
http://feeds.feedburner.com/TechCrunch/*
https://www.wired.com/feed/rss*
http://www.techradar.com/rss*
http://github.com/blog.atom*
").split("*\n")

feeds = []
seed_urls.each do |url|
  f = Feed.new(url)
  feeds << f
  f.save!
end

Subscription.destroy_all


users.each do |user|
  feed_ids = Array.new(10) { feeds.sample.id }.unique
  feed_ids.each do |feed_id|
    s = Subscription.new(
      subscriber_id: user.id,
      feed_id: feed_id
    )
    s.title
  end
end

# Subscription.destroy_all
# Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
# Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
# Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
# Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
# Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
# Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
# Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
# Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
# Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
# Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
