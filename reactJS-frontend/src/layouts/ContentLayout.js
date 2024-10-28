import React, { useState, useEffect, createContext } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import Footer from '../components/Footer'
import { getTopicData, getPostData } from '../utils/api'
import { url } from '../utils/urls'

export const ContentLayoutContext = createContext()


function ContentLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('auth') ? 
    JSON.parse(localStorage.getItem('auth')) :
    null
  )
  const [scrollHeight, setScrollHeight] = useState(window.pageYOffset)
  const [topics, setTopics] = useState(null)
  const [posts, setPosts] = useState(null)
  
  function getWindowScrollHeight(){
    const height = window.pageYOffset
    setScrollHeight(height)
  }

  useEffect(()=> {
    window.addEventListener('scroll', getWindowScrollHeight)
    return ()=> {
      window.removeEventListener('scroll', getWindowScrollHeight)
    }
  }, [scrollHeight])

  useEffect(()=> {
    const getTopics = async()=> {
      const data = await getTopicData(`${url}/api/topics/`)
      setTopics(data)
    }
    getTopics()
  }, [])

  useEffect(()=> {
    const getPosts = async()=> {
      try {
        const data = await getPostData(`${url}/api/posts/`)
        setPosts(data)
      } catch ({message}) {
        console.log(message)
      }
    }
    getPosts()
  }, [])


  return (
    <ContentLayoutContext.Provider value={
        {
          topics:topics,
          posts:posts,
          setIsAuthenticated:setIsAuthenticated,
          isAuthenticated:isAuthenticated
        }
      }
    >
        <header className='main-header'>
            <Navbar/>
        </header>
        <main className='main-container'>
            <Outlet context={
              {
                setIsAuthenticated:setIsAuthenticated,
                isAuthenticated:isAuthenticated
              }
            }/>
        </main>
        <footer>
          <Footer isAuthenticated={isAuthenticated}/>
        </footer>
        {scrollHeight >= 500 && 
          <button className="scroll-up-container" onClick={()=> window.scrollTo(0, 0)}>
            <i className="fa fa-chevron-up"></i>
          </button>
        }
    </ContentLayoutContext.Provider>
  )
}

export default ContentLayout
