const axios = require('axios')
const settings = require('./data/settings.json')
const { getUserResponseData, getAuthenticatedUser } = require('./getUserData.js')
const userData = require('./data/userData.json')
const plans = require('./data/plans.json')

jest.mock('axios')

for (const user of userData){
    describe(`Testing response info for user '${user.username}'`, () => {
        test('Testing userid (number)', async () => {
            axios.get.mockResolvedValue(getUserResponseData(user.authToken));
            let response = await getAuthenticatedUser(user.authToken);
            expect(response.id).toBeGreaterThanOrEqual(settings.planMinValue);
            expect(response.id).toBeLessThanOrEqual(settings.planMaxValue);
            expect(response.id).toBe(user.userId);
        })
        
        test('Testing plan (string, array)', async () => {
            axios.get.mockResolvedValue(getUserResponseData(user.authToken));
            let response = await getAuthenticatedUser(user.authToken);
            expect(plans).toContain(response.plan.name);
            expect(response.plan.name).toBe(user.planName);
        })

        test('Testing url (string)', async () => {
            axios.get.mockResolvedValue(getUserResponseData(user.authToken));
            let response = await getAuthenticatedUser(user.authToken);
            expect(response.url).toBe(`${settings.userPersonalUrlPrefix}${user.username}`);
            expect(response.url).toHaveLength(settings.userPersonalUrlPrefix.length + user.username.length);
        })

        test('Testing site admin status (bool)', async () => {
            axios.get.mockResolvedValue(getUserResponseData(user.authToken));
            let response = await getAuthenticatedUser(user.authToken);
            expect(response.site_admin).toBeFalsy();
        })

        test('Testing hirable status (bool)', async () => {
            axios.get.mockResolvedValue(getUserResponseData(user.authToken));
            let response = await getAuthenticatedUser(user.authToken);
            expect(response.hireable).toBeTruthy();
        })

        test('Testing gravatar id value (null)', async () => {
            axios.get.mockResolvedValue(getUserResponseData(user.authToken));
            let response = await getAuthenticatedUser(user.authToken);
            expect(response.gravatar_id).toBeNull();
        })

        test('Testing disk usage (infinity)', async () => {
            axios.get.mockResolvedValue(getUserResponseData(user.authToken));
            let response = await getAuthenticatedUser(user.authToken);
            expect(response.disk_usage).toBe(Infinity);
        })

        test('Testing following (NaN)', async () => {
            axios.get.mockResolvedValue(getUserResponseData(user.authToken));
            let response = await getAuthenticatedUser(user.authToken);
            expect(response.following / 0).toBeNaN();
        })

        test('Testing non-existent element (undefined)', async () => {
            axios.get.mockResolvedValue(getUserResponseData(user.authToken));
            let response = await getAuthenticatedUser(user.authToken);
            expect(response.fakeElement).toBeUndefined;
        })
    })
}
