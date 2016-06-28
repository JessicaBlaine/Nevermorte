class RemoveArchivedFromNotes < ActiveRecord::Migration
  def change
    remove_column :notes, :archived, :boolean
  end
end
