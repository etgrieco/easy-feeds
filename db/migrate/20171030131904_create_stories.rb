class CreateStories < ActiveRecord::Migration[5.1]
  def change
    create_table :stories do |t|
      t.string :entry_id
      t.string :title
      t.string :author
      t.string :summary
      t.string :link_url
      t.string :image_url
      t.integer :feed_id, null: false
      t.datetime :pub_datetime

      t.timestamps
    end
    add_index :stories, [:feed_id, :entry_id], unique: true
  end
end
