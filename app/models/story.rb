require 'sanitize'

class Story < ApplicationRecord
  validates :entry_id, presence: true
  validates :entry_id, uniqueness: {scope: :feed_id }

  belongs_to :feed,
    class_name: :Feed,
    foreign_key: :feed_id

  has_many :readers,
    through: :feed,
    source: :subscribers

  def self.sanitize_summary(summary)
    Sanitize.fragment(summary, Sanitize::Config::RESTRICTED)
  end

  def self.create_attributes_hash(fjra_entry, feed_id, feed_title)
    entry_id = fjra_entry.entry_id || fjra_entry.url
    pub_datetime = fjra_entry.published || Time.now
    author = fjra_entry.author || feed_title || "Anonymous"
    summary = sanitize_summary(fjra_entry.summary)
    {
      entry_id: entry_id,
      title: fjra_entry.title,
      author: author,
      summary: summary,
      link_url: fjra_entry.url,
      image_url: fjra_entry.try(:image),
      feed_id: feed_id,
      pub_datetime: pub_datetime
    }
  end

end
