Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :subscriptions, only: [:create, :index, :show, :destroy, :update]
    resources :feeds, only: [:index, :show]
    resources :stories, only: [:index, :show]
    resources :collections, only: [:create, :update, :destroy]
    resources :reads, only: [:create, :destroy, :index]
  end

end
