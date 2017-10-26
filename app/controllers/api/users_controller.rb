class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  # consider implementing later
  # def update
  #   @user = current_user
  #   @user.first_name = edit_user_params.first_name
  #   @user.last_name = edit_user_params.last_name
  #
  #   if @user.update
  #     render :show
  #   else
  #     render json: @user.errors.full_messages, status: 422
  #   end
  # end

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :password)
  end

  # def edit_user_params
  #   params.requre(:edit_user).permit(:first_name, :last_name)
  # end

end
