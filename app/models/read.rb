class Read < ApplicationRecord

  belongs_to :reader,
    foreign_key: :reader_id,
    class_name: :User,
    dependent: :destroy

  belongs_to :story,
    foreign_key: :story_id,
    class_name: :Story,
    dependent: :destroy

end
