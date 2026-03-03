class SpaAssets
  def initialize(app, root:, prefix:)
    @app = app
    @prefix = prefix
    @file_server = Rack::Files.new(root)
  end

  def call(env)
    path = env[Rack::PATH_INFO]

    if path.start_with?("#{@prefix}/assets/")
      # Strip the prefix so /app/assets/foo.js becomes /assets/foo.js
      env[Rack::PATH_INFO] = path.delete_prefix(@prefix)
      status, headers, body = @file_server.call(env)
      env[Rack::PATH_INFO] = path

      return [status, headers, body] unless status == 404
    end

    @app.call(env)
  end
end
