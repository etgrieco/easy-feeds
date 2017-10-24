class RemoveImgUrlFromUser < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :img_url
  end
end
