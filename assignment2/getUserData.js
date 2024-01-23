const axios = require('axios')
const userData = require('./data/userData.json')
const responseData = require('./data/responseData.json')
const settings = require('./data/settings.json')

let getUserResponseData = (authToken) => {    
    for (let i = 0; i < userData.length; i++){
        if (userData[i]["authToken"] == authToken){
            for (let j = 0; j < responseData.length; j++){
                if (responseData[j]["login"] == userData[i]["username"]){
                    return responseData[j];
                }
            }
        }
    }
}

let getAuthenticatedUser = async (authToken) => {
    return await axios.get(settings.getAuthenticatedUserUrl, {'headers': {'Authorization': `Bearer ${authToken}`}});
}

module.exports = { getAuthenticatedUser, getUserResponseData };
