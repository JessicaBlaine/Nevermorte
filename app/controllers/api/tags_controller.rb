class Api::TagsController < ApplicationController
  def index
    @tags = current_user.tags.includes(:notes).where(
                                    "name LIKE ?",
                                    "%" + params[:name] + "%"
                                  ).uniq
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
        errors: @tag.errors.full_messages + @tagging.errors.full_messages
      }, status: 422
    end
  end

  def destroy
    @note = Note.find(params[:note_id])
    if @note.author_id == current_user.id
      if @note.tags.delete(Tag.find_by(name: params[:id]))
        render "api/notes/show"
      else
        render json: { errors: @note.errors.full_messages }, status: 422
      end
    else
      render json: { errors: ["Unauthorized deletion attempt"] }, status: 403
    end
  end
end
