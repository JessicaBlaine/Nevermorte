class Api::NotesController < ApplicationController
  before_action :require_login

  def show
    @note = Note.find(params[:id])
    render :show
  end

  def index
    @notes = current_user.notes
    render :index
  end

  def create
  end

  def update
  end

  def destroy
  end

  private
  def require_login
    unless current_user
      flash[:error] = "You must be logged in to access this section"
      redirect_to new_session_url
    end
  end
end
