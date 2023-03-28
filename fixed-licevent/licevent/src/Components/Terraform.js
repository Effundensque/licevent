import React, { useState } from 'react'

function Terraform() {
    
  const [terraformCode, setTerraformCode] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/terraform', {
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
