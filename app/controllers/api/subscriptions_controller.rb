class Api::SubscriptionsController < ApplicationController
  before_action :require_login
  before_action :ensure_feed, only: [:create]

  def index
    @subs = current_user.subscriptions.includes(:feed)
  end

  def create
    @subscription = Subscription.new(
      feed: @feed,
      subscriber: current_user,
      title: subscription_params[:title] || @feed.title
    )

    if @subscription.save
      render :show
    else
      render json: @subscription.errors.full_messages, status: 422
    end
  end

  def show
    @subscription = current_user.subscriptions.find_by(id: params[:id])
    if @subscription
      render :show
    else
      render json: ["Your subscription cannot be found"], status: 403
    end
  end

  def destroy
    @subscription = current_user.subscriptions.find_by(id: params[:id])
    if @subscription
      @subscription.destroy!
      render json: ["Subscription deleted"], status: 200
    else
      render json: ["Subscription no longer exists"], status: 404
    end
  end

  def ensure_feed
    @feed = Feed.find_by(rss_url: subscription_params[:rss_url])

    if @feed.nil?
      @feed = Feed.new(rss_url: subscription_params[:rss_url])
      unless @feed.save
        render json: @feed.errors.full_messages, status: 422
        # this will stop subscribe create from occuring
      end
    end
  end

  def subscription_params
    params.require(:subscription).permit(:rss_url, :title)
  end

end
