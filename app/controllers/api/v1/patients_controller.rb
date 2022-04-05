require "memoist"

class Api::V1::PatientsController < ApplicationController
  extend ::Memoist

  def index
    @patients = sorted_patients
  end

  private

  memoize def all_patients
    Patient.all
  end

  memoize def filtered_patients
    result = all_patients

    if search_value
      result = result.where.like(name: "%#{search_value}%")
    end

    result
  end

  memoize def sorted_patients
    case sort_value
    when 'name_desc'
      filtered_patients.order(name: :desc)
    when 'name_asc'
      filtered_patients.order(name: :asc)
    when 'number_desc'
      filtered_patients.order(number: :desc)
    when 'number_asc'
      filtered_patients.order(number: :asc)
    when 'date_desc'
      filtered_patients.order(date: :desc)
    when 'date_asc'
      filtered_patients.order(date: :asc)
    else
      filtered_patients
    end
  end

  def search_value
    params[:search_value]
  end

  def sort_value
    params[:sort_value]
  end
end
