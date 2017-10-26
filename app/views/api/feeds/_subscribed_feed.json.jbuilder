json.extract! feed, :id, :favicon_url,
  :website_url, :description

#use user's custom title
json.feed { json.title title }
