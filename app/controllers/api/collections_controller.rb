class Api::CollectionsController < ApplicationController
  before_action :require_login

  def create
    collection = Collection.new(name: collection_params[:name], creator_id: current_user.id)

    if collection.save
      @subscriptions = current_user.subscriptions.includes(:collections, :feed)
      render 'api/subscriptions/index'
    else
      render json: collection.errors.full_messages, status: 422
    end
  end

  private

  def collection_params
    params.require(:collection).permit(:name, :feeds)
  end

end
