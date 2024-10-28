import React from 'react'
import { Link } from 'react-router-dom'



function PageNotFound() {
  return (
    <div style={{width:'90%', margin:'0 auto', padding:'3rem 0'}}>
        <h2>404 Not Found</h2>
        <Link to='/posts'>
            <button>Back to home</button>
        </Link>
    </div>
  )
}

export default PageNotFound