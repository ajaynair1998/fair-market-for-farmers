const { genPassword, issueJwt, validPassword } = require('./utils')
const mongoDbClass = require('../../dbActions/index')
const mongoDbOperations = new mongoDbClass()


// Tries to register the user , if the user exists already it will return false
// if the operation is successful it will return the token and true
async function register(userName, password)
{
    try
    {
        let finalResponse

        const saltHash = genPassword(password)
        const salt = saltHash.salt
        const hash = saltHash.hash

        let userExists = await mongoDbOperations.checkIfUserExists(userName)

        if (userExists)
        {
            finalResponse = { success: false, content: 'User Exists Already' }
            return finalResponse
        }
        else
        {
            let userObject = mongoDbOperations.addUser(userName, salt, hash)

            // if successfull we have to return the jwt token to the frontend and return the message
            // that the operation has completed successfully

            let token = await issueJwt(userObject)

            finalResponse = { success: true, token: token }

            return finalResponse

        }



    }
    catch (err)
    {
        console.log(err)
    }

}

module.exports = register