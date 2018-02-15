require 'test_helper'

class FeedTest < ActiveSupport::TestCase
  empty_feed = Feed.new(rss_url: "")
  broken_feed = Feed.new(rss_url: "http://bad_url.com")

  test 'does not save empty feed url' do
    assert_not empty_feed.save
  end

  test 'stores appropriate errors with empty feed url' do
    empty_feed.save
    assert_includes(
      empty_feed.errors.full_messages,
      "The url field cannot be empty"
    )
  end

  test 'does not save broken feed url' do
    assert_not broken_feed.save
  end

  test 'stores appropriate errors with broken feed url' do
    broken_feed.save
    assert_includes(
      broken_feed.errors.full_messages,
      "There was an issue fetching the feed. Please check the URL or try again."
    )
  end

  test 'saves valid feed url' do
    assert feeds(:bbc).save
  end
end
