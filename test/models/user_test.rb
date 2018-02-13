require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'should not save without a username' do
    user = User.new(password: "password")
    assert_not user.save
  end
end
