import { NavLink } from "react-router-dom"
import { useEffect, useState } from 'react'

function NavbarTopics(props) {
    const { topics, setShowNavLinks, setShowCloseBtn, setShowMenuBtn} = props

    return (
        <div className='navbar-topics lg-navbar-topics topic-element'>
            {topics && topics.map((topic, index)=> {
                return (
                    <NavLink 
                        key={topic.id}
                        onClick={()=> {
                            setShowCloseBtn && setShowCloseBtn(false)
                            setShowMenuBtn && setShowMenuBtn(true)
                            setShowNavLinks && setShowNavLinks(false)
                        }}
                        className={({isActive})=>isActive?'active-navbar-topic-link navbar-topic-link topic-element':'navbar-topic-link topic-element'}
                        to={`/topic/${topic.name}/posts/?filter=${topic.name}`} state={{topic:topic.name}}
                    >
                        {topic.name}
                    </NavLink>
                )
            })}
        </div>
    )
}

export default NavbarTopics