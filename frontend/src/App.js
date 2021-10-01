import './App.css';
import React, { useState, useEffect } from 'react'


function App() {
    // declares hook to store fetch data
    const [data, setData] = useState()

    // function to fetch api data
    const getData = async _ => {
        const url = 'https://revgas.herokuapp.com/revgas/api/banks/'

        let response = await fetch(url)
        response = await response.json()
        setData(response)
    }

    const getSingleBankData = async comp_code => {
        const url = `https://revgas.herokuapp.com/revgas/api/banks/${comp_code}`

        let response = await fetch(url)
        response = await response.json()
        setData(response)
    }

    // call function after render
    useEffect(() => {
        getData()
    }, [])

    // main component
    const TableBody = props => {

        // all bank data as props
        const bankData = props.bankData

        // maps the data and stores it in a variable to render later
        let banks
        if (bankData instanceof Array) {
            banks = bankData && bankData.map((el, index) => {
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
        // else if (bankData && 'invalid_bank' in Object.entries(bankData)) {

        // }
        else {
            if (bankData) {
                const id = bankData.id
                const comp_code = bankData.compensation_code
                const inst_name = bankData.institution_name

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

    function getBank(event) {
        const comp_code = event.target.previousSibling.value
        if (comp_code.length > 0) {
            getSingleBankData(comp_code)
        }
        else {
            getData()
        }
    }

    function search(event) {
        if (event.keyCode === 13) {
            event.preventDefault()
            event.target.nextSibling.click()
        }
    }

    // Final Front end
    return (
        <div>

            <h1 className="title">Banks Index</h1>

            <div className="search-box">
                <p className="search-text">Search a bank by the Compensation Code:</p>
                <input type="number" className="search-input" onKeyUp={search} />
                <button className="look-for-bank" onClick={getBank}>Search</button>
            </div>

            <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Compensation Code</th>
                        <th>Institution name</th>
                    </tr>
                </thead>
                <TableBody bankData={data} />
            </table>
            </div>

        </div>
    );
}

export default App;
