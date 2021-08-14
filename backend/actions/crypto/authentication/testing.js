const {genPassword,issueJwt,validPassword} =require( './utils')
const mongoDbClass = require('../../dbActions/index')
const mongoDbOperations=new mongoDbClass()


// adds a user if he doesnt exist and returns the user object even if he exists or if newly added
async function checkAdd(user,password)
{
    try
    {

    let usersArray
    let userExistsOrNot

    // check if user exists
    usersArray = await mongoDbOperations.checkIfUserExistsAndReturnThem(user)
    
    
    if(usersArray.length > 0)
    {
        userExistsOrNot =true
    }
    else
    {
        userExistsOrNot=false
    }


    // we will add the new user to our db only if the user doesnt exist
    if(userExistsOrNot === false)
    {
        //  if user doesnt exist
            let temp=genPassword(password)
            
            let currentUser=await mongoDbOperations.addUser(user,temp.salt,temp.hash)

            console.log(currentUser)

            // return the userObject for making jwt

    }
    else
    {
        // the user already exist so login
        console.log('Use the login function',usersArray[0])
        
        // return the userObject
        return usersArray[0]
        
    }
   
    }
    catch(err)
    {
        console.log(err)
    }
}



async function issueJWTAndShow(name,password)
{
    let userObject=await checkAdd(name,password)
    let JWTtoken=await issueJwt(userObject)

    console.log(JWTtoken)
    return JWTtoken
}





issueJWTAndShow('ajaynew','hello')