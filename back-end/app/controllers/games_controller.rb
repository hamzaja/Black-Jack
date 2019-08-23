class GamesController < ApplicationController

  def index
    @game = Game.all
    render json:@game
  end

  def create
      @game = Game.create(game_params)
      render json: @game
    end

end

private

  def game_params
      params.require(:game).permit(:user_id)
  end
