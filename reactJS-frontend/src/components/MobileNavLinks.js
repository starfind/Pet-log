import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import SearchForm from './SearchForm'
import Logout from '../pages/Logout'


function MobileNavLinks(props) {
    const [ showSearForm, setShowSearchForm ] = useState(false)
    const { showNavLinks, setShowNavLinks, 
        isAuthenticated, handleMobileAuthenticatedUserNavLinks,
        handleMobileTopics, topics, NavbarTopics,
        setShowCloseBtn, setShowMenuBtn, logout
    } = props
   
    return (
        <div className={showNavLinks?"show-mobile-navlinks mobile-navlinks":"mobile-navlinks"}>
            {isAuthenticated &&
                <div className="mobile-navlinks-authenticated-user-container">
                    <button onClick={handleMobileAuthenticatedUserNavLinks} className="mobile-navlinks-authenticated-user">
                        <img src={isAuthenticated.image_url} alt="" />
                        <span>{isAuthenticated.username}</span>
                        <i className="fa fa-chevron-down mobile-navlinks-authenticated-user-chevron"></i>
                    </button>
                    <div className='mobile-authenticated-user-links'>
                        <NavLink
                            onClick={()=> {
                                setShowNavLinks(false)
                                setShowCloseBtn(false)
                                setShowMenuBtn(true)
                            }}
                            to={`/user/${isAuthenticated.username}/dashboard/`}
                            className={({isActive})=>isActive?'mobile-active-navlink mobile-navlink':'mobile-navlink'}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink 
                            onClick={()=> {
                                setShowNavLinks(false)
                                setShowCloseBtn(false)
                                setShowMenuBtn(true)
                            }}
                            to='/create/post'
                            className={({isActive})=>isActive?'mobile-active-navlink mobile-navlink':'mobile-navlink'}
                        >
                            Create Post
                        </NavLink>
                    </div>
                </div>
            }
            <NavLink 
                onClick={()=> {
                    setShowNavLinks(false)
                    setShowCloseBtn(false)
                    setShowMenuBtn(true)
                }} 
                to='/' className={({isActive})=>isActive?'mobile-active-navlink mobile-navlink':'mobile-navlink'}
            >
                Home
            </NavLink>
            <div 
                className='mobile-navlink mobile-topics-container'
                onClick={handleMobileTopics} 
            >
                <div className='mobile-navbar-topic'>
                    <span>Topics</span>
                    <i className="fa fa-chevron-down mobile-topics-chevron-down"></i>
                </div>
                <NavbarTopics 
                    topics={topics} 
                    setShowNavLinks={setShowNavLinks}
                    setShowMenuBtn={setShowMenuBtn}
                    setShowCloseBtn={setShowCloseBtn}
                />

            </div>
            <NavLink 
                onClick={()=> {
                    setShowNavLinks(false)
                    setShowCloseBtn(false)
                    setShowMenuBtn(true)
                }}
                to='/posts' 
                className={({isActive})=>isActive?'mobile-active-navlink mobile-navlink':'mobile-navlink'}
            >
                Posts
            </NavLink>
            {isAuthenticated ?
                <div className='mobile-logout-btn-container'>
                    <button onClick={logout} className='mobile-logout-btn'>
                        Logout
                    </button>
                </div>
            :
                <>
                    <NavLink 
                        onClick={()=> {
                            setShowNavLinks(false)
                            setShowCloseBtn(false)
                            setShowMenuBtn(true)
                        }}
                        to='/login' 
                        className={({isActive})=>isActive?'mobile-active-navlink mobile-navlink':'mobile-navlink'}
                    >
                        Login
                    </NavLink>
                    <NavLink 
                        onClick={()=> {
                            setShowNavLinks(false)
                            setShowCloseBtn(false)
                            setShowMenuBtn(true)
                        }}
                        to='/register' 
                        className={({isActive})=>isActive?'mobile-active-navlink mobile-navlink':'mobile-navlink'}
                    >
                        Register
                    </NavLink>
                </>   
            }
        </div>
    )
}

export default MobileNavLinks