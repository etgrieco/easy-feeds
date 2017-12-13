namespace :feed do
  desc "TODO"
  task refresh: :environment do
    Feed.all.each do |feed|
      feed.populate_entries
      if feed.stories.length > 300
        feed.stories.sort_by(&:pub_datetime).reverse[300..-1].each(&:destroy)
      end
    end
  end
end
