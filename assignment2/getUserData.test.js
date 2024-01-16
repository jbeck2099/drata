import getUserData from './getUserData'
import userData from './data/userData.json'

describe('Test info for list of accounts', () => {
    for (const user of userData){
        const response = getUserData(user.username);
        
        test(`Test userid for user '${user.username}'`, () => {
            expect(response.id).toBe(user.userId);
        })

        test(`Test plan for user '${user.username}'`, () => {
            expect(response.plan.name).toBe(user.planName);
        })

        test(`Test url for user '${user.username}'`, () => {
            expect(response.url).toBe(user.url);
        })
    }
})

