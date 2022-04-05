import React from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

import PatientList from './PatientList'

class PatientApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            patients: [],
            hideCompletedPatients: false,
            isLoading: true,
            errorMessage: null,
        }
        this.getPatients = this.getPatients.bind(this)
        this.createPatient = this.createPatient.bind(this)
        this.toggleCompletedPatients = this.toggleCompletedPatients.bind(this)
        this.handleErrors = this.handleErrors.bind(this)
        this.clearErrors = this.clearErrors.bind(this)
    }
    componentDidMount() {
        this.getPatients()
    }
    getPatients() {
        axios
            .get('/api/v1/patients')
            .then(response => {
                this.clearErrors()
                this.setState({ isLoading: true })
                const patients = response.data
                this.setState({ patients })
                this.setState({ isLoading: false })
            })
            .catch(error => {
                this.setState({ isLoading: true })
                this.setState({
                    errorMessage: {
                        message:
                            'There was an error loading your todo items...',
                    },
                })
            })
    }
    createPatient(patient) {
        const patients = [patient, ...this.state.patients]
        this.setState({ patients })
    }
    toggleCompletedPatients() {
        this.setState({
            hideCompletedPatients: !this.state.hideCompletedPatients,
        })
    }
    handleErrors(errorMessage) {
        this.setState({ errorMessage })
    }
    clearErrors() {
        this.setState({
            errorMessage: null,
        })
    }
    render() {
        return (
            <>
                {this.state.errorMessage && (
                    <div><h3>{this.state.errorMessage}</h3></div>
                )}
                {!this.state.isLoading && (
                    <>
                        <PatientList
                            toggleCompletedPatients={
                                this.toggleCompletedPatients
                            }
                            hideCompletedPatients={
                                this.state.hideCompletedPatients
                            }
                        >
                            {this.state.patients.map(patient => (
                                <tr>
                                  <td>{patient.name}</td>
                                  <td>{patient.date}</td>
                                  <td>{patient.number}</td>
                                  <td>{patient.description}</td>
                                </tr>
                            ))}
                        </PatientList>
                    </>
                )}
                {this.state.isLoading && <h1>Loading</h1>}
            </>
        )
    }
}

document.addEventListener('turbolinks:load', () => {
    const app = document.getElementById('patient-app')
    app && ReactDOM.render(<PatientApp />, app)
})
