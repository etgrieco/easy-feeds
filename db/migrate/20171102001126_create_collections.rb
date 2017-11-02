class CreateCollections < ActiveRecord::Migration[5.1]
  def change
    create_table :collections do |t|
      t.string :name
      t.integer :creator_id

      t.timestamps
    end
    add_index :collections, [:creator_id, :name], unique: true
  end
end
