class Api::StoriesController < ApplicationController
  before_action :require_login

  def index
    @stories = current_user.stories
      .order('pub_datetime DESC')
      .limit(20)
      .includes(:feed, :subscriptions)
      # .where("subcriber_id = #{current_user.id}")
  end

end
