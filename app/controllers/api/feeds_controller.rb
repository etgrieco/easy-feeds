class Api::FeedsController < ApplicationController
  def index
    @feeds = current_user.feeds
  end

  def show
  end

  def destroy
  end

  def create
  end

end
