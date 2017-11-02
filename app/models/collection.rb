class Collection < ApplicationRecord
  validates :creator_id, :name, presence: true
  validates :creator_id, uniqueness: { scope: :name }

  belongs_to :creator,
    foreign_key: :creator_id,
    class_name: :User

  has_many :collection_assignments,
    foreign_key: :collection_id,
    class_name: :CollectionAssignment

  has_many :subscriptions,
    through: :collection_assignments,
    source: :subscription

  has_many :stories,
    through: :subscriptions,
    source: :stories

  has_many :feeds,
    through: :subscriptions,
    source: :feed

end
