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
    @note = Note.new(note_params)
    @note.author_id = current_user.id
    if @note.notebook_id == ""
      @note.notebook_id = Notebook.find_by(author_id: current_user.id).id
    end
    if @note.save
      render :show
    else
      render json: { errors: @note.errors.full_messages }, status: 422
    end
  end

  def update
    @note = Note.find(params[:id])

    if @note &&
      @note.author_id == current_user.id &&
      @note.update(note_params)
        render :show
    else
      render json: { errors: ["Invalid update request"] }, status: 422
    end
  end

  def destroy
    @note = Note.find(params[:id])
    if @note.author_id == current_user.id && @note.destroy
      render :show, status: 200
    else
      render json: { errors: ["Unauthorized deletion attempt"] }, status: 403
    end
  end

  private
  def note_params
    params.require(:note).permit(:title, :body, :notebook_id)
  end
end
