
export function formatDate(created) {
    const date = new Date(created)
    const day = date.toDateString()
    const time = date.toLocaleTimeString({}, {hour:'2-digit', minute:'2-digit'})
    return `${day} ${time}`
}