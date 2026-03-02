require 'sidekiq/web'

Rails.application.routes.draw do
  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  devise_for :users

  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    resource :session, only: [:show, :create, :destroy]
    resource :registration, only: [:create]
    resource :password, only: [:create, :update]
    resource :account, only: [:show, :update]
  end

  get "app",       to: "spa#index"
  get "app/*path", to: "spa#index"

  root to: "home#index"
end
