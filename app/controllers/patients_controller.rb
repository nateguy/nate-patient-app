class PatientsController < ApplicationController

  def index
    @patients = Patient.all
    # @patients = Patient.where(name: patient_params[:search])
    #                    .order(sort_column + " " + sort_direction)
    #                    .paginate(:per_page => 3, :page => product_params[:page])
  end

  def import
    # Validate inputs with block
    begin
      file = patient_params[:file]
      file_path = file.path
      Patient.import(file_path)
      redirect_to root_url, notice: "Patients imported."
    rescue
      redirect_to root_url, notice: "Invalid CSV file format."
    end
  end

  private

  def patient_params
    params.permit(:name, :date, :number, :description, :file, :authenticity_token, :commit)
  end

end
