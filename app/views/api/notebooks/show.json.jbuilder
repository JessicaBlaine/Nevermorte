
json.partial! 'notebook', notebook: @notebook
json.creator @creator
json.notes do
  json.array! @notebook.notes, partial: 'api/notes/note', as: :note
end
