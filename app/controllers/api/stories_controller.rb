class Api::StoriesController < ApplicationController
  before_action :require_login

  def index
    @stories = current_user.stories
      .order('pub_datetime DESC')
      .limit(20)
      .includes(:feed, :subscriptions)
      .offset(params[:offset])
  end

  def show
    @story = Story.includes(:feed, :subscriptions).find_by(id: params[:id])

    if @story
      render :show
    else
      render json: ["Cannot find story"], status: 404
    end
  end

end
