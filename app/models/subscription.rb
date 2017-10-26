class Subscription < ApplicationRecord
  validates :subscriber_id, :feed_id, :title, presence: true

  belongs_to :subscriber,
    class_name: "User",
    foreign_key: :subscriber_id,
    primary_key: :id

  belongs_to :feed,
    class_name: "Feed",
    foreign_key: :feed_id,
    primary_key: :id

end
