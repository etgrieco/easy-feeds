require 'json'

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?, :login, :asset_manifest

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout!
    @current_user.reset_session_token!
    session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def require_login
    unless logged_in?
      redirect_to "/"
    end
  end

  def asset_manifest
    manifest_file = File.read("./app/assets/static/dist/.vite/manifest.json")
    manifest_dict = JSON.parse(manifest_file)["index.html"]
    entry_js = manifest_dict["file"]
    css_files = manifest_dict["css"]
    { :entry_js => entry_js, :css_files => css_files }
  end

end
