import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchSearchItems } from '../utils/api'
import { url } from '../utils/urls'


function SearchForm(props) {
    const searchRef = useRef()
    const navigate = useNavigate()
    const {setShowSearchForm} = props
    const [ isSearching, setIsSearching] = useState(false)


    const handleSubmit = async(e)=> {
        e.preventDefault()
        setIsSearching(true)
        const search = searchRef.current.value
        const searchURL = `${url}/api/search?q=${search}`
        const posts = await fetchSearchItems(searchURL)
        const timeoutID = setTimeout(()=> {
            setShowSearchForm(false)
            setIsSearching(false)
            e.target.reset()
            navigate(
                '/search/result/', 
                {state:posts}
            )
            clearTimeout(timeoutID)
        }, 1000)
    }

    return (
        <div className='search-form-container'>
            <form className='search-form' onSubmit={handleSubmit}>
                <input className='search-input' required ref={searchRef} type="text" placeholder='Search by title or topic'/>
                <button  className='search-submit-btn' type='submit'>
                    {isSearching 
                    ? 
                        <div style={{
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            Sear...
                            <p className='registering-animation'></p>
                        </div> 
                    : 
                        'Search'
                    }
                </button>
            </form>
        </div>
    )
}

export default SearchForm