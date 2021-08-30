import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated, getToken } from '../../lib/auth';
import { api } from '../../lib/api';


class Dashboard extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            "user": null, "products": null
        }
    }

    async componentDidMount()
    {
        try
        {
            // get the products of other users
            let dashBoardData = await getDashboardData()

            // add this to state
            console.log(dashBoardData.data.dashBoardProducts)
            this.setState({user:dashBoardData.data.user,products:dashBoardData.data.dashBoardProducts})
            
        }
        catch (err)
        {
            console.log(err)
        }
    }

    render()
    {
        // redirect to login page if not authenticated
        return !isAuthenticated() ? <Redirect to='/login/' /> :
            (
                <div>
                    <h1>Dashboard</h1>
                </div>
            )
    }
}

async function getDashboardData()
{
    try
    {
        // send in the token with the request
        let dashBoardData = await api.get('/dashboard')
        return dashBoardData
    }
    catch (err)
    {
        console.log(err)
    }


}



export default Dashboard