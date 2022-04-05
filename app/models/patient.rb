class Patient < ApplicationRecord
  require 'csv'

  def self.import(file_path)
    CSV.foreach(file_path, headers: true) do |row|
      patient_record = Patient.new
      patient_record.name = row['name']
      patient_record.date = row['date']
      patient_record.number = row['number']
      patient_record.description = row['description']
      patient_record.save
    end
  end
end
