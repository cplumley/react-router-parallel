class Api::SessionsController < Api::BaseController
  def show
    if user_signed_in?
      render_user(current_user)
    else
      render json: { user: nil }
    end
  end

  def create
    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      sign_in(user)
      render_user(user)
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def destroy
    sign_out(current_user)
    render json: { success: true }
  end
end
