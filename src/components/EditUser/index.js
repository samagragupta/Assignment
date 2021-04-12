
import React from 'react';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            job: ""
        };
        console.log("props", this.props)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        if(this.state.name && this.state.job){
            let params = this.props.match.params.id
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: this.state.name, job: this.state.job })
            };
            fetch(`https://reqres.in/api/users/${params}`, requestOptions)
                .then(response => response.json())
                .then(data => console.log("HERE--",data));
        }
    }


    render() {
        return (
            <div>
                EDIT USERS
                <label>
                    <p>Name</p>
                    <input type="text" name="name" onChange={e => this.handleChange(e)} />
                </label>
                <label>
                    <p>Job</p>
                    <input type="text" name="job" onChange={e => this.handleChange(e)} />
                </label>
                <button onClick={this.handleSubmit}>Edit user</button>
            </div>
        )
    }
}

export default EditUser;