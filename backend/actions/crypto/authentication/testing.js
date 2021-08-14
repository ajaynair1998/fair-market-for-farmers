const {genPassword,issueJwt,validPassword} =require( './utils')
const mongoDbClass = require('../../dbActions/index')
const mongoDbOperations=new mongoDbClass()


// adds a user if he doesnt exist
async function checkAdd(user,password)
{
    try
    {

    let usersArray
    let userExistsOrNot

    // check if user exists
    usersArray = await mongoDbOperations.checkIfUserExists(user)
    
    
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
            
            await mongoDbOperations.addUser(user,temp.salt,temp.hash)

            console.log('done')
    }
    else
    {
        // the user already exist so login
        console.log('Use the login function')
    }
   
    }
    catch(err)
    {
        console.log(err)
    }
}

checkAdd('ajaynair','password')