# == Schema Information
#
# Table name: notebooks
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Notebook < ActiveRecord::Base
  validates :title, :author_id, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: "User"

  has_many :notes, dependent: :destroy
end
