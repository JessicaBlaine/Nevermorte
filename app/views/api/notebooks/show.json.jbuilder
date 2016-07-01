
json.partial! 'notebook', notebook: @notebook

json.notes do
  puts @notebook
  puts @notebook.notes
  json.array! @notebook.notes, partial: 'api/notes/note', as: :note
end
