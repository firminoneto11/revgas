import './App.css';
import React, { useState, useEffect } from 'react'


function App() {
    // declares hook to store fetch data
    const [data, setData] = useState()

    // declares hook to store filtered element
    const [filter, setFilter] = useState([])

    // declares hook to store search input value
    const [value, setValue] = useState('')

    // function to fetch api data
    const getData = async () => {
        const url = 'https://revgas.herokuapp.com/revgas/api/banks/'

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

        // filtered bank as props
        const filterBank = props.filterBank

        // maps the filtered element and stores it in a variable to render later
        const filtered = filterBank && filterBank.map((el, index) => {
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

        // maps the data and stores it in a variable to render later
        const banks = bankData && bankData.map((el, index) => {
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

        // conditional render to control rather the whole data is shown or only the filtered element
        if (filter.length === 0) {
            return <tbody>{banks}</tbody>
        } else {
            return <tbody>{filtered}</tbody>
        }
    }

    // finds current element based on current input value
    function getCurrentBank(event) {
        const currentValue = event.target.value
        setValue(currentValue)

        if (value === '') {
            setFilter([])
        } else {
            // important to use filter so it returns multiple results
            const currentElement = data.filter(el => el.institution_name.toLowerCase().includes(value.toLocaleLowerCase()))
            setFilter(currentElement)
        }
    }

    // Final Front end
    return (
        <div className="body">
            <h1 className="title">Banks Index</h1>
            <div className="search-box">
                <p className="search-text">Search a bank by name:</p>
                <input className="search-input" value={value} onChange={getCurrentBank} />
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Compensation Code</th>
                        <th>Institution name</th>
                    </tr>
                </thead>
                <TableBody filterBank={filter} bankData={data} />
            </table>
        </div>
    );
}

export default App;
