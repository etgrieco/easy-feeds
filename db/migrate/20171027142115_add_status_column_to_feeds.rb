class AddStatusColumnToFeeds < ActiveRecord::Migration[5.1]
  def change
    add_column :feeds, :status, :string, only: ["OK", "ISSUES", "DEAD"]
  end
end
