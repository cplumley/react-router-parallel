class Api::PasswordsController < Api::BaseController
  def create
    User.send_reset_password_instructions(email: params[:email])
    render json: { success: true }
  end

  def update
    user = User.reset_password_by_token(
      reset_password_token: params[:reset_password_token],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
    )

    if user.errors.empty?
      sign_in(user)
      render_user(user)
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
