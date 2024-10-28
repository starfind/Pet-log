

export function handleRightColumnContent(e) {
    const postDetailSideBar = document.querySelector('.right-side-bar')
    const scrolled = window.pageYOffset

    if(scrolled >= 450) {
        if(postDetailSideBar) {
            postDetailSideBar.style.top = '80px'
        }
    }else {
        if(postDetailSideBar) {
            postDetailSideBar.style.top = '0px'
        }
    }
}

export function removeDesktopTopicsAndUserLinks(e) {
    const navbarTopics = [...document.querySelectorAll('.navbar-topics')][1]
    const lgAuthenticatedUser = document.querySelector('.lg-authenticated-user')
    const lgTopicChevron = document.querySelector('.lg-topic-chevron')
    const chevronDown = document.querySelector('.lg-chevron')

    const names = e.target.classList.value.split(' ')
    
    if(names.includes('auth-user')) {
        // pass

    }else if(names.includes('topic-element')) {
        // pass

    }else {
        
        if(navbarTopics && navbarTopics.classList.contains('show-navbar-topics')) {
            navbarTopics.classList.remove('show-navbar-topics')
             lgTopicChevron.style.transform = 'rotate(0deg)'
        }
        if(lgAuthenticatedUser && lgAuthenticatedUser.classList.contains('show-lg-authenticated-user')) {
            lgAuthenticatedUser.classList.remove('show-lg-authenticated-user')
             chevronDown.style.transform = 'rotate(0deg)'
        }
    } 
}

export function handleMobileAuthenticatedUserNavLinks() {
    const chevronDown = document.querySelector('.mobile-navlinks-authenticated-user-chevron')
    const linksContainer = document.querySelector('.mobile-authenticated-user-links')
    
    linksContainer.classList.contains('show-mobile-authenticated-user-links') ?
    linksContainer.classList.remove('show-mobile-authenticated-user-links'):
    linksContainer.classList.add('show-mobile-authenticated-user-links')

    if(linksContainer.classList.contains('show-mobile-authenticated-user-links')){
        chevronDown.style.transform = 'rotate(180deg)'
    }else{
        chevronDown.style.transform = 'rotate(0deg)'
    }
}

export function handleMobileTopics() {
    const mobileTopics = document.querySelector('.mobile-topics-container > .navbar-topics')
    const mobileTopicsChevronDown = document.querySelector('.mobile-topics-chevron-down')

    mobileTopics.classList.contains('show-navbar-topics') ?
    mobileTopics.classList.remove('show-navbar-topics') :
    mobileTopics.classList.add('show-navbar-topics')

    if(mobileTopics.classList.contains('show-navbar-topics')){
        mobileTopicsChevronDown.style.transform = 'rotate(180deg)'
    }else{
        mobileTopicsChevronDown.style.transform = 'rotate(0deg)'
    }
}

export function openDesktopTopics(params) {
    const lgAuthenticatedUser = document.querySelector('.lg-authenticated-user')
    const chevronDown = document.querySelector('.lg-chevron')
    const navbarTopics = [...document.querySelectorAll('.navbar-topics')][1]
    const lgTopicChevron = document.querySelector('.lg-topic-chevron')

    lgAuthenticatedUser && lgAuthenticatedUser.classList.remove('show-lg-authenticated-user')
    navbarTopics && navbarTopics.classList.toggle('show-navbar-topics')

    if(chevronDown) {
        chevronDown.style.transform = 'rotate(0deg)'
    } 

    if(navbarTopics && navbarTopics.classList.contains('show-navbar-topics')) {
        lgTopicChevron.style.transform = 'rotate(180deg)'
    }else {
        lgTopicChevron.style.transform = 'rotate(0deg)'
    }
}

export function openDesktopUserNavLinks() {
    const navbarTopics = [...document.querySelectorAll('.navbar-topics')][1]
    const lgAuthenticatedUser = document.querySelector('.lg-authenticated-user')
    const chevronDown = document.querySelector('.lg-chevron')
    const lgTopicChevron = document.querySelector('.lg-topic-chevron')
    
    lgAuthenticatedUser.classList.toggle('show-lg-authenticated-user')
    navbarTopics && navbarTopics.classList.remove('show-navbar-topics')
    lgTopicChevron.style.transform = 'rotate(0deg)'

    if(lgAuthenticatedUser.classList.contains('show-lg-authenticated-user')){
        chevronDown.style.transform = 'rotate(180deg)'

    }else {
        chevronDown.style.transform = 'rotate(0deg)'
    }
}

export function openDesktopSearchForm() {
    const navbarTopics = [...document.querySelectorAll('.navbar-topics')][1]
    const lgAuthenticatedUser = document.querySelector('.lg-authenticated-user')
    const chevronDown = document.querySelector('.lg-chevron')
    const lgTopicChevron = document.querySelector('.lg-topic-chevron')

    if (chevronDown) {
        chevronDown.style.transform = 'rotate(0deg)'
    }else if (lgTopicChevron) {
            lgTopicChevron.style.transform = 'rotate(0deg)'
    }
    
    navbarTopics && navbarTopics.classList.remove('show-navbar-topics')
    
    lgAuthenticatedUser && lgAuthenticatedUser.classList.remove('show-lg-authenticated-user')
}