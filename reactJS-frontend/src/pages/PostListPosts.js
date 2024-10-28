import React, { useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'
import TopPostsSidebar from '../components/TopPostsSidebar'
import LatestPostsSidebar from '../components/LatestPostsSidebar'
import { handleRightColumnContent } from '../utils/handleEvents'


function PostListPosts(props) {
    let {posts} = props
    const {pathname} = useLocation()
    const [ scrollHeight, setScrollHeight] = useState(window.pageYOffset)


    useEffect(()=> {
        window.addEventListener('scroll',handleRightColumnContent)
        return ()=> {
            window.removeEventListener('scroll', handleRightColumnContent)
        }
    }, [])

    if(posts) {
        const remainder = posts.length % 3
        const sliced = posts.slice(0, posts.length-remainder)
        posts = sliced
    }
    
    return (
        <div className="post-container">
            <div className="post-container__posts">
                {posts && posts.map((post)=> {
                    return (
                        <div key={post.id} className="post-container__post">
                            <div className='post-container__post-image-container'>
                                <img className='post-container__post-image' src={post.image_url} alt={post.title} />
                                <div className='post-container__post-image-background-overlay'></div>
                            </div>
                            <div className='post-container__post-text-content'>
                                <div className='landing-page-post-topic-container'>
                                    <Link
                                     to={`/topic/${post.topic}/posts/?filter=${post.topic}`}
                                     state={{topic:post.topic, redirect:pathname}} 
                                     className='post-topic-btn'
                                    >
                                        {post.topic}
                                    </Link>
                                    <p className='post-container__post-date-posted'>{formatDate(post.date_posted)}</p>
                                </div>
                                <h3 className='post-container__post-title'>{post.title}</h3>
                                <p className='post-container__post-content'>
                                    {post.content.substring(0, 150)}...
                                </p>
                                <Link 
                                    className='landing-page-post-read-more-btn'
                                    to={`/post/${post.id}/detail/`}
                                    state={{redirect:pathname}} 
                                >
                                    <span>Read more</span>
                                    <i className="fa fa-chevron-right"></i>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className='right-side-bar'>
                <TopPostsSidebar />
                <LatestPostsSidebar />
            </div>
        </div>
    )
}

export default PostListPosts