Rails.application.routes.draw do
  root to: "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, default: {format: :json} do
    resources :notes, except: [:new, :edit]
  end
end
