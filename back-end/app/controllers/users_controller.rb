class UsersController < ApplicationController

  def index
      @users = User.all
      # byebug
      render json: @users
    end

  def show
      @user = User.find(params[:id])
      render json: @user
    end

  def create
      @user = User.create(user_params)
      render json: @user
    end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    render json: @user
  end


  def destroy
      @user = User.destroy(params[:id])
      render json: @user
    end
  end


private

  def user_params
      params.require(:user).permit(:name, :money, :win, :lost)
    end
