import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'
import { ContentLayoutContext } from '../layouts/ContentLayout'


function TopPostsSidebar() {
    const { posts } = useContext(ContentLayoutContext)
    const [ postObjs, setPostObjs] = useState(null)
    const { pathname } = useLocation()
   
    useEffect(()=> {
        const sortedPosts = posts && posts.slice(0, 3)
        .sort((a, b)=>new Date(b.date_posted)-new Date(a.date_posted))

        setPostObjs(sortedPosts)
    }, [posts])
   
    return (
        <div className="right-side-bar-container">
            <h2 className='right-side-bar-header'>Top Posts</h2>
            <div className="side-bar-latest-posts-container">
                {postObjs && postObjs.map((post)=> {
                    return (
                        <div key={post.id} className="side-bar-latest-post">
                            <Link 
                                to={`/topic/${post.topic}/posts/?filter=${post.topic}`}
                                state={{topic:post.topic, redirect:pathname}} 
                                className='post-topic-btn'
                                style={{justifySelf:'start'}}
                            >
                                {post.topic}
                            </Link>
                            <h4 
                                className='right-sidebar-post-title'
                            >
                                {post.title}
                            </h4>
                            <p className='right-sidebar-post-content'>{post.content.substring(0, 60)}...</p>
                            <Link 
                                to={`/post/${post.id}/detail/`} 
                                state={{redirect:pathname}} 
                                className='landing-page-featured-post-read-post-btn'
                                style={{fontSize:'0.85rem'}}
                            >
                                <span>Read more</span>
                                <i className="fa fa-chevron-right" style={{fontSize:'0.9rem'}}></i>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TopPostsSidebar