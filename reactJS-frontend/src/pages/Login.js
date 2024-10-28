import React, { useEffect, useState } from 'react'
import { 
    Link, 
    useLocation, 
    Navigate, 
    useNavigate, 
    useOutletContext,
} from 'react-router-dom'
import { loginInfoValidation  } from '../utils/validators'
import { login } from '../utils/api'
import { url } from '../utils/urls'
import LoadingPage from './LoadingPage'
import paw from '../images/paw.webp'


function Login() {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({username:'',password:''})
    const [frontendErrorMessage, setFrontendErrorMessage] = useState(null)
    const [backendAuthError, setBackendAuthError] = useState(null)
    const [isLogingin, setIsLogingin] = useState(false)
    const {isAuthenticated, setIsAuthenticated} = useOutletContext()
    const {state} = useLocation()
    const navigate = useNavigate()
    window.history.replaceState({state:null}, '', '/login')

    const handleForm = async function(e) {
        e.preventDefault()
        setBackendAuthError(null)
        setFrontendErrorMessage(null)
    
        const isNotValid = loginInfoValidation (user)
        if(isNotValid) {
            setFrontendErrorMessage(isNotValid)
        }else{
            setIsLogingin(true)
            const data = await login(`${url}/api/auth/login/`, user)
            if(data.error) {
                setIsLogingin(false)
                setBackendAuthError(data.error)
            }else {
                setIsLogingin(false)
                localStorage.setItem('auth', JSON.stringify(data))
                setIsAuthenticated(data)
                const username = JSON.parse(localStorage.getItem('auth')).username
                navigate(state && state.redirect ? state.redirect:`/user/${username}/dashboard`, {replace:true, state:{message:data.message}})
            }
        }
    }

    const handleChange = function(e) {
        const {name, value} = e.target  
        setUser((prev)=> ({...prev, [name]:value}))
    }

    useEffect(()=> {
        const timeoutID = setTimeout(()=>{
            if(state) {
                if(state.message) {
                    const message = document.querySelector('.user-login__message')
                    if(message) {
                        message.style.display = 'none'
                    }
                }if(state.error) {
                    const error = document.querySelector('.user-login__error')
                    if(error) {
                        error.style.display = 'none'
                    }
                }
            }
            clearTimeout(timeoutID)
        }, 7000)

    }, [state])


    useEffect(()=> {
        document.title = 'Login'
        setIsLoading(false)
    }, [])

    if(isAuthenticated) {
        return (
            <Navigate to='/posts' replace={true} state={{error:'You are logged in already'}} />
        )
    }

    if(isLoading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <div className="user-login-container">
            <Link to='/' className='navbar-brand-link'>
                <img className='navbar-brand-logo' src={paw} alt="paw" />
                <h2 className='navbar-brand-name'>
                    <span>Canine</span>
                    <span>Blog</span>
                </h2>
            </Link>
            <div className="user-login-form-wrapper">
                {state &&
                    <p className={state.error && 'user-login__error' || state.message && 'user-login__message' }>
                        {state.error && state.error || state.message && state.message}
                    </p>
                }
                <h2 className='user-login__header'>Sign In</h2>
                {backendAuthError && <p className='user-register__error'>{backendAuthError}</p>}
                <form className='user-login__form' onSubmit={handleForm}>
                    <div className='login-input-container'>
                        <label htmlFor="username">Username</label>
                        {frontendErrorMessage && frontendErrorMessage.username === 'null' && <p className='user-register__error'>This field is required.</p>}
                        <input 
                            onChange={handleChange} 
                            value={user.username} 
                            className='user-login__input' 
                            name='username' 
                            type="text" 
                            id='username'
                        />
                    </div>
                    <div className="login-input-container">
                        <label htmlFor="password">Password</label>
                        {frontendErrorMessage && frontendErrorMessage.password === 'null' && <p className='user-register__error'>This field is required.</p>}
                        <input 
                            onChange={handleChange} 
                            value={user.password} 
                            className='user-login__input' 
                            name='password' 
                            type="password" 
                            id='password'
                        />
                    </div>
                    <button className='user-login__btn' type='submit'>
                        {isLogingin ? <div style={{display:'flex',gap:'0.3rem',alignItems:'center'}}>Logging in...<p className='registering-animation'></p></div> : 'Login'}
                    </button>
                </form>
                <div className="user-login__not-yet-registered">
                    <p>Don't have an account? </p>
                    <Link to='/register'>
                        <span>Sign Up</span>
                        <i className="fa fa-chevron-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login