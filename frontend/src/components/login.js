import React,{Component} from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'






class Login extends Component{
    constructor(props)
    {
        super(props)
        this.state={}
        this.credentialsOnChange=this.credentialsOnChange.bind(this)
        this.handleClickLogin=this.handleClickLogin.bind(this)
    }

    // to store the username and password on typing
    credentialsOnChange(event)
    {
        let username
        let password
        if(event.target.id === 'username')
        {
            username=event.target.value
           
            this.setState(prevState => 
            {
                return {...prevState,username:username}
            })

        }
        if(event.target.id ==='password')
        {
            password=event.target.value
            this.setState(prevState => 
            {
                return {...prevState,password:password}
            })
        }

        
    }

    // onclicking login button
    async handleClickLogin(event)
    {
        // prevent form from posting
        event.preventDefault()

        // debug
        console.log(this.state)

        // post the username and password and get authentication
        let response=await authentication(this.state.username,this.state.password)
        
        // debug
        console.log(response)

        // redirect and set cookie
        let redirect=await redirectToProtectedIfAuthenticated(response,this.state.username)

        let user=redirect ? this.props.history.replace('/dashboard') : false

    }

    render()
    {
        return(
            <div className='loginPageMain'>
                <div className='mainContainer'>
                    <form action='http://192.168.1.5:5000/loginPost' method='POST'>
                        <input name='username' id='username' onChange={this.credentialsOnChange}></input>
                        <input name='password' id='password' onChange={this.credentialsOnChange}></input>
                        <button onClick={this.handleClickLogin}>Login</button>
                    </form>
                    
                </div>
            </div>
        )
    }
}

async function authentication(username,password)
{
    try
    {
        let response = await axios.post(`http://192.168.1.5:5000/loginPost`,{username:username,password:password},{'content-type':'application/json'})
        return response
    }
    catch(err)
    {
        console.log(err)
    }
}

async function redirectToProtectedIfAuthenticated(responseObject,username)
{
    // if authenticated successfully
    // save the token as cookie and then redirect to dashboard page
    if(responseObject.data.authorisation)
    {
        setCookieUser(responseObject.data.authorisation.token,username)
        console.log(responseObject.data)
        return true


    }
    else
    {
        console.log(responseObject.content)
        return false
    }

}

function setCookieUser(token,username)
{
    

    let expires=new Date()
    expires.setTime(expires.getTime() + (expires.minutes*60*24))

    Cookie.set('user',token,{path:'/',expires})
    Cookie.set('userName',username,{path:'/',expires})
}





export default Login