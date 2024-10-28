import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { editComment } from '../utils/api'
import { url } from '../utils/urls'
import { ContentLayoutContext } from '../layouts/ContentLayout'



function UpdateCommentForm(props) {
    const [comment, setComment] = useState(props.comment)
    const [isError, setIsError] =  useState(false)
    const {setShowCommentEditForm, setComments, getPost} = props
    const { isAuthenticated } = useContext(ContentLayoutContext)
    

    const handleSubmit = async(e)=> {
        e.preventDefault()
        try {
            const data = await editComment(`${url}/api/comment/${comment.id}/update/`, comment, isAuthenticated.token)
            if(!data.error){
                if(!comment.parent_id) {
                    setComments((prev)=> prev.map((commentObj)=> commentObj.id === comment.id ? comment : commentObj))
                }else {
                    getPost()
                }
                e.target.reset()
                setShowCommentEditForm(false)

            }else {
                console.log(data.error)
                setIsError(data.error)
            }
        } catch (error) {
            console.log(setIsError(error.message))
        }
    }
    
    const handleChange = (e)=> {
        const {name, value} = e.target
        setComment((prev)=> ({...prev, [name]:value}))
    }

    return (
        <form className='post-detail-update-comment-form' onSubmit={handleSubmit}>
             {isError && <p style={{color:'orangered'}}>{isError}</p>}
            <textarea required className='post-detail-update-comment-textarea' onChange={handleChange} name="content" value={comment.content} rows="4"></textarea>
            <div className="post-detail-update-comment-form-btns">
                <button className='post-detail-update-comment-update-btn' type='submit'>Update</button>
                <button className='post-detail-update-comment-cancel-btn' onClick={()=>setShowCommentEditForm(false)} type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default UpdateCommentForm