import React, { useState, useContext, useEffect } from 'react'
import { HashLink } from 'react-router-hash-link'
import { Navigate } from 'react-router-dom'
import { deletePost, handleFollow } from '../utils/api'
import { url } from '../utils/urls'
import { ContentLayoutContext } from '../layouts/ContentLayout'


function PostDetailPost(props) {
    const [isFollowing, setIsFollowing] = useState(null)
    const [isError, setIsError] = useState(false)
    const [showEditDeleteBtns, setShowEditDeleteBtns] = useState(false)
    const { isAuthenticated } = useContext(ContentLayoutContext)
    const {
            setShowUpdatePostForm, 
            setShowCommentForm, 
            authenticated, 
            navigate, 
            post, 
            updateLike
        } = props

 
    const removePost = async()=> {
        const data = await deletePost(`${url}/api/post/${post.id}/delete/`, authenticated.token)
        if(data.error) {
            setIsError(data.error)
        }
        navigate('/posts')
    }

    const followOrUnfollow = async(choice, author)=> {
        const followURL = `${url}/api/auth/follow/user/${author}/?choice=${choice}`
        try {
            const data = await handleFollow(followURL, isAuthenticated.token)
            if(data.error) {
                console.log(data.error)

            }else {
                setIsFollowing((prev)=> {
                    const obj = {
                        ...prev, follow:data.data.follow, 
                        follower:data.data.follower
                    }
                    return obj
                })
                localStorage.removeItem('auth')
                localStorage.setItem('auth', JSON.stringify(data.data))
            }
        } catch (error) {
            console.log(error.message, error.type)
        }
    }

    useEffect(()=> {
        if(isAuthenticated){
            setIsFollowing((prev)=> {
                const obj = {...prev, follow:isAuthenticated.follow, follower:isAuthenticated.follower}
                return obj
            })
        }
    }, [])

    if(isError) {
        return (
            <Navigate to='/error' state={{error:isError}} />
        )
    }

    return (
        <div className="post-detail-container__post-detail">
            <div className='post-detail-author-and-date-wrapper'>
                <img src={post.author_profile_image_url} alt="post-image" />
                <div className='post-detail-author-post-date'>
                    <span className='post-detail-author'>{post.author}</span>
                    <span className='post-detail-date-posted'>{post.date_posted}</span>
                </div>
            </div>
            <h3 className='post-detail-container__post-title'>{post.title}</h3>
            <div className='landing-page-post-image-container'>
                <img className='post-detail-container__post-image' src={post.image_url} alt="" />
                <div className='landing-page-post-image-background-overlay'>
                </div>
            </div>
            <p id='post-content' className='post-detail-container__post-content'>{post.content}</p>
            <div className="post-detail-container__like-and-reply">
                <button 
                    onClick={()=>updateLike()} 
                    className={authenticated ?
                            'post-detail-container__post-like  post-detail-like-btn'
                        :
                            'post-detail-container__post-like-not-authenticated  post-detail-like-btn'
                    } 
                >
                    <i className='fa-solid fa-hands-clapping post-detail-like'></i>
                    <span className='post-detail-like-count'>{post.qs_count.like_count}</span>
                </button>
                <div className='post-detail-container__num-of-replies-container'>
                    <i className="fas fa-comment post-detail-container__num-of-post"></i>
                    <span className='post-detail-container__reply-count'>{post.qs_count.comment_count}</span>
                </div>
                {isAuthenticated ?
                        isFollowing && isFollowing.follow.includes(post.author) ?
                        <div className='post-author-unfollow'>
                            <button onClick={()=>followOrUnfollow('unfollow', post.author)}>Unfollow</button>
                        </div>
                        :
                        <div className='post-author-follow'>
                            <button onClick={()=>followOrUnfollow('follow', post.author)}>Follow</button>
                        </div>
                :
                    ''
                }
            </div>
            <div className='post-detail-edit-follow-btns'>
                <div className="post-detail-edit-delete-btns-container post-edit">
                    {isAuthenticated && isAuthenticated.username === post.author &&
                        <>
                            <button className='post-detail-ellipsis post-edit' onClick={()=>setShowEditDeleteBtns(!showEditDeleteBtns)}>
                                <i className="fas fa-ellipsis post-edit"></i>
                            </button>
                            {showEditDeleteBtns && 
                                <div className='post-detail-edit-and-delete-btns post-edit show-post-detail-edit-and-delete-btns'>
                                    <button
                                        className='post-detail-edit post-edit' 
                                        onClick={()=> {
                                            setShowUpdatePostForm(true)
                                            setShowCommentForm(false)
                                            setShowEditDeleteBtns(!showEditDeleteBtns)
                                        }}
                                    >
                                        <i className="fa-solid fa-pen post-detail-edit-btn post-edit"></i>
                                        <HashLink to='#post-content' className='post-detail-edit-text post-edit'>Update</HashLink>
                                    </button> 
                                    <button
                                        onClick={()=> {
                                            removePost()
                                            setShowEditDeleteBtns(!showEditDeleteBtns)
                                        }}
                                        className='post-detail-delete post-edit'
                                    >
                                        <i className="fa-solid fa-trash-can post-detail-remove-icon post-edit"></i>
                                        <span className='post-detail-remove-text post-edit'>Remove</span>
                                    </button>
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default PostDetailPost





