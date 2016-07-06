
json.partial! 'api/notes/note', note: @note

json.tags do
  json.array! @note.tags, :name
end
