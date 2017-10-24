class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if @user
      login(@user)
      render "/api/users/show"
    else
      render json: ["Email/password combination is invalid"], status: 422
    end
  end

  def destroy
    @user = current_user
    if @user
      logout!
      render json: "{}", status: 200
    else
      render json: ["No user logged in"], status: 404
    end
  end

end
