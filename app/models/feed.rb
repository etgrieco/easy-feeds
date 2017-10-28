require 'feedjira'
require 'feed_favicon_helper'

class Feed < ApplicationRecord
  validates :rss_url, presence: true

  validates :title, :description, :website_url, :image_url, :last_built,
    :favicon_url, presence: true, allow_blank: true

  has_many :subscriptions,
    foreign_key: :feed_id,
    class_name: :Subscription

  has_many :subscribers,
    through: :subscriptions,
    source: :subscriber

  def before_create
    begin
      feed = Feedjira::Feed.fetch_and_parse self.rss_url
      self.title = feed.title
      self.website_url = feed.url
    rescue
      self.errors[:rss_url] << "There was an issue fetching the feed. " +
        "Please check the URL or try again."
    end

    self.description = "#{feed.title}: #{feed.url}"

    self.last_built =
      if feed.methods.include?('last_built')
        feed.last_built
      else
        Time.now
      end

    host = URI(feed.url).host
    self.favicon_url = Favicon.new(host).uri || ''

    self.image_url = favicon_url
  end

end
