class Api::FeedsController < ApplicationController
  before_action :require_login

  def index
    @feeds = current_user.feeds.include(:subscriptions)
  end

  def show
    @feed = current_user.feeds.find_by(id: params[:id])

    if @feed
      render :show
    else
      render json: ["You are not subscribed to this feed"], status: 403
    end
  end

  def destroy
    @subscription = current_user.subscriptions.find_by(feed_id: params[:id])
    if @subscription
      @subscription.destroy!
      render json: ["Subscription deleted"], status: 200
    else
      render json: ["Subscription no longer exists"], status: 404
    end
  end

  def create
    # create feed if there is none
    @feed = Feed.find_by(rss_url: feed_params[:rss_url])
    if @feed.nil?
      @feed = Feed.new(rss_url: feed_params[:rss_url])
      unless @feed.save
        render json: @feed.errors.full_messages, status: 422
        return
      end
    end

    # create a subscription regardless
    @subscription = Subscription.new(
      feed_id: @feed.id,
      title: feed_params[:title] || @feed.title
    )
    @subscription.subscriber_id = current_user.id

    if @subscription.save
      render :show
    else
      render json: @subscription.errors.full_messages, status: 422
    end
  end

  def feed_params
    params.require(:feed).permit(:rss_url, :title)
  end

end
