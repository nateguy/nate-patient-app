class CreatePatient < ActiveRecord::Migration[6.1]
  def change
    create_table :patients do |t|
      t.text :name
      t.text :description
      t.integer :number
      t.datetime :date
      t.timestamps
    end
  end
end
