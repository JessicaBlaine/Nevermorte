
json.array! @notebooks do |notebook|
  json.partial! 'notebook', notebook: notebook
  json.noteCount notebook.notes.length
end
