class Api::StoriesController < ApplicationController
  before_action :require_login

  def index
    reads_join = "LEFT OUTER JOIN reads
    ON reads.story_id = stories.id
    AND reads.reader_id = #{current_user.id}"

    @stories = current_user.stories
      .select("stories.*, reads.reader_id as read")
      .joins(reads_join)
      .order('pub_datetime DESC')
      .limit(20)
      .includes(:feed, :subscriptions)
      .offset(params[:offset])
  end

  def show
    reads_join = "LEFT OUTER JOIN reads
    ON reads.story_id = stories.id
    AND reads.reader_id = #{current_user.id}"

    @story = Story
      .select("stories.*, reads.reader_id as read")
      .joins(reads_join)
      .includes(:feed, :subscriptions)
      .find_by(id: params[:id])

    if @story
      render :show
    else
      render json: ["Cannot find story"], status: 404
    end
  end

end
