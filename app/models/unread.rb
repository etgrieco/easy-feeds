class Unread < ApplicationRecord

  belongs_to :reader,
    foreign_key: :reader_id,
    class_name: :User

  belongs_to :story,
    foreign_key: :reader_id,
    class_name: :Story

end
