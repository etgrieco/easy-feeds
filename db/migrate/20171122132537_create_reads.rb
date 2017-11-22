class CreateReads < ActiveRecord::Migration[5.1]
  def change
    create_table :reads do |t|
      t.integer :reader_id
      t.integer :story_id

      t.timestamps
    end
    add_index :reads, [:reader_id, :story_id], unique: true
  end
end
