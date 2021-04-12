
import React from 'react';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
// import { fetchUsers } from '../../actions';
import { connect } from "react-redux";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      search: "",
    };
  }

  componentDidMount() {
    console.log("PROPS", this.props)
    // fetch('https://reqres.in/api/users?page=2')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("data", data);
    //     this.setState({ users: data.data })
    //   });
    this.props.fetchUsers(this.props.store.page);

  }

  handleDelete = (id) => {
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`https://reqres.in/api/users/${id}`, requestOptions).then((response) => {
      return response.json();
    }).then((result) => {
      console.log("result delete", result)
    });
  }

  test = () => {
    this.props.fetchUsers(this.props.store.page);
  }

  searchUser = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    const users = this.props.store.users;
    console.log("FINAL USER", users);
    const usersLists = (
      <table>
        <tr>
          <th>ID</th>
          <th>First name</th>
          <th>Last Nam</th>
          <th>email</th>
        </tr>
        {(users || []).filter((val)=> {
          console.log("val", val.first_name.toLowerCase());
          if(this.state.search == ""){
            return val;
          }
          else if (val.first_name.toLowerCase().includes(this.state.search.toLowerCase())){
            return val;
          }
          else if (val.last_name.toLowerCase().includes(this.state.search.toLowerCase())){
            return val;
          }
          else if (val.email.toLowerCase().includes(this.state.search.toLowerCase())){
            return val;
          }
        }).map((user) =>
          <tr>
            <th>{user.id}</th>
            <th>{user.first_name}</th>
            <th>{user.last_name}</th>
            <th>{user.email}</th>
            <th><Link to={`/edit/${user.id}`}>EDIT</Link></th>
            <th><button onClick={() => this.handleDelete(user.id)}>DELETE</button></th>
          </tr>
        )}
      </table>
    )
    console.log(this.state)
    console.log(this.state.users.length)
    console.log("final props",this.props)
    // if (this.state.users.length > 0)
    //   console.log("assaas", this.usersList)
    return (
      <div>
        <div>
          <Link to="/create">Create user</Link>
        </div>
        <input type="text" placeholder="Search" onChange={(event) => this.searchUser(event)}></input>
        {(users || []).length > 0 ?
          usersLists
          :
          <div>Loading users</div>}
          <button onClick={this.test}>Load More</button>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return { store }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  async function fetchUsers(pageNO) {
    console.log("WOKRINg", ownProps)
    await fetch(`https://reqres.in/api/users?page=${pageNO}`)
      .then(response => response.json())
      .then(data => {
        console.log("data", data);
        // this.setState({ users: data.data })
        dispatch({
          type: "SET_USERS",
          payload: data.data
        })
      });
  }

  return { fetchUsers }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);