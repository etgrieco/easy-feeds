require 'feedjira'
require 'feed_favicon_helper'

class Feed < ApplicationRecord
  validates :title, :rss_url, presence: true

  validates :description, :website_url, :image_url, :last_built,
    :favicon_url, presence: true, allow_blank: true

  before_create :set_time_to_now
  before_validation :fetch_and_parse

  has_many :subscriptions,
    foreign_key: :subscriber_id,
    class_name: :Subscription

  has_many :subscribers,
    through: :subscriptions,
    source: :subscriber

  def set_time_to_now
    self.last_built = Time.now
  end

  def fetch_and_parse
    feed = Feedjira::Feed.fetch_and_parse self.rss_url

    self.title = feed.title || ""
    self.description = "#{feed.title}: #{feed.url}"
    self.website_url = feed.url || ""
    self.image_url = feed.image && feed.image.url || ""
    self.last_built = feed.last_built || feed.last_modified || Time.now

    host = URI(feed.url).host
    self.favicon_url = Favicon.new(host).uri
  end

end
