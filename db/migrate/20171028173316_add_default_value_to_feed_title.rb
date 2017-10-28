class AddDefaultValueToFeedTitle < ActiveRecord::Migration[5.1]
  def change
    change_column :feeds, :title, :string, null: false, default: ""
  end
end
