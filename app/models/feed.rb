require 'feedjira'
require 'feed_favicon_helper'
require 'metainspector'

class Feed < ApplicationRecord
  attr_accessor :populate

  validates :rss_url, presence: true

  has_many  :subscriptions,
            foreign_key: :feed_id,
            class_name: :Subscription,
            dependent: :destroy

  has_many  :subscribers,
            through: :subscriptions,
            source: :subscriber

  has_many  :stories,
            foreign_key: :feed_id,
            class_name: :Story,
            dependent: :destroy

  before_validation :validate_feed, on: :create
  after_initialize :ensure_populate_default, on: :create

  if @populate
    after_validation :populate_feed_metadata, on: :create
    after_create :populate_entries
  end

  def self.popular
    Feed
      .order('subscriptions_count DESC')
      .limit(20)
  end

  # before_validation (create)
  def validate_feed
    if rss_url.empty?
      errors.add  :base,
                  'The url field cannot be empty'

      throw :abort
    end

    begin
      @feedjira_feed = Feedjira::Feed.fetch_and_parse rss_url
    rescue
      errors.add  :base,
                  "There was an issue fetching the feed." \
                    " Please check the URL or try again."

      throw :abort
    end
  end

  # before_validation
  def ensure_populate_default
    @populate = true
  end

  # after_validation (create)
  def populate_feed_metadata
    @feedjira_feed ||= Feedjira::Feed.fetch_and_parse rss_url

    title = @feedjira_feed.title
    self.title = title.empty? ? "New Feed" : title
    self.website_url = @feedjira_feed.url
    self.description = @feedjira_feed.description || "#{@feedjira_feed.title}: #{@feedjira_feed.url}"

    self.last_built = Time.now

    host = URI(@feedjira_feed.url).host
    self.favicon_url = Favicon.new(host).uri || 'https://i.imgur.com/hGzwKc1.png'

    self.image_url = favicon_url
  end

  def subscription_title(user)
    user.subscriptions.find_by(feed_id: id)&.title || title
  end

  def populate_entries
    @feedjira_feed ||= Feedjira::Feed.fetch_and_parse rss_url

    @feedjira_feed.entries.each do |entry|
      unless stories.find_by(entry_id: entry.entry_id)
        Story.create_from_entry_and_feed(entry, self)
      end
    end

    self.last_built = entries.map { |entry| entry.published || Time.now }.max
    save
  end

end
