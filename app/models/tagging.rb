# == Schema Information
#
# Table name: taggings
#
#  id         :integer          not null, primary key
#  note_id    :integer          not null
#  tag_id     :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tagging < ActiveRecord::Base
  validates :tag_id, :note_id, presence: true
  validates :tag_id, uniqueness: { scope: :note_id }

  belongs_to :tag, inverse_of: :taggings

  belongs_to :note
end
