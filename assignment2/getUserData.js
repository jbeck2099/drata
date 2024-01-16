import userData from './data/userData.json'

export function getUserData(username){
    return userData.filter(user => {
        user.username === username
    })
}