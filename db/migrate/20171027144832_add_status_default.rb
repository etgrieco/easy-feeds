class AddStatusDefault < ActiveRecord::Migration[5.1]
  def change
    change_column :feeds, :status, :string, default: "OK", only: ["OK", "ISSUES", "DEAD"]
  end
end
