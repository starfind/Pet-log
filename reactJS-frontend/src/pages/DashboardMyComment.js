import React, { useState, useEffect, useContext } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { url } from '../utils/urls'
import LoadingPage from './LoadingPage'
import { fetchComments, removeComment, editComment } from '../utils/api'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import { formatDate } from '../utils/formatDate'


function DashboardMyComment() {
  const [comments, setComments] = useState(null)
  const [update, setUpdate] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const {state, pathname} = useLocation()
  const { isAuthenticated } = useContext(ContentLayoutContext)


  const deleteComment = async(id)=> {
    const obj = {isMyComment:true}
    try {
      const data = await removeComment(`${url}/api/comment/${id}/delete/`, isAuthenticated.token, obj)
      if(!data.error){
        const new_comment_array = comments.filter((comment)=> comment.id !== id)
        setComments(new_comment_array)
        setIsLoading(false)
        console.log(data)

      }else{
        console.log(data.message)
        setIsLoading(false)
        navigate('/error', {replace:true, state:{message:{error:`${data.error}`}}})
        
      }

    } catch (error) {
      console.log(error.message)
      setIsLoading(false)
      navigate('/error', {replace:true, state:{message:{error:`${error.message}`}}})
    }

  }

  const updateComment = async(e, id)=> {
    e.preventDefault()
    const body = {content:update.content, user:isAuthenticated.username}
    try {
      const data = await editComment(`${url}/api/comment/${id}/update/`, body, isAuthenticated.token)
      if(!data.error) {
        const newComments = comments.map((comment)=> {
          if(comment.id === data.id){
            return data
          }else {
            return comment
          }
        })
        setComments(newComments)
        setUpdate(null)
        setIsLoading(false)

      }else {
        console.log(data.error)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const handleChange = (e)=> {
    const {name, value} = e.target
    setUpdate((preve)=>({...preve, [name]:value}))
  }

  useEffect(()=> {
    const getComments = async()=> {
      const data = await fetchComments(`${url}/api/my-comment/`, isAuthenticated.token)
      if(data.length !== 0) {
        setComments(data)
      }
      setIsLoading(false)
    }
    getComments()
  }, [])

  if(!isAuthenticated) {
    return (
      <Navigate to='/login'  replace={true} state={{error:'Please login to see your comment!', redirect:pathname}}/>
    )
  }

  if(isLoading) {
      return (
          <LoadingPage />
      )
  }
 
  return (
    <React.Fragment>
      {comments ?
        <div className='my-comments-container'>
          {comments.map((comment)=> {
            return (
              <div key={comment.id} className="my-comments-container__my-comment">
                <p className='my-comments__date-replied'>
                  {formatDate(comment.date_posted)}
                </p>
                <Link className='my-comments__post-name-link' to={`/post/${comment.post_id}/detail/`}>{comment.post}</Link>
                <p className='my-comments__content'>{comment.content}</p>
                <div className="my-comments-container__buttons">
                  <button
                    onClick={()=>setUpdate({content:comment.content, id:comment.id})} 
                    className='my-comments__update-button'
                  >
                    <i className="fa-solid fa-pen"></i>
                    Edit
                  </button>
                  <button
                    onClick={()=>deleteComment(comment.id)} 
                    className='my-comments__delete-button'
                  >
                    <i className="fa-solid fa-trash-can"></i>
                    Remove
                  </button>
                </div>
                {update && update.id === comment.id &&
                  <div className="update-comment-form-container">
                    <form action="" className="update-comment-form" onSubmit={(e)=>updateComment(e,comment.id)}>
                      <textarea onChange={handleChange} className='update-comment-textarea' value={update.content} name="content" rows="6"></textarea>
                      <div className="update-comment-form-buttons-container">
                        <button type='submit' className='update-comment-submit-btn'>Submit</button>
                        <button onClick={()=>setUpdate(null)} type='button' className='update-comment-cancel-btn'>Cancel</button>
                      </div>
                    </form>
                  </div>
                }
                <div className="my-comment-border-bottom"></div>
              </div>
            )
          })}
        </div>
      :
        <div className="no-topic-post-container my-comment-no-comment">
          <div className="no-topic-post-text-container">
              <h3 style={{fontSize:'1.7rem', color:'var(--black-20)'}}>You do not have any coment!</h3>
              <p className='no-topic-post-text'>
                  Please pick a post and comment.
              </p>
              <Link className='no-topic-post-create-btn' to='/posts'>
                <span>Back to posts</span>
                <i className="fa fa-chevron-right"></i>
              </Link>
          </div>
        </div>
      }
    </React.Fragment>
  )
}

export default DashboardMyComment