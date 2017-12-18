import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({ auth }) => (
  <div>
    <Link to="/">App</Link>
    <div>
      <Link to="/users">Users</Link>
      <Link to="/admins">Admins</Link>
      {
        auth ? (
          <a href="/api/logout">Logout</a>
        ) : (
          <a href="/api/auth/google">Login</a>
        )
      }
    </div>
  </div>
);

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(Header);
