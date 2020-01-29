# frozen_string_literal: true

module Api
  class HardwaresController < Api::BaseController
    respond_to :json
    def index
      @hardwares = hardwares
      respond_with @hardwares
    end

    def types
      @types = Hardware.types.keys
      respond_with @types
    end

    def update
      @hardware = Hardware.find(params[:id])
      @hardware.update(hardware_params)
      respond_with @hardware
    end

    def create
      @hardware = Hardware.create(hardware_params)
      respond_with @hardware
    end

    def destroy
      Hardware.find(params[:id]).destroy
      respond_with @hardware
    end

    private

    def hardwares
      if current_user.admin?
        Hardware.all
      else
        current_user.hardwares
      end
    end

    def hardware_params
      params.require(:hardware).permit(:type, :manufacturer, :serial_number, :model, :user_id)
    end
  end
end
