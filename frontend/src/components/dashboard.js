import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

class Dashboard extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={}
        this.handleClickSignout=this.handleClickSignout.bind(this)
    }

    // On Mounting
    async componentDidMount(){

        // if there s a cookie then proceed to page else just go back to login
        if(Cookies.get('user'))
        {

        this.setState(prevState =>
            {
                return {...prevState,userCookie:Cookies.get('user')}
            })
        
        let userCookie=Cookies.get('user')

        // debug
        // console.log(userCookie)

        let response=await getData(userCookie)
        console.log(response)
        

        }
        else
        {
                this.props.history.replace('/')
        }
    }

    // removes the username and jwt token
    handleClickSignout()
    {
        Cookies.remove('user')
        Cookies.remove('userName')

        this.props.history.replace('/')
    }


    render()
    {

    return(
    <div>
        <div className='Debug'>
        <h1>{this.state.user}</h1>
        <button onClick={this.handleClickSignout}>Signout</button>
        </div>
    </div>
    )

    }
}

async function getData(token)
{
    try
    {

    
    

    let response=await axios.get(`http://127.0.1.1:5000/dashboard`,{headers:{"Authorization":token}})
    console.log(response)
    

    }
    catch(err)
    {
        console.log(err)
        return err
    }
}


export default Dashboard