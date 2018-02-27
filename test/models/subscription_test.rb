require 'test_helper'

class SubscriptionTest < ActiveSupport::TestCase
  test 'does not create subscription without feed' do
    subscription = Subscription.new(
      subscriber_id: users(:johnsmith),
      title: "sub"
    )
    assert_not subscription.save
  end

  test 'does not create subscription without user' do
    subscription = Subscription.new(
      feed_id: feeds(:bbc),
      title: "sub"
    )
    assert_not subscription.save
  end

  test 'provides default title when none given' do
    subscription = Subscription.new(
      subscriber: users(:janedoe),
      feed: feeds(:bbc)
    )
    assert_equal feeds(:bbc).title, subscription.title
  end

  test 'assigns custom subscription title when given' do
    assert_equal 'My Subscription', subscriptions(:bbc_sub).title
  end

  test 'does not create duplicate subscriptions' do
    subscription2 = Subscription.new(
      subscriber_id: users(:johnsmith).id,
      feed_id: feeds(:bbc).id,
      title: 'Another subscription'
    )
    assert_not subscription2.save
  end

  test 'does not allow updated subscription title to be blank' do
    assert_not subscriptions(:bbc_sub).update(title: '')
  end

  test 'handles subscription creation with existing rss_url' do
    subscription = Subscription.build_by_rss_url(
      rss_url: feeds(:bbc).rss_url,
      subscriber: users(:janedoe),
      title: 'My Subscription'
    )

    assert_equal 'My Subscription', subscription.title
    assert subscription.save
  end

  test 'error with invalid rss_url' do
    subscription = Subscription.build_by_rss_url(
      rss_url: "http://example.com/rss",
      subscriber: users(:janedoe),
      title: 'My Broken Subscription'
    )

    assert_includes(
      subscription.errors.full_messages,
      "There was an issue fetching the feed. Please check the URL or try again."
    )
    assert_not subscription.save
  end

  test 'error with empty rss_url' do
    subscription = Subscription.build_by_rss_url(
      rss_url: '',
      subscriber: users(:janedoe),
      title: 'My Broken Subscription'
    )

    assert_includes(
      subscription.errors.full_messages,
      'The url field cannot be empty'
    )

    assert_not subscription.save
  end

  test 'handles subscription creation with valid new rss_url' do
    subscription = Subscription.build_by_rss_url(
      rss_url: "http://www.feedforall.com/sample.xml",
      title: 'Sampe RSS Feed',
      subscriber: users(:janedoe)
    )

    assert subscription.save
    assert subscription.feed
    assert subscription.stories
    assert subscription.subscriber
  end
end
