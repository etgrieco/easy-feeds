class Api::SubscriptionsController < ApplicationController
  before_action :require_login
  before_action :ensure_feed, only: [:create]
  before_action :refresh, only: [:show]

  def index
    @subs = current_user.subscriptions.includes(:feed, :stories)
  end

  def show
    # lazy loaded because refresh likely ran
    @subscription ||= current_user.subscriptions.find_by(feed_id: params[:id])
      .includes(:feeds, :stories)

    if @subscription
      render :show
    else
      render json: ["Your subscription cannot be found"], status: 403
    end
  end

  def update
    @subscription = current_user.subscriptions.find_by(id: params[:id])

    if subscription_params[:title].empty?
      render json: ["Subscription titles must have at least one character"], status: 422
    elsif @subscription.update(subscription_params)
      render :show
    else
      render json: @subscription.errors.full_messages, status: 422
    end
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
      @feed = Feed.new(rss_url: subscription_params[:rss_url], title: "New Feed")
      unless @feed.save
        render json: @feed.errors.full_messages, status: 422
        # this will stop subscribe create from occuring
      end
    end
  end

  def refresh
    @subscription = current_user.subscriptions.find_by(feed_id: params[:id])
    @subscription.feed.populate_entries
  end

  def refresh_all
    current_user.feeds.each do |feed|
      feed.populate_entries
    end
  end

  def subscription_params
    params.require(:subscription).permit(:id, :rss_url, :title)
  end

end
