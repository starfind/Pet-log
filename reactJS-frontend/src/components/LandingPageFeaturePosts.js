import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'



function LandingPageFeaturePosts(props) {
    const {pathname, state} = useLocation()
    const {featuredPosts} = props

    
    return (
        <div className="landing-page-featured-posts-wrapper">
            <h1 className='landing-page-featured-posts-header'>Featured Posts</h1>
            <div className="landing-page-featured-posts">
                {featuredPosts.slice(0, 4).map((post, index)=> {
                    return (
                        <div key={post.id} className="landing-page-featured-post">
                             <div className='landing-page-featured-post-topic-container'>
                                <Link
                                 to={`/topic/${post.topic}/posts/?filter=${post.topic}`}
                                 state={{topic:post.topic, redirect:pathname}} 
                                 className='post-topic-btn'
                                >
                                    {post.topic}
                                </Link>
                                <p className='landing-page-featured-post-date-posted'>{formatDate(post.date_posted)}</p>
                            </div>
                            <h3 className='mobile-landing-page-featured-post-title'>{post.title}</h3>
                            <p className='landing-page-featured-post-content'>
                                    {post.content.substring(0, 150)}...
                            </p>
                            <Link 
                                to={`/post/${post.id}/detail/`} 
                                state={{redirect:pathname}} 
                                className='landing-page-featured-post-read-post-btn'
                            >
                                <span>Read more</span>
                                <i className="fa fa-chevron-right"></i>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LandingPageFeaturePosts