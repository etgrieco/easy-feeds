class Story < ApplicationRecord
  validates :entry_id, uniqueness: true

  belongs_to :feed,
    class_name: :Feed,
    foreign_key: :feed_id

  has_many :readers,
    through: :feed,
    source: :subscribers

def self.create_attributes_hash(fjra_entry, feed_id)
  {
    entry_id: fjra_entry.entry_id,
    title: fjra_entry.title,
    author: fjra_entry.author,
    summary: fjra_entry.summary,
    link_url: fjra_entry.url,
    image_url: fjra_entry.try(:image)&.url,
    feed_id: feed_id,
    pub_datetime: fjra_entry.published
  }
end

end
