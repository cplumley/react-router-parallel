class ReactSinglePageAppController < ApplicationController
  layout "react_app"

  def show
  end

  def not_found
    render :show, formats: :html, status: :not_found
  end
end
