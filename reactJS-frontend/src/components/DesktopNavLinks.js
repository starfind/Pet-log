import React, { useContext, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import NavbarTopics from './NavarTopics'
import SearchForm from './SearchForm'
import { 
    removeDesktopTopicsAndUserLinks,
    openDesktopUserNavLinks,
    openDesktopTopics,
    openDesktopSearchForm
 } from '../utils/handleEvents'


function DesktopNavLinks(props) {
    const {isAuthenticated,  setShowSearchForm, showSearchForm, logout, topics } = props

    useEffect(()=> {
        window.addEventListener('click', removeDesktopTopicsAndUserLinks)
        return () => {
            window.removeEventListener('click', removeDesktopTopicsAndUserLinks)
        }
    }, [])

    return (
        <div className='desktop-navlinks' >
            <NavLink
                to='/' className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
            >
                Home
            </NavLink>
            <div
                onClick={()=> {
                    setShowSearchForm(false)
                    openDesktopTopics()
                }}
                id='topics'
                className='navbar-navlink topic-element'
            >
                <button className='navbar-topic-btn topic-element'>
                    <span className='topic-element'>Topics</span>
                    <i className="fa fa-chevron-down lg-topic-chevron topic-element"></i>
                </button>
                <NavbarTopics topics={topics} />
            </div>
            
            <NavLink
                to='/posts' 
                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
            >
                Posts
            </NavLink>
            {isAuthenticated ?
                <>
                    <div 
                        className="lg-authenticated-user-container navbar-navlink auth-user"
                        onClick={()=> {
                            setShowSearchForm(false)
                            openDesktopUserNavLinks()
                        }}
                    >
                        <img src={isAuthenticated.image_url} alt="" className='auth-user'/>
                        <span className='auth-user'>{isAuthenticated.username}</span>
                        <i className="auth-user fa fa-chevron-down lg-chevron auth-user"></i>
                        <div className="lg-authenticated-user auth-user">
                            <NavLink
                                to={`/user/${isAuthenticated.username}/dashboard/`}
                                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                            >
                                Dashboard
                            </NavLink>
                            <NavLink 
                                to='/create/post'
                                className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                            >
                                Create Post
                            </NavLink>
                            <button 
                                onClick={()=>logout()} 
                                className='navbar-navlink navbar-button auth-user' 
                                style={{border:'none',background:'none'}}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            :
                <>
                    <NavLink
                        to='/login' 
                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to='/register' 
                        className={({isActive})=>isActive?'navbar-active-navlink navbar-navlink':'navbar-navlink'}
                    >
                        Register
                    </NavLink>
                </>
            }
            <button onClick={()=> {
                setShowSearchForm(!showSearchForm)
                openDesktopSearchForm()
            }} 
                className='search-btn'
            >
                 <i className='fas fa-search'></i>
            </button>
        </div>

    )
}

export default DesktopNavLinks