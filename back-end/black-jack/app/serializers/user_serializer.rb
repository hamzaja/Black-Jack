class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :money, :win, :lost, :topPlayers, :mostMoney
  has_many :games


  def topPlayers
    User.all.sort_by{
    |user| user[:win]
  }.reverse[0..4]
  end

  def mostMoney
    User.all.sort_by{
      |user| user[:money]
    }
  end


end
