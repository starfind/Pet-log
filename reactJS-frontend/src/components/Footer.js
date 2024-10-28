import React, { useEffect, useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import paw from '../images/paw.webp'
import { url } from '../utils/urls'
import { handleMessage } from '../utils/api'


function Footer(prop) {
  const { isAuthenticated } = prop
  const [message, setMessage] = useState({email:'', content:''})
  const [successMessage, setSuccessMessage] = useState(null)
  const [isError, setIsError] = useState(null)



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
    <div className='footer-container'>
        <div className="footer-container__contents">
          <div className='footer-container__brand-container'>
              <div className="footer-container__logo">
                <img className='footer-container__brand-logo' src={paw} alt="paw" />
                <h2 className='footer-container__brand-name'>Canine Blog</h2>
              </div>
              <p className="footer-container__brand-text">
                Welcome to Canine Blog, a personal canine blog 
                site where dog lovers come together to share their 
                stories, seek advice, and support one another. 
                Whether you're dealing with a mischievous puppy,
                managing a senior dog's health, or just want to 
                share a heartwarming moment, our community is 
                here for you.
              </p>
          </div>
          <div className='footer-container__quick-links'>
            <h3 className='quick-links-header'>Quick Links</h3>
            <div className='quick-links'>
              <NavLink className={({isActive})=>isActive?'active-quick-link quick-link' : 'quick-link'} to='/'>Home</NavLink>
              <NavLink className={({isActive})=>isActive?'active-quick-link quick-link' : 'quick-link'} to='/posts'>Posts</NavLink>
              {!isAuthenticated ?
              <>
                <NavLink className={({isActive})=>isActive?'active-quick-link quick-link' : 'quick-link'} to='/login'>Login</NavLink>
                <NavLink className={({isActive})=>isActive?'active-quick-link quick-link' : 'quick-link'} to='/register'>Register</NavLink>
              </>
              :
              <>
                 <NavLink className={({isActive})=>isActive? 'active-quick-link quick-link': 'quick-link'} to='/my-posts'>My Posts</NavLink>
                 <NavLink className={({isActive})=>isActive? 'active-quick-link quick-link': 'quick-link'} to='/my-comments'>My Comments</NavLink>
                 <NavLink className={({isActive})=>isActive?'active-quick-link quick-link' : 'quick-link'} to='/logout'>Logout</NavLink>
              </>
              }
            </div>
          </div>
          <div className="contact-us-container">
            <h3 className='contact-us-header'>Contact</h3>
            <form className='contact-form' onSubmit={handleSubmit}>
              {successMessage && <p className='success-message'>{successMessage}</p> || isError && <p className='error-message'>{isError}</p>}
              <div className='contact-us-input-container'>
                <label htmlFor="contactEmail">Email</label>
                <input onChange={handleChange} value={message.email} type="email" id='contactEmail' name='email' required/>
              </div>
              <div className='contact-us-input-container'>
                <label htmlFor="contactMessage">Message</label>
                <textarea onChange={handleChange} value={message.content} name="content" id="contactMessage" required></textarea>
              </div>
              <button type='submit'>Submit</button>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Footer