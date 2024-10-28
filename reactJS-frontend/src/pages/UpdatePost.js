import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate, Link, NavLink } from 'react-router-dom'
import { getTopicData, updatePost as updateMyPost } from '../utils/api'
import { url } from '../utils/urls'
import CreatePost from './CreatePost'
import { validatePost } from '../utils/validators'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import paw from '../images/paw.webp'


const UpdatePost= ()=> {
    const [topics, setTopics] = useState(null)
    const [error, setError] = useState(null)
    const [updatePost, setUpdatePost] = useState({
        id:'', image:'', topic:'', 
        title:'', content:'', currentImage:'',
    })
    const [missingValue, setMissingValue] = useState(null)
    const {state} = useLocation()
    const navigate = useNavigate()
    const {isAuthenticated} = useContext(ContentLayoutContext)


    const handleSubmit = async(e)=> {
        e.preventDefault()
        setMissingValue(null)
        
        const formData = new FormData()
        const result = validatePost(updatePost)
       
        if(result !== 'valid') {
            setMissingValue(result)

        }else {
            const keys = Object.keys(updatePost).filter((obj)=>obj !=='currentImage')
            keys.forEach((key)=>{
                if(key === 'image'){
                    if (updatePost[key] instanceof Object) {
                        formData.append(key, updatePost[key][0])
                    }else {
                        formData.append(key, updatePost[key])
                    }
                }else {
                    formData.append(key, updatePost[key])
                }
            })

            const data = await updateMyPost(`${url}/api/post/${updatePost.id}/update/`, formData, isAuthenticated.token)

            if(data.message === 'Successfully updated'){
                setUpdatePost(
                    {
                        id:data.id,
                        currentImage:data.image,
                        image:'',
                        topic:data.topic,
                        title:data.title,
                        content:data.content
                    }
                )
                navigate(`/user/${isAuthenticated.username}/dashboard/`, {state:{message:data.message}})
            }
        }
    }

    function handleChange(e) {
        const {name, value} = e.target 
        if (name === 'image') {
            setUpdatePost((prev)=>({...prev, [name]:e.target.files}))
        }else {
            setUpdatePost((prev)=>({...prev, [name]:value}))
        }
    }

    const fetchTopics = async()=> {
        try {
            const data = await getTopicData(`${url}/api/topics`)
            const topic_names = data.map((topic)=>topic.name)
            setTopics(topic_names)
        } catch ({message}) {
            setError(message)
            navigate('/error', {state:{message:message}})
        }
    }

    useEffect(()=> {
        fetchTopics()
        setUpdatePost((prev)=> {
            const image = state.update.image.split('/').filter((obj)=>obj !== '').slice(-1).join()
            const post = {
                ...prev,
                id:state.update.id,
                currentImage:image,
                topic:state.update.topic,
                title:state.update.title,
                content:state.update.content
            }
            return post
        })
    }, [state])

    return (
        <div className='create-post-container'>
            <Link to='/' className='navbar-brand-link'>
                <img className='navbar-brand-logo' src={paw} alt="paw" />
                <h2 className='navbar-brand-name'>
                    <span>Canine</span>
                    <span>Blog</span>
                </h2>
            </Link>
            <div className="create-post__form-container">
                <form className="create-post__form" onSubmit={handleSubmit}>
                    <div className='update-post-image-and-current-image-container'>
                        <div className='create-post-img-input-container'>
                            {missingValue && missingValue.image === '' && <p className='create-post__error'>This field is required.</p>}
                            <label className='create-post__img-input-label' htmlFor="image">Image</label>
                            <input onChange={handleChange} type="file" accept='image/*' name='image' className='create-post__img-input' id='image' value=''/>
                        </div>
                        <div className="current-image">
                            <label htmlFor="current-image">Current Image:</label>
                            <input style={{border:'none',background:'none'}} onChange={handleChange} id='current-image' value={updatePost.currentImage} type="text" />
                        </div>
                    </div>
                    <div className="create-post-select-topic-container">
                        <label className='create-post__label' htmlFor="topic">Topic</label>
                        {missingValue && missingValue.topic === '' && <p className='create-post__error'>This field is required.</p>}
                        <select
                            id='topic'
                            onChange={handleChange} 
                            className='create-post__select' 
                            name="topic"
                            value={updatePost ? updatePost.topic : 'topic'}
                        >
                            {topics && topics.map((topic)=>{
                                return (
                                    <option className='create-post__option' key={topic}>
                                        {topic}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='create-post-title-input-container'>
                        <label className='create-post__label' htmlFor="title">Title</label>
                        {missingValue && missingValue.title === '' && <p className='create-post__error'>This field is required.</p>}
                        <input
                            id='title'
                            onChange={handleChange}
                            className='create-post__input' 
                            type="text"
                            value= {updatePost && updatePost.title}
                            name='title'
                        />
                    </div>
                    <div className="create-post-textarea-container">
                        <label className='create-post__label' htmlFor="content">Content</label>
                        {missingValue && missingValue.content === '' && <p className='create-post__error'>This field is required.</p>}
                        <textarea
                            id='content'
                            onChange={handleChange}
                            name="content" 
                            className='create-post__textarea'
                            cols="30" 
                            rows="5"
                            value= {updatePost && updatePost.content}
                        />
                    </div>
                    <div className='create-post-btns'>
                        <button className='create-post__btn' type='submit'>Submit</button>
                        <NavLink to={`/user/${isAuthenticated.username}/dashboard/`} className='create-post-cancel-btn'>Cancel</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdatePost