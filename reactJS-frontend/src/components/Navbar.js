import { Link, NavLink, useNavigate } from 'react-router-dom'
import React, { useEffect, useState, useContext } from 'react'
import paw from '../images/paw.webp'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import NavbarTopics from './NavarTopics'
import { url } from '../utils/urls'
import { getTopicData } from '../utils/api'
import SearchForm from './SearchForm'
import MobileNavLinks from './MobileNavLinks'
import DesktopNavLinks from './DesktopNavLinks'
import { 
    handleMobileAuthenticatedUserNavLinks,
    handleMobileTopics
} from '../utils/handleEvents'


export function Navbar() {
    const [ showMenuBtn, setShowMenuBtn] = useState(true)
    const [ showCloseBtn, setShowCloseBtn] = useState(false)
    const { isAuthenticated, setIsAuthenticated } = useContext(ContentLayoutContext)
    const [ showSearchForm, setShowSearchForm ] = useState(false)
    const [showTopics, setShowTopics] = useState(false)
    const [topics, setTopics] = useState(null)
    const [showNavLinks, setShowNavLinks] = useState(false)
    const navigate = useNavigate()

    const logout = function() {
        setShowNavLinks(false)
        setShowCloseBtn(false)
        setShowMenuBtn(true)
        navigate('/logout')
    }
   
    useEffect(()=> {
        const getTopics = async()=> {
            const data = await getTopicData(`${url}/api/topics/`)
            setTopics(data)
          }
          getTopics()
    }, [])


    return (
        <div id='navbar-container' className="navbar-container">
            {showSearchForm && <SearchForm setShowSearchForm={setShowSearchForm}/>}
            <nav className="navbar-wrapper">
                <div className='navbar-top-row'>
                    <Link to='/' className='navbar-brand-link'>
                        <img className='navbar-brand-logo' src={paw} alt="paw" />
                        <h2 className='navbar-brand-name'>
                            <span>Canine</span>
                            <span>Blog</span>
                        </h2>
                    </Link>
                    <button onClick={()=> {
                        setShowSearchForm(!showSearchForm)
                        setShowNavLinks(false)
                        setShowCloseBtn(false)
                        setShowMenuBtn(true)
                    }}
                        className='mobile-search-btn'
                    >
                        <i className='fas fa-search'></i>
                    </button>
                    {showMenuBtn && 
                        <button
                            onClick={()=> {
                                setShowNavLinks(true)
                                setShowSearchForm(false)
                                setShowCloseBtn(true)
                                setShowMenuBtn(false)
                            }} 
                            className='mobile-show-navlink-btn'
                        >
                            <i className="fa fa-bars"></i>
                        </button>
                    }
                    {showCloseBtn && 
                        <button
                            onClick={()=> {
                                setShowNavLinks(false)
                                setShowMenuBtn(true)
                                setShowCloseBtn(false)
                            }} 
                            className='mobile-hide-navlinks-btn'
                        >
                            <i className="fa fa-times"></i>
                        </button>
                    }
                </div>

                <div className='mobile-navlinks-container'>
                    <MobileNavLinks 
                        showNavLinks={showNavLinks}
                        setShowNavLinks={setShowNavLinks}
                        isAuthenticated={isAuthenticated}
                        handleMobileAuthenticatedUserNavLinks={handleMobileAuthenticatedUserNavLinks}
                        handleMobileTopics={handleMobileTopics}
                        NavbarTopics={NavbarTopics}
                        setShowCloseBtn={setShowCloseBtn}
                        topics={topics}
                        setShowMenuBtn={setShowMenuBtn}
                        logout={logout}

                    />
                </div>

                <DesktopNavLinks 
                    logout={logout}
                    topics={topics && topics}
                    isAuthenticated={isAuthenticated}
                    setShowSearchForm={setShowSearchForm}
                    showSearchForm={showSearchForm}
                />
            </nav>
        </div>
    )
}

