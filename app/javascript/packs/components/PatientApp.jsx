import React, { useState, useEffect, useCallback } from "react"
import ReactDOM from 'react-dom'
import {useDebouncedCallback} from 'use-debounce';

import axios from 'axios'

import PatientList from './PatientList'

const PatientApp = () => {

  const [patients, setPatients] = useState([])
  const [hideCompletedPatients, setHideCompletedPatients] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sortValue, setSortValue] = useState(null)
  const [searchValue, setSearchValue] = useState(null)

  useEffect(()=>{
    axios
      .get('/api/v1/patients',
        {
          params: {
            sort_value: sortValue,
            search_value: searchValue,
          }
        })
      .then(response => {
          setIsLoading(true)
          const patients = response.data
          setPatients(patients)
          setIsLoading(false)
      })
      .catch(error => {
          setIsLoading(true)
          log.debug('There was an error loading your items...')
      })
  }, [sortValue, searchValue])

  const handleSortValue = useCallback((sortValue) => {
    setSortValue(sortValue)
  }, []);

  const onSearchBoxChange = useDebouncedCallback((value) => {
    if (value){
      setSearchValue(value)
    }else{
      setSearchValue(null)
    }
  }, 200);


  return (
    <>
      <hr />
      <h1>Patient Information</h1>

      <input class="patient-app-input" type="text" placeholder="Search" name="search" onChange={(e)=> {
        if (event?.target?.value){
          onSearchBoxChange(event?.target?.value)
        }else{
          onSearchBoxChange(null)
        }
      }} />
      {!isLoading && (
        <>
          <PatientList handleSortValue={handleSortValue} sortValue={sortValue} patients={patients} />
        </>
      )}
      {isLoading && <h1>Loading</h1>}
    </>
  )
}

document.addEventListener('turbolinks:load', () => {
    const app = document.getElementById('patient-app')
    app && ReactDOM.render(<PatientApp />, app)
})
