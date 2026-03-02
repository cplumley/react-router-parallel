class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_csrf_cookie

  private

  def set_csrf_cookie
    cookies["csrf_token"] = form_authenticity_token
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
