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
    componentDidMount(){

        // if there s a cookie then proceed to page else just go back to login
        if(Cookies.get('user'))
        {

        this.setState(prevState =>
            {
                return {...prevState,userCookie:Cookies.get('user')}
            })
        
        

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

export default Dashboard