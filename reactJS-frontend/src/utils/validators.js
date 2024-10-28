
// Checks if new post form has all the values
export const validatePost = (newPost)=> {
    const keys = Object.keys(newPost)
    const reduce = keys.reduce((total, item)=>{
        const key = item !== 'image' && !newPost[item] && item
        if(key){
            return {...total,[key]:'' }
        }else {
            return total
        }
    }, {})
    return Object.keys(reduce).length  === 0 ? 'valid' : reduce
}

// Cheacks if user password ia valid
export const passwordCheck = (password) => {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const number = '0123456789'.split('')

    const upper = []
    const lower = []
    const num = []

    password.split('').forEach((i) => {
        if(upperChars.includes(i)){
            upper.push(i)
        }else if(lowerChars.includes(i)){
            lower.push(i)
        }else if(number.includes(i)){
            num.push(i)
        }
    })
    if(upper.length > 0 && lower.length > 0 && num.length > 0) {
        return true
    }
    return false
}

// Validate email 
export function checkEmail(email) {
    const pattern = /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+([A-Za-z0-9]{2,4}|museum)$/;
    return pattern.test(email)
}

// Checks if register form is valid
export const newUserInfoCheck = (newUser)=> {
    let invalid = {}
    const {username, email, password, passwordConfirmation} = newUser
    
    if(!Object.values(newUser).includes('')
        &&newUser.password===newUser.passwordConfirmation){
            return 'validated'
    }
    if(!username) {
        invalid['username'] = 'This field is required.'
    }
    if(!email) {
        invalid['email'] = 'This field is required.'
    }
    if(!password) {
        invalid['password'] = 'This field is required.'

    }
    if(!passwordConfirmation) {
        invalid['passwordConfirmation'] = 'This field is required.'

    }
    if(password !== passwordConfirmation) {
        invalid['passwordMismatch'] = 'Password confirmation failed.'
        
    }

    return invalid
}

// User login check values
export const loginInfoValidation = (user)=> {
   const {username, password} = user
   if(!username && !password) {
        return {username: 'null', password: 'null'}

   }if(!username) {
        return {username: 'null'}

   }if(!password) {
        return {password: 'null'}
   }
   return null
}