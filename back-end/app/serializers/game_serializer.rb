class GameSerializer < ActiveModel::Serializer
  attributes :id, :player, :user_id
end
