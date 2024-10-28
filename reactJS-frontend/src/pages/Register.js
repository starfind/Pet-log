import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { register } from '../utils/api'
import { passwordCheck, newUserInfoCheck, checkEmail } from '../utils/validators'
import LoadingPage from './LoadingPage'
import { url } from '../utils/urls'
import { ContentLayoutContext } from '../layouts/ContentLayout' 
import paw from '../images/paw.webp'



function Register() {
    const [windowLoaded, setWindowLoaded] = useState(document.readyState === 'interactive')
    const [isLoading, setIsLoading] = useState(true)
    const [newUser, setNewUser] = useState({username:'', email:'', password:'', passwordConfirmation:''})
    const [userInfoError, setUserInfoError] = useState(null)
    const [passwordValidated, setPasswordValidated] = useState(true)
    const [emailValidated, setEmailValidated] = useState(true)
    const [backendAuthError, setBackendAuthError] = useState(null)
    const [isRegistering, setIsregistering] = useState(false)
    const {isAuthenticated} = useContext(ContentLayoutContext)
    const navigate = useNavigate()

    
    const handleForm = async function(e) {
        e.preventDefault()
        setUserInfoError(null)
        setPasswordValidated(true)
        setBackendAuthError(null)
        setEmailValidated(true)
    
        const userInfo = newUserInfoCheck(newUser)
        
        if(userInfo !== 'validated') {
            setUserInfoError(userInfo)
        }else {
            const emailValid = checkEmail(newUser.email)
            const passwordValid = passwordCheck(newUser.password)

            if(!emailValid && !passwordValid) {
                setPasswordValidated(false)
                setEmailValidated(false)
            }
            else if(!passwordValid) {
                setPasswordValidated(false)
            }
            else if(!emailValid) {
                setEmailValidated(false)
            }
            else {
                setIsregistering(true)
                const body = {username:newUser.username, email:newUser.email, password:newUser.password}
                const data = await register(`${url}/api/auth/register/`, body)
                if(data.error){
                    setBackendAuthError(data)
                    setIsregistering(false)
                }else{
                    setIsregistering(false)
                    setNewUser({username:'',password:'',passwordConfirmation:''})
                    navigate('/login', {replace:true, state:{message:data.message}})
                }
            }
        }
    
    }

    const handleChange = function(e) {
        const {name, value} = e.target  
        setNewUser((prev)=> ({...prev, [name]:value}))
    }

    useEffect(()=> {
        document.title = 'Register'
        setIsLoading(false)
    }, [windowLoaded])

    if(isAuthenticated) {
        return (
            <Navigate to='/posts' replace={true} state={{error:'You are registered already'}}/>
        )
    }

    if(isLoading) {
        return (
            <LoadingPage />
        )
    }
    
    return (
        <div className="user-register-container">
            <Link to='/' className='navbar-brand-link'>
                <img className='navbar-brand-logo' src={paw} alt="paw" />
                <h2 className='navbar-brand-name'>
                    <span>Canine</span>
                    <span>Blog</span>
                </h2>
            </Link>
            <div className='user-register'>
                <h2 className='user-register__header'>Sign Up</h2>
                <form className='user-register__form' onSubmit={handleForm}>
                    {backendAuthError && <p className='user-register__error'>{backendAuthError.error}</p>}
                    <div className="user-register-input-container">
                        <label htmlFor="username">Username</label>
                        {userInfoError && Object.keys(userInfoError).includes('username') &&
                            <p className='user-register__error'>{userInfoError.username}</p>
                        }
                        <input
                            className='user-register__input' 
                            onChange={handleChange} 
                            name='username' 
                            value={newUser.username.replaceAll(' ', '')} 
                            type="text" 
                            id='username'
                        />
                    </div>
                    <div className="user-register-input-container">
                        <label htmlFor="email">Email</label>
                        {userInfoError && Object.keys(userInfoError).includes('email') &&
                            <p className='user-register__error'>{userInfoError.email}</p>
                        }
                        {!emailValidated && 
                            <p className='user-register__error'>
                                Invalid email.
                            </p>
                        }
                        <input
                            className='user-register__input' 
                            onChange={handleChange} 
                            name='email' 
                            value={newUser.email} 
                            type="email" 
                            id='email'
                        />
                    </div>
                    <div className="user-register-input-container">
                        <label htmlFor="password">Password</label>
                        {userInfoError && Object.keys(userInfoError).includes('password') &&
                            <p className='user-register__error'>{userInfoError.password}</p>
                        }
                        {!passwordValidated && 
                            <p className='user-register__error'>
                                Password must contain number, upper and lower case characters. 
                            </p>
                        }
                        <input
                            className='user-register__input' 
                            onChange={handleChange} 
                            name='password' 
                            value={newUser.password} 
                            type="password" 
                            id='password'
                        />
                    </div>
                    <div className="user-register-input-container">
                        <label htmlFor="confirm password">Confirm password</label>
                        {userInfoError && 
                            <div>
                                {userInfoError && Object.keys(userInfoError).includes('passwordConfirmation') &&
                                    <p className='user-register__error'>{userInfoError.passwordConfirmation}</p>
                                }
                                {userInfoError && Object.keys(userInfoError).includes('passwordMismatch') &&
                                    <p className='user-register__error'>{userInfoError.passwordMismatch}</p>
                                }
                            </div>
                        }
                        <input
                            className='user-register__input' 
                            onChange={handleChange} 
                            name='passwordConfirmation' 
                            value={newUser.passwordConfirmation} 
                            type="password" 
                            id='confirm password'
                        />
                    </div>
                    <button className='user-register__btn' type='submit'>
                        {isRegistering ? <div style={{display:'flex',gap:'0.3rem',alignItems:'center'}}>Registering...<p className='registering-animation'></p></div> : 'Register'}
                    </button>
                </form>
                <div className="user-register__already-registered">
                    <p>Already a member? </p>
                    <Link to='/login'>
                        <span>Sign In</span>
                        <i className="fa fa-chevron-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register