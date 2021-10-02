import './App.css';
import React, { useState, useEffect } from 'react'


const App = _ => {
    // Declaring a hook to store the fetched data
    const [data, set_data] = useState()

    // Declaring a hook for the tiny loading animation while fetching api data
    const [loading, set_loading] = useState(false)

    // Function to fetch api data
    const get_banks_data = async _ => {
        const url = 'https://revgas.herokuapp.com/revgas/api/banks/'
        // const url = 'http://127.0.0.1:8000/revgas/api/banks/'

        try {
            // Showing the spinner while fetching
            set_loading(true)

            // Fetching the API and changing the state of the component
            let response = await fetch(url)
            response = await response.json()
            set_data(response)

            // Removing the spinner while fetching
            set_loading(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    // Function to fetch the api data with a parameter
    const get_bank_data = async comp_code => {
        const url = `https://revgas.herokuapp.com/revgas/api/banks/${comp_code}`
        // const url = `http://127.0.0.1:8000/revgas/api/banks/${comp_code}`

        try {
            // Showing the spinner while fetching
            set_loading(true)

            // Fetching the API and changing the state of the component
            let response = await fetch(url)
            response = await response.json()
            set_data(response)

            // Removing the spinner while fetching
            set_loading(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    // Calling a function after the rendering phase
    useEffect(() => {
        get_banks_data()
    }, [])

    // Main component
    const TableBody = props => {

        // All bank data as props
        const banks_data = props.banks_data

        // Mapping the data fetched and storing it in a variable to render later
        let banks
        if (banks_data && banks_data instanceof Array) {
            banks = banks_data && banks_data.map((el, index) => {
                const id = el.id
                const comp_code = el.compensation_code
                const inst_name = el.institution_name

                return (
                    <tr key={index}>
                        <td>{id}</td>
                        <td>{comp_code}</td>
                        <td>{inst_name}</td>
                    </tr>
                )
            })
        }
        // Checking if the response has an error attribute
        else if (banks_data && banks_data.invalid_bank) {
            banks = (
                <tr>
                    <td colSpan="3">{banks_data.invalid_bank}</td>
                </tr>
            )
        }
        // Saving a single bank data into an object
        else {
            if (banks_data) {
                const id = banks_data.id
                const comp_code = banks_data.compensation_code
                const inst_name = banks_data.institution_name

                banks = (
                    <tr key="1">
                        <td>{id}</td>
                        <td>{comp_code}</td>
                        <td>{inst_name}</td>
                    </tr>
                )
            }
        }

        return <tbody>{banks}</tbody>
    }

    // Spinner Component
    const LoadingSpinner = _ => {
        return <div className="loading loading--full-height"></div>
    }

    // Function that will be executed when the user clicks on the "search" button
    const search_bank = event => {
        const comp_code = event.target.previousSibling.value
        comp_code.length > 0 ? get_bank_data(comp_code) : get_banks_data()
    }

    // Binding the "return" key to trigger the "search_bank" function
    const search_button = event => {
        if (event.keyCode === 13) {
            event.preventDefault()
            event.target.nextSibling.click()
        }
    }

    // Cleaning the input field and fetching the api when the "Get all banks" is pressed
    const fetch_all_banks = event => {
        event.preventDefault()
        let previous_sibling = event.target.previousSibling
        previous_sibling.previousSibling.value = ''
        get_banks_data()
    }

    // Final Front end
    return (
        <div>

            <h1 className="title">Banks Index</h1>

            <div className="search-box">
                <p className="search-text">Search a bank by it's Compensation Code:</p>
                <input type="number" className="search-input" onKeyUp={search_button} />
                <button className="look-for-bank" onClick={search_bank}>Search</button>
                <button className="all-banks" onClick={fetch_all_banks}>Get all banks</button>
            </div>

            {loading ? (<LoadingSpinner />) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Compensation Code</th>
                                <th>Institution name</th>
                            </tr>
                        </thead>
                        <TableBody banks_data={data} />
                    </table>
                </div>
            )}
        </div>
    );
}

export default App;
