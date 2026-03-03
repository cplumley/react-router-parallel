module ReactAppHelper
  def server_rendered_props
    {
      current_user: current_user ? {
        id: current_user.id,
        email: current_user.email,
        first_name: current_user.first_name,
        last_name: current_user.last_name,
        name: current_user.name.to_s
      } : nil,
      flash: {
        notice: flash[:notice],
        alert: flash[:alert]
      }
    }
  end
end
