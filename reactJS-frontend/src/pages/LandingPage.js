import React, { useState, useEffect, useContext } from 'react'
import { Link, Navigate} from 'react-router-dom'
import { getPostData, getTopicData} from '../utils/api'
import { url } from '../utils/urls'
import LandingPageTopics from '../components/LandingPageTopics'
import LandingPagePosts from '../components/LandingPagePosts'
import LandingPageFeaturePosts from '../components/LandingPageFeaturePosts'
import LandingPageEmailSub from '../components/LandingPageEmailSub'
import LoadingPage from './LoadingPage'
import { ContentLayoutContext } from '../layouts/ContentLayout'
import TopPostsSidebar from '../components/TopPostsSidebar'
import LatestPostsSidebar from '../components/LatestPostsSidebar'
import { handleRightColumnContent } from '../utils/handleEvents'


function LandingPage() {
    const [featuredPosts, setFeaturedPosts] = useState(null)
    const [topics, setTopics] = useState(null)
    const [latesPosts, setLatestPosts] = useState(null)
    const [isError, setIsError] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const {isAuthenticated} = useContext(ContentLayoutContext)

    useEffect(()=> {
        const getPosts = async()=> {
            const data = await getPostData(`${url}/api/posts/`)
            if(data.error) {
                setIsError(data.error)
            }
            else {
                const latesPost = data.filter((post)=>!post.featured).sort((a, b)=> {
                    return new Date(b.date_posted) - new Date(a.date_posted)
                })
                const featuredPosts = data.filter((post)=>post.featured)
                setLatestPosts(latesPost.slice(0,6))
                setFeaturedPosts(featuredPosts.slice(0,6))
                setIsLoading(false)
            }
        }
        getPosts()
    }, [])

    useEffect(()=> {
        document.title = 'Canine Blog'
        const getTopics = async()=> {
            const data = await getTopicData(`${url}/api/topics`)
            if(data.error){
                setIsError(data.error)
            }
            setTopics(data)
            setIsLoading(false)
        }
        getTopics()
    }, [])

    useEffect(()=> {
        window.addEventListener('scroll',handleRightColumnContent)
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

            <div className='mobile-landing-page-hero-wrapper'>
                <div className="mobile-landing-page-hero-text-wrapper">
                    <h1 className='mobile-landing-page-hero-header'>We are Canine Blog Site</h1>
                    <p className='mobile-landing-page-hero-paragraph'>
                        Request suggestions and share your experience and 
                        expertise on various canines's health issues.
                    </p>
                    <Link to={!isAuthenticated ? '/register':'/posts'} className='mobile-landing-page-join-btn'>{isAuthenticated?'Explore':'Join now'}</Link>
                </div>
            </div>
            <div className='lg-landing-page-hero-wrapper'>
                <div className="landing-page-hero-container">
                    <div className="landing-page-hero-text-wrapper">
                        <h1 className='landing-page-hero-header'>We are Canine Blog Site</h1>
                        <p className='landing-page-hero-paragraph'>
                            Request suggestions and share your experience 
                            and expertise on various canines's health issues.
                        </p>
                        <Link to={!isAuthenticated ? '/register':'/posts'} className='landing-page-join-btn'>{isAuthenticated?'Explore':'Join now'}</Link>
                    </div>
                </div>
            </div>
            <div className='landing-page-content-container'>
                <div className='landing-page-contents'>
                    {topics && <LandingPageTopics topics={topics}/>}
                    {featuredPosts && <LandingPageFeaturePosts featuredPosts={featuredPosts} />} 
                    {latesPosts && <LandingPagePosts latesPosts={latesPosts} />}
                    <LandingPageEmailSub />
                </div>
                <div className='right-side-bar'>
                    <TopPostsSidebar />
                    <LatestPostsSidebar />
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default LandingPage