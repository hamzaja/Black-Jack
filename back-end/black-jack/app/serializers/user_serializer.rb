class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :money, :win, :lost
  has_many :games
end
