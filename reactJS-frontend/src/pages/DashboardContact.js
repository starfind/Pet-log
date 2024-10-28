import React, { useState, useEffect } from 'react'
import { url } from '../utils/urls'
import { handleMessage } from '../utils/api'


function DashboardContact() {
  const [message, setMessage] = useState({email:'', content:''})
  const [isError, setIsError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  const handleSubmit = async(e)=> {
    e.preventDefault()
    if(message.email && message.content) {
      const data = await handleMessage(`${url}/api/message/`, message)
      if(data.error) {
        setIsError(data.error)

      }else {
        setSuccessMessage(data.message)
        setMessage({email:'', content:''})
      }
    }
  }

  const handleChange = (e)=> {
    const {name, value} = e.target
    setMessage((prev)=> ({...prev, [name]:value}))
  }

  useEffect(()=> {
    const timeoutID = setTimeout(()=> {
      setSuccessMessage(null)
      setIsError(null)
      clearTimeout(timeoutID)
    }, 7000)
  },[isError, successMessage])

  return (
    <div className="contact-us-container">
      <form className='contact-form' onSubmit={handleSubmit}>
        {successMessage && <p className='success-message'>{successMessage}</p> || isError && <p className='error-message'>{isError}</p>}
        <div className='contact-us-input-container'>
          <label style={{color:'hsl(0, 0%, 20%)'}} htmlFor="contactEmail">Email</label>
          <input style={{border:'1px solid hsl(0, 0%, 80%)'}} onChange={handleChange} value={message.email} type="email" id='contactEmail' name='email' required/>
        </div>
        <div className='contact-us-input-container'>
          <label style={{color:'hsl(0, 0%, 20%)'}} htmlFor="contactMessage">Message</label>
          <textarea style={{border:'1px solid hsl(0, 0%, 80%)'}} onChange={handleChange} value={message.content} name="content" id="contactMessage" required></textarea>
        </div>
        <button style={{justifySelf:'start', padding:'0.7rem 1.4rem'}} type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default DashboardContact