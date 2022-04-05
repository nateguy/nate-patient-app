import React from 'react'
import PropTypes from 'prop-types'

class PatientList extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.props.toggleCompletedPatientList()
    }
    render() {
        return (
            <>
                <hr />
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Number</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>{this.props.children}</tbody>
                    </table>
                </div>
            </>
        )
    }
}
export default PatientList

PatientList.propTypes = {
    toggleCompletedPatientList: PropTypes.func.isRequired,
    hideCompletedPatientList: PropTypes.bool.isRequired,
}
