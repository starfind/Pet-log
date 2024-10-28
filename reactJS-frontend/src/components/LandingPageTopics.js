import React from 'react'
import { Link, useLocation } from 'react-router-dom'



function LandingPageTopics(props) {
    const {topics} = props
    const {pathname} = useLocation()

    return (
        <div className="landing-page-topics-container">
            <div className="landing-page-topic-header-container">
                <h1 className='landing-page-topic-header'>Read by Topics</h1>
            </div>
            <div className="landing-page-topics">
                {topics.map((topic)=> {
                    return (
                        <Link
                            key={topic.id} 
                            className="landing-page-topic"
                            to={`/topic/${topic.name}/posts/?filter=${topic.name}`}
                            state={{topic:topic.name, redirect:pathname}} 
                        >
                            <img className='landing-page-topic-image' src={topic.image_url} alt={topic.name} />
                            <div className="landing-page-topic-bg-overlay">
                                <h3 className='landing-page-topic-name'>
                                    {`${topic.name.length > 20}`?`${topic.name.substring(0, 20)}...`:`${topic.name}`}
                                </h3>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default LandingPageTopics