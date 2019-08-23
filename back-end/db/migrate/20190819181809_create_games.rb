class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.string :player
      t.belongs_to :user

      t.timestamps
    end
  end
end
