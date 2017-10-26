class Api::FeedsController < ApplicationController
  def index
    @feeds = current_user.feeds
  end

  def show
    @feed = current_user.feeds.find(params[:id])
  end

  def destroy
    @subcription = current_user.subscriptions.find_by(:feed_id: params[:id])
    if @subscription
      @subscription.destroy!
    else
      render :json ["Subscription no longer exists"], status: 404
    end
  end

  def create
    if !logged_in?
      render :json ["Must be logged in to create a subcription"], status: 403
    end

    # create feed if there is none
    @feed = Feed.find_by(rss_url: feed_params[:rss_url])
    unless @feed
      @feed = Feed.new(rss_url: feed_params[:rss_url])
      if !@feed.save
        render :json @feed.errors.full_messages, status: 422
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
      render :json @subscription.errors.full_messages, status: 422
    end
  end

  def feed_params
    params.require(:feed).permit(:rss_url, :title)
  end

end
