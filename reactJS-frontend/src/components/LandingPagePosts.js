import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'



function LandingPagePosts(props) {
    const {pathname, state} = useLocation()
    const {latesPosts} = props
    return (
        <div className="landing-page-posts-wrapper">
            <h1 className='landing-page-posts-header'>Latest Posts</h1>
            <div className="landing-page-posts">
                {latesPosts.map((post)=> {
                    return (
                        <div key={post.id} className="landing-page-post">
                            <div className="landing-page-post-image-container">
                                <img className='landing-page-post-image' src={post.image_url} alt={post.title} />
                                <div className="landing-page-post-image-background-overlay"></div>
                            </div>
                            <div className="landing-page-post-content-container">
                                <div className='landing-page-post-topic-container'>
                                    <Link
                                     to={`/topic/${post.topic}/posts/?filter=${post.topic}`}
                                     state={{topic:post.topic, redirect:pathname}} 
                                     className='post-topic-btn'
                                    >
                                        {post.topic}
                                    </Link>
                                    <p className='landing-page-post-date-posted'>{formatDate(post.date_posted)}</p>
                                </div>
                                <h3 className='landing-page-post-title'>{post.title}</h3>
                                <p className='landing-page-post-content'>
                                    {post.content.substring(0, 150)}...
                                </p>
                                <Link 
                                    to={`/post/${post.id}/detail/`} 
                                    state={{redirect:pathname}} 
                                    className='landing-page-post-read-more-btn'
                                >
                                    <span>Read more</span>
                                    <i className="fa fa-chevron-right"></i>
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Link to='/posts' className='landing-page-post-see-all-posts'>
                <span>View all</span>
                <i className="fa fa-chevron-right"></i>
            </Link>
        </div>
    )
}

export default LandingPagePosts