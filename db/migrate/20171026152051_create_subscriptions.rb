class CreateSubscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :subscriptions do |t|
      t.integer :subscriber_id, null: false
      t.integer :feed_id, null: false
      t.string :title, null: false

      t.timestamps
    end
    add_index :subscriptions, [:subscriber_id, :feed_id], unique: true
    add_index :subscriptions, :title
  end
end
