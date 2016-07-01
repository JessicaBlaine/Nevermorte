Rails.application.routes.draw do

  root to: "static_pages#root"

  get '/Login', to: 'sessions#new'
  get '/Signup', to: 'users#new'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :notes, except: [:new, :edit]
    resources :notebooks, except: [:new, :edit]
  end
end
