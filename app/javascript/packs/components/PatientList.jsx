import React, { useState, useEffect } from "react"
import Moment from 'moment';

const PatientList = (props) => {

  const handleSortValue = (value)=> {
    props.handleSortValue(value)
  }

  return (
    <>
      <div>
        <table class="patient-app-table">
          <thead>
            <tr>
              <th width="15%" class="patient-app-col patient-app-heading">
                Name
                {props.sortValue === 'name_asc' ?
                  <a onClick={()=> handleSortValue('name_desc')}>^</a> :
                  <a onClick={()=> handleSortValue('name_asc')}>˅</a>
                }
              </th>
              <th width="15%" class="patient-app-col patient-app-heading">
                Date
                {props.sortValue === 'date_asc' ?
                  <a onClick={()=> handleSortValue('date_desc')}>^</a> :
                  <a onClick={()=> handleSortValue('date_asc')}>˅</a>
                }
              </th>
              <th width="15%" class="patient-app-col patient-app-heading">
                Number
                {props.sortValue === 'number_asc' ?
                  <a onClick={()=> handleSortValue('number_desc')}>^</a> :
                  <a onClick={()=> handleSortValue('number_asc')}>˅</a>
                }
              </th>
              <th width="55%" class="patient-app-col patient-app-heading">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.patients.map((patient) => (
              <tr>
                <td width="15%" class="patient-app-col">{patient.name}</td>
                <td width="15%" class="patient-app-col">{Moment(patient.date).format('DD MMM YYYY')}</td>
                <td width="15%" class="patient-app-col">{patient.number}</td>
                <td width="55%" class="patient-app-col">{patient.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PatientList
