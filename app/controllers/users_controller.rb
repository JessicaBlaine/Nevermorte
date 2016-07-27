class UsersController < ApplicationController
  before_action :require_logout

  def new
    @user = User.new()
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      Notebook.create!(author_id: @user.id, title: "First Notebook")
      login!(@user)
      redirect_to "/#/home"
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
