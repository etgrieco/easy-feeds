class CreateSubscriptions < ActiveRecord::Migration[5.1]
  def change
    create_table :subscriptions do |t|
      t.integer :subscriber_id, null: false
      t.integer :feed_id, null: false
      t.string :title, null: false

      t.timestamps
    end
  end
end
