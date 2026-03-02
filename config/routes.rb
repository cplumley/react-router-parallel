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
    resource :account, only: [:show, :update, :destroy]
  end

  # Framework-mode SPA
  get "app",       to: "spa#index"
  get "app/*path", to: "spa#index"

  # Data-mode SPA (catch-all — must be last)
  root to: "react_single_page_app#show"
  get "*path", to: "react_single_page_app#show"
end
