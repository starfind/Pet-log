import React, { useState } from 'react'
import { useContext } from 'react'
import { updatePost } from '../utils/api'
import { url } from '../utils/urls'
import { ContentLayoutContext } from '../layouts/ContentLayout'


function UpdatePostForm(props) {
    const [post, setPost] = useState(props.post)
    const { showUpdatePostForm, getPost } = props
    const { isAuthenticated } = useContext(ContentLayoutContext)

    const handleSubmit = async(e)=> {
        e.preventDefault()
        const token = isAuthenticated.token
        const newFormData = new FormData()
        const keys = Object.keys(post)
        keys.forEach((key)=>{
            newFormData.append(key, post[key])
        })
        const body = newFormData
        try {
            const data = await updatePost(`${url}/api/post/${post.id}/update/`, body, token)
            if(!data.error) {
                getPost()
                showUpdatePostForm(false)
            }else {
                console.log(data.error) 
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleChange = (e)=> {
        const {name, value} = e.target
        setPost((prev)=> ({...prev, [name]:value}))
    }

    return (
        <form id='post-edit-form' action="" className="post-detail-post-edit-form" onSubmit={handleSubmit}>
            <input id='post-edit-form-input' name='title' onChange={handleChange} value={post.title} type="text" />
            <textarea id='post-edit-form-textarea' name='content' onChange={handleChange} value={post.content} className='reply-form-textarea' rows='5'/>
            <div className="post-detail-post-edit-btns">
                <button className='post-detail-post-edit-btn-submit' type='submit'>Update</button>
                <button onClick={()=>showUpdatePostForm(false)} className='post-detail-post-edit-btn-cancel' type='button'>Cancel</button>
            </div>
        </form>
    )
}

export default UpdatePostForm