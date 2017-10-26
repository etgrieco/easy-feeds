require 'feedjira'

class Feed < ApplicationRecord
  validates :title, :rss_url, :description, :favicon_url, :image_url
    :website_url, :last_built, presence: true

  before_intialize :update_fields
  before_validation :fetch_and_parse, :sanitize_urls

  def sanitize_urls
    @rss_url = sanitize(rss_url)
    @website_url = sanitize(website_url)
    @favicon_url = sanitize(favicon_url)
  end

  def update_fields

  end

  def fetch_and_parse
    @feed = Feedjira::Feed.fetch_and_parse @rss_url

    @title, @rss_url, @description, @website_url, @image_url =
    @feed.title || "", @feed.url || "", @feed.description || "",
    @feed.url || "", @feed.image.url || ""

    @last_built = @feed.last_built || @feed.last_modified
  end

end
