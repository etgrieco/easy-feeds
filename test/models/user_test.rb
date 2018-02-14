require 'test_helper'

class UserTest < ActiveSupport::TestCase
  user1_attrs = {
    email: 'test_user@email.com',
    password: 'password',
    first_name: 'demo',
    last_name: 'user',
    give_seeds: false
  }

  user1 = User.new(user1_attrs)

  test 'should not save without an email' do
    user = User.new(user1_attrs.merge(email: ''))
    assert_not user.save
  end

  test 'should not save without a password' do
    user = User.new(user1_attrs.merge(password: ''))
    assert_not user.save
  end

  test 'should not save duplicate emails' do
    user2 = User.new(user1_attrs)

    assert user1.save
    assert_not user2.save
  end

  test 'password is private in model instance' do
    assert_raises(NoMethodError) { User.new(user1_attrs).password }
  end

  test 'should always ensure session token on initialize' do
    user1.session_token
  end
end
