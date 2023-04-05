import React, { useState } from 'react'

function Terraform() {
  const SERVER = 'http://localhost:8080'


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const fileResponse = await fetch(`${SERVER}/terraform`,{method:'GET'});
      const fileData = await fileResponse.text();

      // Make a POST request to your /terraform endpoint to send the file contents
      const response2 = await fetch(`${SERVER}/terraform`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ terraformCode: fileData })
      });
  
      const data = await response2.json()
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }
  

  return (
    <div>
      <h1>Execute Terraform Command</h1>
        <button type="submit" onClick={handleSubmit}>Execute</button>
    </div>
  )
}

export default Terraform
