import React, { Component } from 'react';
import Axios from 'axios';

class TaskInput extends Component {
    constructor() {
        super()
        this.state = {
            task: {
                important: false,
                done: false,
                text: "",
                date: "",
                user: {},
            }
        }
    }

    handleChange = event => {
        let task = { ...this.state.task }
        task[event.target.name] = event.target.value
        this.setState({ task })
    }

    saveTask = () => {
        debugger
        let data = { ...this.state.task }
        data.date = new Date()
        data.user = this.props.login.user
        Axios.put(`http://localhost:4000/saved/${this.props.login.user.username}`, data)
        let task = {
            important: false,
            done: false,
            text: "",
            date: "",
            user: {},
        }
        this.setState({ task })
    }
    render() {
        return (
            <div>
                <input
                    type="text"
                    name="text"
                    placeholder="What do you need to do ?"
                    onChange={this.handleChange} />
                <button onClick={this.saveTask}>Add</button>
            </div>
        );
    }
}

export default TaskInput;