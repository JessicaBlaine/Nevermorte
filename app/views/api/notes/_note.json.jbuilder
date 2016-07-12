
json.extract! note, :id, :title, :body, :notebook_id, :created_at, :updated_at

json.tags do
  json.array! note.tags, :name
end
