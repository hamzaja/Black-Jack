class GamesController < ApplicationController

  def index
    @game = Game.all
    render json:@game
  end







end
