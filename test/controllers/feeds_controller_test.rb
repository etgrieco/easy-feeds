require 'test_helper'

class FeedsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get feeds_index_url
    assert_response :success
  end

  test "should get show" do
    get feeds_show_url
    assert_response :success
  end

  test "should get createdelete" do
    get feeds_createdelete_url
    assert_response :success
  end

end
