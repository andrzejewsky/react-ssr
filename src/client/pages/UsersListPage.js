import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from './../actions';
import { Helmet } from 'react-helmet';

class UsersList extends Component {
  
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return <div>
      <Helmet>
        <title>Users list</title>
        <meta property="og:title" content="users list"/>
      </Helmet>
      Users list:
      <ul>
        {
          this.props.users.map(user => <li key={user.id}>{user.name}</li>)
        }
      </ul>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const loadData = (store) => store.dispatch(fetchUsers());

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
