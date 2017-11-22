class Api::ReadsController < ApplicationController
  before_action :require_login

  def index
    # returns UNREAD stories
  end

  def create
    @read = Read.new(
      story_id: read_params[:story_id],
      reader_id: current_user.id
    )

    if @read.save
      render :show
    else
      render json: @read.errors.full_messages
    end
  end

  def read_params
    params.require(:read).permit(:story_id)
  end

end
