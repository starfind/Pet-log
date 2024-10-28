import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import CommentForm from '../components/CommentForm'
import LoadingPage from './LoadingPage'
import UpdatePostForm from '../components/UpdatePostForm'
import Comments from '../components/Comments'
import PostDetailPost from '../components/PostDetailPost'
import { getPostData, addLikes, getPostComments } from '../utils/api'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import LatestPostsSidebar from '../components/LatestPostsSidebar'
import TopPostsSidebar from '../components/TopPostsSidebar'
import { formatDate } from '../utils/formatDate'
import { url } from '../utils/urls'
import { handleRightColumnContent } from '../utils/handleEvents'


function PostDetail() {
    const [post, setPost] = useState(null)
    const [comments, setComments] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [showUpdatePostForm, setShowUpdatePostForm] = useState(false)
    const { isAuthenticated } = useContext(ContentLayoutContext)
    const { id } = useParams()
    const navigate = useNavigate()


    const updateLike = async()=> {
        if(!isAuthenticated) {
            navigate('/login', {replace:true, state:{error:'You must login first.'}})

        }else {
            const data = await addLikes(`${url}/api/post/${post.id}/like/`, isAuthenticated.token)
            if(!data.error){
                setPost((prev)=>{
                    if(!prev.likes.includes(isAuthenticated.username)) {
                        return {
                            ...prev, 
                            likes:[...prev.likes, isAuthenticated.username],
                            qs_count:{...prev.qs_count, like_count:prev.qs_count.like_count+1}
                        }
                    }else {
                        return prev
                    }
                })
            }
        }
    }

    const getPost = async()=> {
        try {
            const data = await getPostData(`${url}/api/post/${id}/detail/`)
            if(data.error) {
                setIsError(data.error)
                setIsLoading(false)
                
            }else {
                const postObj = {...data, date_posted:formatDate(data.date_posted)}
                setPost(postObj)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error.message)
            setIsLoading(false)
        }
    }

    const fetchPostComments = async()=> {
        const data = await getPostComments(`${url}/api/post/${id}/comments/`)
        if(data.error) {
            setComments(false)

        }else {
            setComments(data)
            return data
        }
    }

    useEffect(()=>{
        getPost()
    }, [id])

    useEffect(()=> {
        document.title = 'Post Detail'
        fetchPostComments()
    }, [post])

    useEffect(()=> {
        window.addEventListener('scroll', handleRightColumnContent)
        return ()=> {
            window.removeEventListener('scroll', handleRightColumnContent)
        }
    }, [])

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
                        <p className='post-detail-post-topic-name'>{post.topic}</p>
                        <h1 className='post-detail-post-title'>{post.title}</h1>
                    </div>
                </div>
            </div>
            <div className="post-detail-main-container">
                <div className='post-detail-container'>
                    <div className='post-detail-container-contents'>
                        {post && 
                            <PostDetailPost 
                                setShowUpdatePostForm = {setShowUpdatePostForm} 
                                setShowCommentForm = {setShowCommentForm} 
                                authenticated = {isAuthenticated} 
                                navigate = {navigate} 
                                post = {post} 
                                updateLike = {updateLike}
                                getPost={getPost}
                            />
                        }
                        {!showUpdatePostForm &&
                            <CommentForm 
                                setShowCommentForm={setShowCommentForm}
                                comments={comments}
                                setComments={setComments}
                                setPost={setPost}
                                post={post}
                            />
                        }
                        <div id="post-edit-container">
                            {showUpdatePostForm && isAuthenticated &&
                                <UpdatePostForm 
                                    post={post} 
                                    showUpdatePostForm={setShowUpdatePostForm}
                                    authenticated={isAuthenticated}
                                    getPost={getPost}
                                />
                            }
                        </div>
                        <div className="post-detail-comments">
                            {comments && comments.map((comment)=> {
                                return (
                                    <Comments
                                        key={comment.id}
                                        comment={comment}
                                        comments={comments}
                                        setComments={setComments}
                                        setPost={setPost}
                                        post={post}
                                        getPost={getPost}
                                        fetchPostComments={fetchPostComments}
                                    />
                                )
                            })} 
                        </div>
                    </div>
                    {!showUpdatePostForm && !comments &&
                        <div className="no-comments-container">
                            <h3>Be the first to comment!</h3>
                            <p className='no-comment-text'>
                                Nobody's responded to this post yet.
                                Add your thoughts and get the conversation going.
                            </p>
                            {!isAuthenticated && 
                             <>
                                <p className='no-comment-login-to-create-post'>Please login to comment on this post.</p>
                                <Link to='/login'>
                                    <span>Login</span>
                                    <i className="fa fa-chevron-right"></i>
                                </Link>
                             </>
                            }
                        </div>
                    }
                </div>
                <div className='right-side-bar'>
                    <TopPostsSidebar />
                    <LatestPostsSidebar />
                </div>
            </div>
        </React.Fragment>
    )
}

export default PostDetail