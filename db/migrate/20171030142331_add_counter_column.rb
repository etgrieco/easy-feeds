class AddCounterColumn < ActiveRecord::Migration[5.1]
  def change
    add_column :feeds, :subscriptions_count, :integer, default: 0
  end
end
