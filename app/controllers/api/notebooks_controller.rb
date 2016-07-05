class Api::NotebooksController < ApplicationController
  def show
    @notebook = Notebook.find(params[:id])
    @creator = @notebook.author.username
    render :show
  end

  def index
    @notebooks = current_user.notebooks
    render :index
  end

  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.author_id = current_user.id
    if @notebook.save
      render :show
    else
      render json: {errors: @notebook.errors.full_messages}, status: 422
    end
  end

  def update
    @notebook = Notebook.find(params[:id])
    if @notebook &&
      @notebook.author_id == current_user.id &&
      @notebook.update(notebook_params)
        render :show
    else
      render json: { errors: ["Invalid update request"] }, status: 422
    end
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    if @notebook.author_id == current_user.id && @notebook.destroy
      render :show, status: 200
    else
      render json: { errors: ["Unauthorized deletion attempt"] }, status: 403
    end
  end

  private
  def notebook_params
    params.require(:notebook).permit(:title)
  end
end
