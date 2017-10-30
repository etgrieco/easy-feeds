class AddStoriesEntryIdIndex < ActiveRecord::Migration[5.1]
  def change
  end
  add_index :stories, :entry_id, unique: true
end
