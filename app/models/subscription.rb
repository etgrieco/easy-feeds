class Subscription < ApplicationRecord
  validates :subscriber_id, :feed_id, :title, presence: true
  validates :feed_id, uniqueness: { scope: :subscriber_id }

  # add before creates: default sub name
  before_validation do
    self.title = feed.title if self.title.empty?
  end

  belongs_to :subscriber,
    class_name: "User",
    foreign_key: :subscriber_id,
    primary_key: :id

  belongs_to :feed,
    class_name: "Feed",
    foreign_key: :feed_id,
    primary_key: :id

end
