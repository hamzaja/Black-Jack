class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.integer :money, :default => 500
      t.integer :win, :default => 0
      t.integer :lost, :default => 0

      t.timestamps
    end
  end
end
