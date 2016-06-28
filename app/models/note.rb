# == Schema Information
#
# Table name: notes
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  body        :text             not null
#  author_id   :integer          not null
#  notebook_id :string           not null
#  archived    :boolean          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Note < ActiveRecord::Base
  validates (
    :title,
    :body,
    :author_id,
    :notebook_id,
    :archived,
    presence: true
  )

  belongs_to :user,
    foreign_key: :author_id

  belongs_to :notebook

end
