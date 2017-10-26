class CreateFeeds < ActiveRecord::Migration[5.1]
  def change
    create_table :feeds do |t|
      t.string :title, null: false
      t.string :rss_url, null: false
      t.string :description, null: false, default: ""
      t.string :favicon_url, null: false, default: ""
      t.string :image_url, null: false, default: ""
      t.string :website_url, null: false, default: ""
      t.datetime :last_built, null: false, default: Time.now

      t.timestamps
    end
    add_index :feeds, :title
    add_index :feeds, :rss_url, unique: true
  end
end
