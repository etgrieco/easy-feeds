class Collection < ApplicationRecord
  validates :creator_id, :name, presence: true

  belongs_to :creator,
    foreign_key: :creator_id,
    class_name: :User

  has_many :collection_assignments,
    foreign_key: :collection_id,
    class_name: :CollectionAssignments

  has_many :subscriptions,
    through: :collection_assignments,
    source: :subscription

end
