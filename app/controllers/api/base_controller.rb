class Api::BaseController < ApplicationController
  before_action :set_csrf_cookie

  rescue_from ActionController::InvalidAuthenticityToken, with: :handle_csrf_failure

  private

  def set_csrf_cookie
    cookies["csrf_token"] = {
      value: form_authenticity_token,
      same_site: :lax,
    }
  end

  def handle_csrf_failure
    render json: { error: "Invalid CSRF token" }, status: :unprocessable_entity
  end

  def render_user(user)
    render json: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      name: user.name.to_s,
    }
  end
end
