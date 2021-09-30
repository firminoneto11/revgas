import './App.css';
import React, { useState, useEffect } from 'react'

function App() {

  // declares hook to store fetch data
  const [data, setData] = useState()

  // declares hook to store filtered element
  const [filter, setFilter] = useState([])
  console.log(filter)
  // declares hook to store search input value
  const [value, setValue] = useState('')
  console.log(value)

  // function to fetch api data
  const getData = async () => {
    const url = 'http://127.0.0.1:8000/revgas/api/banks'

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data)
      })
  }

  // call function after render
  useEffect(() => {
    getData()
  }, [])

  // main component
  const Table = (props) => {
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
    //console.log(typeof currentValue)
    setValue(currentValue)

    if (value === '') {
      setFilter([])
    } else {
      // important to use filter so it returns multiple results
      const currentElement = data.filter(el => el.institution_name.toLowerCase().includes(value.toLocaleLowerCase()))
      setFilter(currentElement)
    }


  }

  // final front end
  return (
    <div className={"table"}>
      <h1 className="table-title">Consulta de bancos</h1>
      <div className="table-search">
        <p className="table-search-text">Filtrar por nome:</p>
        <input value={value} onChange={getCurrentBank} className="table-search-input" />
      </div>
      <table className="tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Comp_code</th>
            <th>Nome da Instituição</th>
          </tr>
        </thead>
        <Table filterBank={filter} bankData={data} />
      </table>

    </div>
  );
}

export default App;
