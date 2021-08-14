import React,{Component} from 'react'

class Register extends Component{
    constructor()
    {
        super()
        this.state={}
    }

    render()
    {
        return(
            <div className='loginPageMain'>
                <div className='mainContainer'>
                    <form action='http://192.168.1.5:5000/registerPost' method='POST'>
                        <input name='username' id='username' ></input>
                        <input name='password' id='password'></input>
                        <button>Send my greetings</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register