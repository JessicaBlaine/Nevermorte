
json.partial! 'notebook', notebook: @notebook
json.notes do
  json.array! @notebook.notes, partial: 'api/notes/note', as: :note
end
