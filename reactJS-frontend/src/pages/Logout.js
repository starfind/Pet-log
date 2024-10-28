import React, { useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'



function Logout() {
    const navigate = useNavigate()
    const { setIsAuthenticated } = useOutletContext()
    
    const logout = ()=> {
        setIsAuthenticated(null)
        localStorage.removeItem('auth')
        navigate('/login', {state:{message:'Successfully logged out.'}, replace:true})
    }

    useEffect(()=> {
        document.title = 'Logout'
    }, [])

    return (
        <div className='logout-container'>
            <div className="logout-content">
                <h1>Logout</h1>
                <p>Are you sure you would like to logout?</p>
                <div className="logout-container-btns">
                    <Link to='/posts'>Cancel</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Logout