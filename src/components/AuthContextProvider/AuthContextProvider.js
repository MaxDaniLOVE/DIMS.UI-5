import React, { Component } from 'react';
import AuthContext from '../../context';
import Authentication from '../../services/Authentication';

const auth = new Authentication();

class AuthContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }

  componentDidMount() {
    this.onStatusChanged();
  }

  onStatusChanged = async () => {
    const userStatus = await auth.onStatusChanged();
    const { isLoggedIn, role, email, userId, userName } = userStatus;
    let user = isLoggedIn ? { role, email } : {};
    if (role === 'USER') {
      user = { ...user, userId, userName };
    }
    this.setState({ isLoggedIn, user });
    return { isLoggedIn, user };
  };

  onLogIn = async (authData) => {
    await auth.login(authData);
    const user = await this.onStatusChanged();
    return user;
  };

  onLogOut = async () => {
    await auth.logout();
    await this.onStatusChanged();
  };

  onRegister = async (authData) => {
    await auth.registerNewUser(authData);
    const user = await this.onStatusChanged();
    return user;
  };

  render() {
    const { context, children } = this.props;
    const { isLoggedIn, user } = this.state;
    const defaultContextValue = {
      isLoggedIn,
      user,
      onLogIn: this.onLogIn,
      onLogOut: this.onLogOut,
      onRegister: this.onRegister,
    };

    return <AuthContext.Provider value={{ ...defaultContextValue, ...context }}>{children}</AuthContext.Provider>;
  }
}

export default AuthContextProvider;
