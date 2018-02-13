require 'sanitize'
require 'metainspector'

class Story < ApplicationRecord
  validates :entry_id, presence: true
  validates :entry_id, uniqueness: {scope: :feed_id }

  belongs_to :feed,
    class_name: :Feed,
    foreign_key: :feed_id

  has_many :readers,
    through: :feed,
    source: :subscribers

  has_many :subscriptions,
    through: :feed,
    source: :subscriptions

  has_many :reads,
    foreign_key: :story_id,
    class_name: :Read,
    dependent: :destroy

  def self.create_from_entry_and_feed(fjra_entry, feed)
    link_url = fjra_entry.url

    begin
      page = MetaInspector.try(:new, link_url)
    rescue
    end

    entry_id = fjra_entry.entry_id || fjra_entry.url
    pub_datetime = fjra_entry.published || Time.now
    author = fjra_entry.author || feed.title || "Anonymous"
    summary = fjra_entry.summary || fjra_entry.content
    summary = Sanitize.fragment(summary, Sanitize::Config::BASIC)
    teaser = Sanitize.fragment(summary, Sanitize::Config::RESTRICTED)

    Story.create(
      entry_id: entry_id,
      feed_id: feed.id,
      title: fjra_entry.title,
      author: author,
      summary: summary,
      teaser: teaser,
      link_url: link_url,
      image_url: fjra_entry.try(:image) || page&.images&.best,
      pub_datetime: pub_datetime,
    )
  end

end
