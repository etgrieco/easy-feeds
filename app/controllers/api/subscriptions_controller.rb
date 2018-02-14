class Api::SubscriptionsController < ApplicationController
  before_action :require_login
  before_action :ensure_feed, only: [:create]

  def index
    # lazy loaded in case refresh already ran
    @subscriptions ||= current_user.subscriptions.includes(:feed, :collections)
  end

  def show
    # lazy loaded in case refresh already ran
    @subscription ||= current_user.subscriptions.includes(:feed, :stories).find_by(feed_id: params[:id])

    if @subscription
      render :show
    else
      render json: ["You do not have access to this subscription."], status: 403
    end
  end

  def update
    # note: takes a subscription id vs. a feed id
    @subscription = current_user.subscriptions.find_by(id: params[:id])
    # TODO: check for empty string? Ok in model?
    if @subscription.update(subscription_params)
      render 'api/subscriptions/show_no_stories'
    else
      render json: @subscription.errors.full_messages, status: 422
    end
  end

  def create
    @subscription = Subscription.new(
      feed: @feed,
      subscriber: current_user,
      title: subscription_params[:title]
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
      render :show
    else
      render json: ["Subscription no longer exists"], status: 404
    end
  end

  def ensure_feed
    @feed = Feed.find_by(rss_url: subscription_params[:rss_url])

    if @feed.nil?
      @feed = Feed.new(rss_url: subscription_params[:rss_url], title: "New Feed")
      unless @feed.save
        # this will stop subscribe create action from occurring
        render json: @feed.errors.full_messages, status: 422
      end
    end
  end

  def refresh
    @subscription = current_user.subscriptions.find_by(feed_id: params[:id])
    @subscription.nil? ? nil : @subscription.feed.populate_entries
  end

  def refresh_all
    @subs = current_user.subscriptions.includes(:feed, :stories)
    @subs.each do |feed|
      feed.populate_entries
    end
  end

  def subscription_params
    params.require(:subscription).permit(:id, :rss_url, :title)
  end

end
