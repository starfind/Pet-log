import React, { useState, useEffect, useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getPostData} from '../utils/api'
import LoadingPage from './LoadingPage'
import { url } from '../utils/urls'
import PostListPosts from './PostListPosts'


function PostList() {
  const [posts, setPosts] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { state } = useLocation()
  window.history.replaceState({state:null}, '', '/posts')
  
  useEffect(()=>{
    const getPosts = async()=> {
      const data_objs = await getPostData(`${url}/api/posts/`)
      if (data_objs.error) {
        setIsError(data_objs.error)
      }
      const post_data = data_objs.map((post)=>({...post, date_posted:new Date(post.date_posted).toDateString()}))
      setPosts(post_data)
      setIsLoading(false)
    }
    getPosts()
  }, [])

  useEffect(()=> {
    document.title = 'Lates Posts'
    const timeoutID = setTimeout(()=>{
        if(state) {
            if(state.message) {
                const message = document.querySelector('.success-message')
                if(message) {
                  message.style.display = 'none'
                }
            }if(state.error) {
                const error = document.querySelector('.error-message')
                if(error) {
                  error.style.display = 'none'
                }
            }
        }
        clearTimeout(timeoutID)
    }, 7000)
  }, [state])

  if(isLoading) {
    return (
      <LoadingPage />
    )
  }

  if(isError) {
    return (
      <Navigate to='/error' state={{error:isError}}/>
    )
  }

  return (
    <React.Fragment>
      <div className="bg-img">
        <div className="bg-img-header-container">
          <div className="bg-img-contents">
            <h1 className='bg-img-header'>Latest Posts</h1>
            <p className='bg-img-text'>
              You'll find a wealth of information 
              about caring for your canine companion, 
              from best practices to advice against.
            </p>
          </div>
          {state && 
            <p className={state.error?'error-message post-list-message':'success-message post-list-message'}>
              {state.error && state.error || state.message && state.message}
            </p>
          }
        </div>
      </div>
      {posts && <PostListPosts posts={posts} />}
    </React.Fragment>
  )
}

export default PostList