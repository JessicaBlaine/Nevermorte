
json.array! @notebooks do |notebook|
  json.partial! 'notebook', notebook: notebook
end
