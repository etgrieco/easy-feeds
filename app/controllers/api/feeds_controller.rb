class Api::FeedsController < ApplicationController
  before_action :require_login

  def index
    sql = "left outer join subscriptions
    on subscriptions.feed_id = feeds.id
    and subscriptions.subscriber_id = #{current_user.id}"
    if params[:q].try(:empty?)
      # fix so that popular works again
      @feeds = Feed
        .select("feeds.*, subscriptions.subscriber_id as followed")
        .joins(sql)
        # .joins(<<-SQL, current_user.id)
        #   left outer join subscriptions
        #   on subscriptions.feed_id = feeds.id
        #   and subscriptions.subscriber_id = ?
        #   SQL
      # debugger
    else
      @q = Feed.ransack(title_cont: params[:q])
      # @feeds = @q.result(distinct: true).joins(:subscribers).limit(20)
      @feeds = @q.result
        .select("feeds.*, subscriptions.subscriber_id as followed")
        .joins(sql)
        .limit(20)
        # .joins(<<-SQL, current_user.id)
        #   left outer join subscriptions
        #   on subscriptions.feed_id = feeds.id
        #   and subscriptions.subscriber_id = ?
        #   SQL
    end
  end

  def show
    @feed = Feed.find_by(id: params[:id])
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
