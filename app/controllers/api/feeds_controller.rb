class Api::FeedsController < ApplicationController
  before_action :require_login

  def index
    @feeds = Feeds.all
  end

  def show
    @feed = Feeds.find_by(id: params[:id])
    render :show
  end

  private

  def ensure_feed
    @feed = Feed.find_by(rss_url: feed_params[:rss_url])

    if @feed.nil?
      @feed = Feed.new(rss_url: feed_params[:rss_url])
      unless @feed.save
        render json: @feed.errors.full_messages, status: 422
        # this will stop subscribe action
      end
    end
  end

  def feed_params
    params.require(:feed).permit(:rss_url, :title)
  end

end
