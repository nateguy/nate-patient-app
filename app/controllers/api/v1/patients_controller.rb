class Api::V1::PatientsController < ApplicationController
  def index
    @patients = Patient.all
  end
end
