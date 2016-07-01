class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    session[:session_token] = user.reset_token!
  end

  def logout!
    current_user.reset_token!
    session[:session_token] = nil
  end

  def require_logout
    redirect_to "/#/home" if current_user
  end


  def require_login
    unless current_user
      flash[:error] = "You must be logged in to access this section"
      render json: { errors: ["This resource requires login"]}, status: 302
    end
  end
end
