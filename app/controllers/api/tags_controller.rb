class Api::TagsController < ApplicationController
  def index
    @tags = current_user.tags.where(
                                    "name LIKE ?",
                                    "%" + params[:name] + "%"
                                  ).limit(1)
    render :index
  end

  def create
    @tag = Tag.find_by(name: params[:tag][:name])
    @tag = Tag.create(name: params[:tag][:name]) unless @tag
    @tagging = Tagging.new(tag_id: @tag.id, note_id: params[:note_id])
    if @tagging.save
      @note = Note.find(params[:note_id])
      render "api/notes/show"
    else
      render json: {
        errors: @tag.errors.full_messages + @tagging.errors.full_messages },
        status: 422
    end
  end

  def destroy
    @note = Note.find(params[:note_id])
    @tag = @note.tags.find_by(name: params[:id])
    if @note.author_id == current_user.id
      if @tag.destroy
        render "api/notes/show"
      end
      
    end
    render json: { errors: ["Unauthorized deletion attempt"] }, status: 403
  end
end
