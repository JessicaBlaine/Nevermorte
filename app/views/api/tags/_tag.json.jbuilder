
json.extract! tag, :name

json.notes do
  json.array! tag.notes, :id, :title, :body, :notebook_id, :created_at, :updated_at
end
