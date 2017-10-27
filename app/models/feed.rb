require 'feedjira'
require 'feed_favicon_helper'

class Feed < ApplicationRecord
  validates :title, :rss_url, :status, presence: true

  validates :description, :website_url, :image_url, :last_built,
    :favicon_url, presence: true, allow_blank: true

  before_create :set_time_to_now
  before_validation :fetch_and_parse

  has_many :subscriptions,
    foreign_key: :feed_id,
    class_name: :Subscription

  has_many :subscribers,
    through: :subscriptions,
    source: :subscriber

  def set_time_to_now
    self.last_built = Time.now
  end

  def fetch_and_parse
    puts "Fetching #{self.rss_url}"
    begin
      feed = Feedjira::Feed.fetch_and_parse self.rss_url
      self.title = feed.title
      self.website_url = feed.url
    rescue
      puts "Failed to find feed #{rss_url}"
      self.status = "ISSUES"
      if self.title.nil?
        self.title = "#{rss_url.slice(5..20)}_BROKEN"
        self.status = "DEAD"
      end
      return
    end

    self.description = "#{feed.title}: #{feed.url}"

    self.last_built =
      if feed.methods.include?('last_built')
        feed.last_built
      # elsif feed.methods.include?('last_modified')
      #   feed.last_modified
      else
        Time.now
      end

    host = URI(feed.url).host
    self.favicon_url = Favicon.new(host).uri || ''

    self.image_url = favicon_url
    # not all parsers support #image
    # if feed.methods.include?('image')
    #   self.image_url = feed.image.url
    # end
  end
end
