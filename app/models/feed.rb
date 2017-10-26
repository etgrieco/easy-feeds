class Feed < ApplicationRecord
  validates :title, :rss_url, :description, :favicon_url,
    :website_url, :last_publish, presence: true

  before_intialize :update_last_publish
  before_validation :sanitize_urls

  def sanitize_urls
    @rss_url = sanitize(rss_url)
    @website_url = sanitize(website_url)
    @favicon_url = sanitize(favicon_url)
  end

  def update_last_publish
    
  end

end
