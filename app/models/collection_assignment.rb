class CollectionAssignment < ApplicationRecord
  validates :subscription_id, :collection_id, presence: true

  belongs_to :subscription,
    foreign_key: :subscription_id,
    class_name: :subscription_id

  belongs_to :collection,
    foreign_key: :collection_id,
    class_name: :Collection

end
