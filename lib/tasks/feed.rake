namespace :feed do
  desc "TODO"
  task refresh: :environment do
    Feed.all.each do |feed|
      feed.populate_entries
      if feed.stories.length > 200
        feed.stories.sort_by(&:pub_datetime).reverse[200..-1].each(&:destroy)
      end
    end
  end
end
