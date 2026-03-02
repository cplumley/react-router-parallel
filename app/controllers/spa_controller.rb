class SpaController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    spa_index = Rails.root.join("public", "app", "index.html")

    if spa_index.exist?
      render file: spa_index, layout: false
    elsif Rails.env.development?
      redirect_to "http://localhost:5173/app", allow_other_host: true
    else
      head :not_found
    end
  end
end
