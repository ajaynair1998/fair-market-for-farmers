const {genPassword,issueJwt,validPassword} =require( './utils')
const mongoDbClass = require('../../dbActions/index')
const mongoDbOperations=new mongoDbClass()

async function login(userName,password)
{
    // final jsonobject to return
    let finalResponse

    // check if username entry exists in db
    let userExists=await mongoDbOperations.checkIfUserExists(userName)

    // if the user is there in in db
    if(userExists)
    {   
        let userObject=await mongoDbOperations.checkIfUserExistsAndReturnThem(userName)

        // now check if the entered password is correct
        let passwordIsCorrect=validPassword(password,userObject.hash,userObject.salt)

        // if password is correct return success status and the jwt token to frontend
        if(passwordIsCorrect)
        {
            let token = await issueJwt(userObject)

            finalResponse={success:true,token:token}
            
        }
        // Password is incorrect
        else
        {

            finalResponse={success:false,content:'Password Incorrect'}

        }
    }
    // No User Exists
    else
    {
        finalResponse={Success:false,content:"No User Found"}
    }

    return finalResponse
}

module.exports=login