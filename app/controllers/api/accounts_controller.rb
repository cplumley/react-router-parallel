class Api::AccountsController < Api::BaseController
  before_action :authenticate_user!

  def show
    render_user(current_user)
  end

  def update
    if current_user.update_with_password(account_params)
      bypass_sign_in(current_user)
      render_user(current_user)
    else
      render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def account_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)
  end
end
