class AddDefaultToSubscriptions < ActiveRecord::Migration[5.1]
  def change
    change_column :subscriptions, :title, :string, default: ""
  end
end
