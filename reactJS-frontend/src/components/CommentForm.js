import React, { useEffect, useRef, useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import { url } from '../utils/urls'
import { createComment } from '../utils/api'


function CommentForm(props) {
    const [isError, setIsError] =  useState(false)
    const { isAuthenticated } = useContext(ContentLayoutContext)
    const commentContent = useRef()
    const navigate = useNavigate()
    const { 
        setShowCommentForm, 
        post,
        setPost, 
        comments, 
        setComments
    } = props
    
    const handleCommentSubmit = async(e)=> {
        e.preventDefault()
        if(isAuthenticated) {
            const URLpath = window.location.href
            const commentURL = `${url}/api/post/${post.id}/create/comment/?url=${URLpath}`
            const newComment = commentContent.current.value
            const body = {content:newComment}
            const data = await createComment(commentURL, body, isAuthenticated.token)
            if(!data.error) {
                e.target.reset()
                setShowCommentForm(false)
                const newCommentObj = {
                    ...data, user:isAuthenticated.username, 
                    user_image_url:isAuthenticated.profile_image_url
                }
                setPost((prev)=>({...prev, qs_count:{...prev.qs_count, comment_count:prev.qs_count.comment_count+1}}))
                setComments((prev)=> comments ? [newCommentObj, ...prev] : [newCommentObj])

            }else {
                setIsError(data.error)
            }
        }else {
            navigate('/login', {replace:true})
        }
        
    }

    useEffect(()=> {
        const id = setTimeout(()=> {
            setIsError(false)
            clearTimeout(id)
        }, 3000)
    }, [isError])

    return (
        <form action="" className="comment-form" onSubmit={handleCommentSubmit}>
            {isError && <p style={{color:'orangered'}}>{isError}</p>}
            <textarea required id='comment' name='comment' className='comment-form-textarea' ref={commentContent} placeholder='Add a comment'/>
            <div className="comment-btns">
                <button className='comment-btn-submit' type='submit'>Comment</button>
            </div>
        </form>
    )
}

export default CommentForm