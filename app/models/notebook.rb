class Notebook < ActiveRecord::Base
  validates :title, :author_id, presence: true

  belongs_to :author,
    foreign_key: :author_id,
    class_name: "User"

  has_many :notes
end
