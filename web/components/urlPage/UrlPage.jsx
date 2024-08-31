import React from 'react'

function UrlPage({address}) {
  return (
    <div>{`http://localhost:3000/api/action/approve?squad=${address}`}</div>
  )
}

export default UrlPage