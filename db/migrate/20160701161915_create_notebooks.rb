class CreateNotebooks < ActiveRecord::Migration
  def change
    create_table :notebooks do |t|
      t.integer :author_id, null: false
      t.string :title, null: false

      t.index :author_id

      t.timestamps null: false
    end
  end
end
