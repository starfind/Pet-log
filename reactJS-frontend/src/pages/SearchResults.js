import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'
import LatestPostsSidebar from '../components/LatestPostsSidebar'
import TopPostsSidebar from '../components/TopPostsSidebar'
import LoadingPage from './LoadingPage'
import { handleRightColumnContent } from '../utils/handleEvents'


function SearchResults() {
    const [posts, setPosts] = useState(null)
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const {state, pathname} = useLocation()


    useEffect(()=> {
        document.title = 'Search Result'
        
        if(state) {
            setIsError(null)
            setPosts(null)

            if (state.error) {
                setIsError(state)
            }else {
                setPosts(state)
            }
        }

        setIsLoading(false)
    }, [state])

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

    return (
        <>
            <div className="bg-img">
                <div className="bg-img-header-container">
                    <div className="bg-img-contents">
                        <h1 className='bg-img-header'>Search Result</h1>
                        <div className='bg-img-text'>
                           {!posts 
                           ? 
                            <div style={{display:'grid',alignContent:'start',gap:'0.3rem',marginTop:'0.5rem'}}>
                                <span>Query: {isError.query}</span>
                                <span>Result: 0 post</span>
                            </div>
                           : 
                            posts.data.length > 1 
                            ? 
                            <div style={{display:'grid',alignContent:'start',gap:'0.3rem',marginTop:'0.5rem'}}>
                                <span>Query: {posts.query}</span>
                                <span>Result: {posts.data.length} posts</span>
                            </div>
                            :
                            <div style={{display:'grid',alignContent:'start',gap:'0.3rem',marginTop:'0.5rem'}}>
                                <span>Query: {posts.query}</span>
                                <span>Result: {posts.data.length} post</span>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="post-container">
                <div className="post-container__posts">
                    { isError && isError.error ?
                        <h3 className='post-search-no-result'>{ isError.error }</h3>
                    :
                        posts && posts.data.map((post)=> {
                            return (
                                <div key={post.id} className="my-posts-container__post">
                                    <div className="my-posts-container__post-image-container">
                                        <img className='my-posts-container__post-image' src={post.image_url} alt={post.title} /> 
                                        <div className='landing-page-post-image-background-overlay'></div> 
                                    </div>
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
                                    <h3 className='my-posts-container__post-title'>{post.title}</h3>
                                    <p className='my-posts-container__post-content'>{post.content.substring(0, 150)}...</p>
                                    <Link 
                                        className='landing-page-post-read-more-btn'
                                        to={`/post/${post.id}/detail/`}
                                        state={{redirect:pathname}} 
                                    >
                                        <span>Read more</span>
                                        <i className="fa fa-chevron-right"></i>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='right-side-bar'>
                    <TopPostsSidebar />
                    <LatestPostsSidebar />
                </div>
            </div>
        </>
    )
}

export default SearchResults