class Api::SubscriptionsController < ApplicationController
  before_action :require_login
  # before_action :ensure_feed, only: [:create]

  def index
    # lazy loaded in case refresh already ran
    @subscriptions ||= current_user.subscriptions.includes(:feed) # TODO include suggestions
  end

  def show
    # lazy loaded in case refresh already ran
    @subscription ||= current_user.subscription_by_feed(params[:id])

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
    @subscription = Subscription.create_by_rss_url(
      rss_url: subscription_params[:rss_url],
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

  def refresh
    @subscription = current_user.subscriptions.find_by(feed_id: params[:id])
    @subscription = @subscription.feed.populate_entries if @subscription
  end

  def refresh_all
    @subs = current_user.subscriptions.includes(:feed, :stories)
    @subs.each(&:populate_entries)
  end

  def subscription_params
    params.require(:subscription).permit(:id, :rss_url, :title)
  end

end
