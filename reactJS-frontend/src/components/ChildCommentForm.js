import React, { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import { createChildComment } from '../utils/api'
import { url } from '../utils/urls'


function ChildCommentForm(props) {
    const [isError, setIsError] =  useState(false)
    const { isAuthenticated } = useContext(ContentLayoutContext)
    const commentContent = useRef()
    const navigate = useNavigate()
    const { 
        setShowCommentForm, 
        setChildrenComments,
        post,
        setPost,
        comment,
    } = props

    const handleCommentSubmit = async(e)=> {
        e.preventDefault()
        if(isAuthenticated) {
            const URLpath = window.location.href
            const commentURL = `${url}/api/comments/${comment.id}/comment/?url=${URLpath}`
            const newComment = commentContent.current.value
            const body = {content:newComment}
            const data = await createChildComment(commentURL, {...body, postId:post.id}, isAuthenticated.token)
            if(!data.error) {
                e.target.reset()
                setShowCommentForm({id:null})
                const newCommentObj = {
                    ...data, user:isAuthenticated.username, 
                    user_image_url:isAuthenticated.profile_image_url,
                }
                setChildrenComments((prev)=>[newCommentObj, ...prev])
                setPost((prev)=>(
                    {...prev, 
                        qs_count:{...prev.qs_count, 
                            comment_count:prev.qs_count.comment_count+1
                        }
                    }
                ))

            }else {
                setIsError(data.error)
            }
        }else {
            navigate('/login')
        }
        
    }

    useEffect(()=> {
        const id = setTimeout(()=> {
            setIsError(false)
            clearTimeout(id)
        }, 7000)
    }, [isError])

    return (
        <form action="" className="comment-form child-comment-form" onSubmit={handleCommentSubmit}>
            {isError && <p style={{color:'orangered'}}>{isError}</p>}
            <textarea required id='comment' name='comment' className='comment-form-textarea' ref={commentContent} placeholder='Add a comment'/>
            <div className="comment-btns">
                <button className='comment-btn-submit' type='submit'>Comment</button>
                <button onClick={()=>setShowCommentForm(false)} className='comment-btn-cancel' type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default ChildCommentForm