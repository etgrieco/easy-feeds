require 'feedjira'
require 'feed_favicon_helper'

class Feed < ApplicationRecord
  validates :rss_url, presence: true

  has_many :subscriptions,
    foreign_key: :feed_id,
    class_name: :Subscription,
    dependent: :destroy

  has_many :subscribers,
    through: :subscriptions,
    source: :subscriber,
    dependent: :destroy

  has_many :stories,
    foreign_key: :feed_id,
    class_name: :Story,
    dependent: :destroy

  before_validation :check_feed_url_status, on: :create
  after_validation :populate_feed_metadata, on: :create
  after_save :populate_entries, on: :create

  def self.popular
    Feed
      .order("subscriptions_count DESC")
      .limit(20)
  end

  def subscribed_by?(user)
    !!user.subscriptions.find_by(feed_id: self.id)
  end

  def check_feed_url_status
    if self.rss_url.empty?
      errors.add(:base, "The url field cannot be empty")
      throw :abort
    end
    begin
      @feed = Feedjira::Feed.fetch_and_parse self.rss_url
    rescue
      puts "Feed url 404"
      errors.add(:base, "There was an issue fetching the feed. " +
        "Please check the URL or try again.")
      throw :abort
    end
  end

  def populate_feed_metadata
    @feed ||= Feedjira::Feed.fetch_and_parse self.rss_url

    title = @feed.title
    self.title = title.empty? ? "New Feed" : title
    self.website_url = @feed.url
    self.description = @feed.description || "#{@feed.title}: #{@feed.url}"

    self.last_built =
      if @feed.methods.include?('last_built')
        @feed.last_built
      else
        Time.now
      end

    host = URI(@feed.url).host
    self.favicon_url = Favicon.new(host).uri || ''

    self.image_url = favicon_url
  end

  def populate_entries
    @feed ||= Feedjira::Feed.fetch_and_parse self.rss_url

    stories = self.stories
    entries = @feed.entries

    entries.each do |entry|
      unless stories.find_by(entry_id: entry.entry_id)
        attributes = Story.create_attributes_hash(entry, self.id)
        Story.create(attributes)
      end
    end

    self.last_built = Time.now
  end

end
