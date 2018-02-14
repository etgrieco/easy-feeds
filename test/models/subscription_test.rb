require 'test_helper'

class SubscriptionTest < ActiveSupport::TestCase
  test 'does not create subscription without feed' do
    subscription = Subscription.new(subscriber_id: users(:johnsmith).id, title: "sub")
    assert_not subscription.save
  end

  test 'does not create subscription without user' do
    subscription = Subscription.new(feed_id: feeds(:bbc).id, title: "sub")
    assert_not subscription.save
  end

  test 'provides default title when no subscription title given' do
    subscription = Subscription.new(subscriber_id: users(:janedoe).id, feed_id: feeds(:bbc).id)
    assert_equal 'BBC', subscription.title
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
end
