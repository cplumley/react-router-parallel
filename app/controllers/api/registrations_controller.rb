class Api::RegistrationsController < Api::BaseController
  def create
    user = User.new(registration_params)

    if user.save
      sign_in(user)
      render_user(user)
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def registration_params
    params.permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end
end
