import React, { useState } from 'react'
// import execa from 'execa'

function Terraform() {
  const SERVER = 'http://localhost:8080'
  const [terraformCode, setTerraformCode] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`${SERVER}/terraform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ terraformCode })
      })

      const data = await response.json()
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  // const {stdout} = await execa('echo', ['unicorns']);
  // console.log(stdout);
  }

  return (
    <div>
      <h1>Execute Terraform Command</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Terraform Code:
          <textarea value={terraformCode} onChange={event => setTerraformCode(event.target.value)} />
        </label>
        <button type="submit">Execute</button>
      </form>
    </div>
  )
}

export default Terraform
