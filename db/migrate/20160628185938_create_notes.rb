class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :author_id, null: false
      t.string :notebook_id, null: false
      t.boolean :archived, null: false

      t.index :author_id
      t.index :notebook_id

      t.timestamps null: false
    end
  end
end
