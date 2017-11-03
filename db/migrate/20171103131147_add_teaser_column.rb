class AddTeaserColumn < ActiveRecord::Migration[5.1]
  def change
    add_column :stories, :teaser, :string, default: "Continue reading..."
  end
end
