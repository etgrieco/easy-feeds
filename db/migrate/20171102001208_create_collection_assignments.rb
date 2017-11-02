class CreateCollectionAssignments < ActiveRecord::Migration[5.1]
  def change
    create_table :collection_assignments do |t|
      t.integer :subscription_id
      t.integer :collection_id

      t.timestamps
    end
    add_index :collection_assignments, [:subscription_id, :collection_id],
      unique: true, name: "index_collection_assignments_on_sub_id_and_coll_id"
  end
end
