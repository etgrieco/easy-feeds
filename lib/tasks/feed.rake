namespace :feed do
  desc "TODO"
  task refresh: :environment do
    Feed.all.each(&:populate_entries)
  end
end
