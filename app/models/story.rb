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
    class_name: :Read

  def self.create_attributes_hash(fjra_entry, feed_id, feed_title)
    link_url = fjra_entry.url

    begin
      page = MetaInspector.try(:new, link_url)
    rescue
    end

    entry_id = fjra_entry.entry_id || fjra_entry.url
    pub_datetime = fjra_entry.published || Time.now
    author = fjra_entry.author || feed_title || "Anonymous"
    summary = fjra_entry.summary || fjra_entry.content
    summary = Sanitize.fragment(summary, Sanitize::Config::BASIC)
    teaser = Sanitize.fragment(summary, Sanitize::Config::RESTRICTED)

    {
      entry_id: entry_id,
      title: fjra_entry.title,
      author: author,
      summary: summary,
      teaser: teaser,
      link_url: link_url,
      image_url: fjra_entry.try(:image) || page&.images&.best,
      feed_id: feed_id,
      pub_datetime: pub_datetime
    }
  end

end
