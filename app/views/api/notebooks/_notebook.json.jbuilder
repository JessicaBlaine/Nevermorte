
json.extract! notebook, :id, :title, :created_at, :updated_at
json.noteCount notebook.notes.length
