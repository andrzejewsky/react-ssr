import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from './../actions';
import withRequiredAuth from './../components/hocs/withRequiredAuth';

class AdminsList extends Component {
  
  componentDidMount() {
    this.props.fetchAdmins();
  }

  render() {
    return <div>
      Admins list:
      <ul>
        {
          this.props.admins.map(admin => <li key={admin.id}>{admin.name}</li>)
        }
      </ul>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  admins: state.admins,
});

const loadData = (store) => store.dispatch(fetchAdmins());

export default {
  loadData,
  component: connect(mapStateToProps, { fetchAdmins })(withRequiredAuth(AdminsList))
};
