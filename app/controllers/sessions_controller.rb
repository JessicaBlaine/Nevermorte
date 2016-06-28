class SessionsController < ApplicationController
  before_action :require_logout, only: [:new, :create]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(
              params[:user][:username],
              params[:user][:password]
            )
    if @user
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ['invalid user credentials']
      render :new
    end
  end

  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: {base: ['no current user found'], status: 404}
    end
  end
end
