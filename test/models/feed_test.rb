require 'test_helper'

class FeedTest < ActiveSupport::TestCase
  bbc_feed = Feed.new(
    rss_url: "http://feeds.bbci.co.uk/news/world/rss.xml",
    populate: false
  )
  empty_feed = Feed.new(rss_url: "")
  broken_feed = Feed.new(rss_url: "http://bad_url.com")

  test 'does not save empty feed url' do
    assert_not empty_feed.save
  end

  test 'stores appropriate errors with empty feed url' do
    assert_includes(
      empty_feed.errors.messages[:base],
      "The url field cannot be empty"
    )
  end

  test 'does not save broken feed url' do
    assert_not broken_feed.save
  end

  test 'stores appropriate errors with broken feed url' do
    assert_includes(
      broken_feed.errors.messages[:base],
      <<~HEREDOC
        There was an issue fetching the feed. Please check the URL or try again.
      HEREDOC
    )
  end

  test 'saves valid feed url' do
    assert bbc_feed.save
  end
end
