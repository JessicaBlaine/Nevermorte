# == Schema Information
#
# Table name: notes
#
#  id          :integer          not null, primary key
#  title       :string           not null
#  body        :text             not null
#  author_id   :integer          not null
#  notebook_id :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Note < ActiveRecord::Base
  validates(
    :title,
    :body,
    :author_id,
    :notebook_id,
    presence: true
  )

  belongs_to :user,
    foreign_key: :author_id

  belongs_to :notebook

  has_many :taggings

  has_many :tags, through: :taggings
end
