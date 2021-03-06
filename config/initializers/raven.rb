# frozen_string_literal: true

if Rails.application.secrets.raven_url.present?
  Raven.configure do |config|
    config.dsn = Rails.application.secrets.raven_url
    config.environments = %w[production staging]
    config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
  end
end
