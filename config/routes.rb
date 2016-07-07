Rails.application.routes.draw do

  root to: "static_pages#root"

  get '/Login', to: 'sessions#new'
  get '/Signup', to: 'users#new'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :tags, only: [:index, :show]
    resources :notes, except: [:new, :edit] do
      resources :tags, only: [:destroy, :create]
    end
    resources :notebooks, except: [:new, :edit]
  end
end
