import React, { useContext, useEffect } from 'react'
import { Outlet, useLocation, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { ContentLayoutContext } from '../layouts/ContentLayout'


function UserDashboard() {
    const { isAuthenticated} = useContext(ContentLayoutContext)
    const { pathname, state } = useLocation()
    const navigate = useNavigate()


    useEffect(()=> {
        document.title = 'Dashboard'
    }, [])

    if (!isAuthenticated) {
        return (
            <Navigate to='/login' state={{error:'You are not logged in.'}}/>
        )
    }
  
    return (
        <div className='dashboard-container'>
            <div className='dashboard'>
                <div className="dashboard-user-container">
                    <img className='dashboard-user-img' src={isAuthenticated && isAuthenticated.image_url} alt="" />
                    <div className="dashboard-user-info">
                        <p>{isAuthenticated.username}</p>
                        <p>{isAuthenticated.email}</p>
                        <div className='dashboard-following-follower'>
                            {isAuthenticated.follow.length > 1 ?
                                <p>Following {isAuthenticated.follow.length} users</p>
                            :
                                <p>Following {isAuthenticated.follow.length} user</p>
                            }
                            <div className='dashboard-divider'></div>
                            {isAuthenticated.follower.length > 1 ?
                                <p>{isAuthenticated.follower.length} followers</p>
                            :
                                <p>{isAuthenticated.follower.length} follower</p>
                            }
                        </div>
                        <div className='dashboard-post-comment-count'>
                            {isAuthenticated.qs_count.comment_count > 1 ?
                                <p>{isAuthenticated.qs_count.comment_count} comments</p>
                            :
                                <p>{isAuthenticated.qs_count.comment_count} comment</p>
                            }
                            <div className='dashboard-divider'></div>
                            {isAuthenticated.qs_count.post_count > 1 ? 
                                <p>{isAuthenticated.qs_count.post_count} posts</p>
                            :
                                <p>{isAuthenticated.qs_count.post_count} post</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="dashboard-links">
                    <NavLink
                        to='.' 
                        end={true} 
                        className={({isActive})=> isActive?'active-dashboar-link dashboard-link':'dashboard-link'}
                        state={{name:'Posts'}}
                    >
                        Posts
                    </NavLink>
                    <NavLink
                        to='comments' 
                        className={({isActive})=> isActive?'active-dashboar-link dashboard-link':'dashboard-link'}
                        state={{name:'Comments'}}
                    >
                        Comments
                    </NavLink>
                    <NavLink
                        to='profile' 
                        className={({isActive})=> isActive?'active-dashboar-link dashboard-link':'dashboard-link'}
                        state={{name:'Profile'}}
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to='contact' 
                        className={({isActive})=> isActive?'active-dashboar-link dashboard-link':'dashboard-link'}
                        state={{name:'Contact'}}
                    >
                        Contact
                    </NavLink>
                </div>
                <h2 className='dashboard-content-header'>{!state || state && !state.name ? 'Posts':state.name }</h2>
                <div className="dashboard-contents">
                    {isAuthenticated && 
                        <Outlet />
                    }
                </div>
            </div>
        </div>
    )
}

export default UserDashboard