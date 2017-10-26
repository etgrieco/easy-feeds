# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Feed.destroy_all!

feeds = []
nyt = Feed.new(rss_url: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml")
nyt.save! ; feeds << nyt
politico = Feed.new(rss_url: "http://www.politico.com/rss/congress.xml")
politco.save! ; feeds << politico
polygon = Feed.new(rss_url: "https://www.polygon.com/rss/index.xml")
polygon.save! ; feeds << polygon

tus = []
User.where(first_name: "TEST").each { |u| u.destroy! }
tu1 = User.new(email: "test_user@test.com", first_name: "TEST", password: "password123")
tu1.save! ; tu1 << tu1
tu2 = User.new(email: "test_user2@test.com", first_name: "TEST", password: "password123")
tu2.save! ; tu2 << tu2
tu3 = User.new(email: "test_user3@test.com", first_name: "TEST", password: "password123")
tu3.save! ; tu3 << tu3
tu4 = User.new(email: "test_user4@test.com", first_name: "TEST", password: "password123")
tu4.save! ; tu4 << tu4
tu5 = User.new(email: "test_user5@test.com", first_name: "TEST", password: "password123")
tu5.save! ; tu5 << tu5
tu6 = User.new(email: "test_user6@test.com", first_name: "TEST", password: "password123")
tu6.save! ; tu6 << tu6


Subscription.destroy_all!

Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
Subscription.create(title: "test-subscription", subscriber_id: tus.sample.id, feed_id: feeds.sample.id)
