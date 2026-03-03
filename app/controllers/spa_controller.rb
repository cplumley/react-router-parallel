class SpaController < ApplicationController
  def index
    spa_index = Rails.root.join("build", "client", "index.html")

    if spa_index.exist?
      html = spa_index.read
      html = inject_csrf_meta(html)
      render html: html.html_safe, layout: false
    else
      head :not_found
    end
  end

  private

  def inject_csrf_meta(html)
    csrf_tag = %(<meta name="csrf-token" content="#{form_authenticity_token}">)
    html.sub("</head>", "#{csrf_tag}\n</head>")
  end
end
