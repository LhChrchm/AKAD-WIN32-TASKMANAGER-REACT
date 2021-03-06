import React, { Component } from 'react';
import Axios from 'axios';
import '../../styles/Home.css'
import consts from '../../consts'
const CREATE_ROUTE = consts.CREATE_ROUTE

class SignUp extends Component {
    constructor() {
        super()
        this.state = {
            newUser: {
                username: "",
                taken: true,
                password: "",
                tasks: [],
            },
        }
    }

    verifyForm = event => {
        event.preventDefault()
        let newUser = { ...this.state.newUser }
        if (this.state.newUser.taken) {
            return alert("Choose another username!")
        }
        if (newUser.password && newUser.username) {
            this.signUp()
        } else {
            return alert("Please fill out the entire form.")
        }

    }

    handleUsername = async event => {
        let newUser = { ...this.state.newUser }
        newUser.username = event.target.value
        if (event.target.value) {
            let response = await Axios.get(CREATE_ROUTE(`user/${event.target.value}`))
            if (response.data) {
                newUser.taken = true
            } else {
                newUser.taken = false
            }
        }
        this.setState({ newUser })
    }

    handleChange = event => {
        let newUser = { ...this.state.newUser }
        let name = event.target.name
        let value = event.target.value
        newUser[name] = value
        this.setState({ newUser: newUser })
    }

    signUp = () => {
        let userData = { ...this.state.newUser }
        Axios.post(CREATE_ROUTE("user"), userData).then(() => {
            alert("Yey! You're now an user!")
            this.props.showLogIn()
        })
    }

    render() {
        return (
            <form onSubmit={this.verifyForm}>
                <div className="formGrid">
                    <label className="formGrid">
                        {this.state.newUser.username ?
                            this.state.newUser.taken ?
                                <div className="takenUsername">{this.state.newUser.username} is taken</div>
                                : <div className="freeUsername">{this.state.newUser.username} is free</div>
                            : <div>Choose your username:</div>}
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            onChange={this.handleUsername} />


                    </label>
                    <label className="formGrid">
                        <div>Choose your password:</div>
                        <input
                            type="password"
                            name="password"
                            palceholder="password"
                            onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}

export default SignUp;