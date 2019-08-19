class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.integer :money
      t.integer :win
      t.integer :lost

      t.timestamps
    end
  end
end
