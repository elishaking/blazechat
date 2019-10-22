import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signinUser, signupUser } from '../../redux_actions/authActions';
import Spinner from '../Spinner';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      method: "POST",
      navLogo: "logo.svg",

      signinEmail: '',
      signinPassword: '',

      signupEmail: '',
      signupPassword: '',
      firstName: '',
      lastName: '',
      gender: '',

      loadingSignin: false,
      loadingSignup: false
    };
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);

    // if user is already authenticated, redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  // after redux store is updated, this life cycle method will be called
  componentWillReceiveProps(nextProps) {
    this.redirectIfAuthenticated(this.props.auth.isAuthenticated);

    if (nextProps.auth.errors) {
      this.setState({
        errors: nextProps.auth.errors,
        loadingSignin: false,
        loadingSignup: false
      });
    }
  }

  /** @param {boolean} isAuthenticated */
  redirectIfAuthenticated = (isAuthenticated) => {
    // redirect authenticated user to home-page
    if (isAuthenticated) {
      this.props.history.push('/home');
    }
  }

  resize = () => {
    const newMethod = document.body.clientWidth > 1550 ? "POST" : "GET";
    if (this.state.method !== newMethod) {
      this.setState({
        method: newMethod
      });
    }

    const newLogo = document.body.clientWidth > 1000 ? "logo.svg" : "logo-pri.svg";
    if (this.state.navLogo !== newLogo) {
      this.setState({
        navLogo: newLogo
      });
    }
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmitSignin = (event) => {
    event.preventDefault();

    this.setState({ loadingSignin: true });

    if (this.state.method === "POST") {
      const userData = {
        email: this.state.signinEmail,
        password: this.state.signinPassword
      };
      this.props.signinUser(userData);
    } else {
      this.props.history.push('/signin');
    }
  }

  onSubmitSignup = (event) => {
    event.preventDefault();

    this.setState({ loadingSignup: true });

    const userData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gender: this.state.gender,
      email: this.state.signupEmail,
      password: this.state.signupPassword
    };
    this.props.signupUser(userData, this.props.history);
  }

  render() {
    return (
      <div className="container landing-bg">
        <header>
          <nav>
            <h1>
              <img src={`./assets/img/${this.state.navLogo}`} alt="Logo" srcSet="" /> <span>BlazeChat</span>
            </h1>

            <div className="nav-right">
              <form id="signin-form" method={this.state.method} onSubmit={this.onSubmitSignin}>
                <div className="signin-input">
                  <input type="email" name="signinEmail" placeholder="email" className="text-input" onChange={this.onChange} />
                  <input type="password" name="signinPassword" placeholder="password" className="text-input" onChange={this.onChange} />
                </div>
                {
                  this.state.loadingSignin ? (<Spinner full={false} />) : (<input type="submit" value="Sign In" className="btn-input" />)
                }
              </form>
            </div>
          </nav>
        </header>

        <div className="content">
          <div className="left">
            <div className="inner">
              <div className="info">
                <ul>
                  <li>
                    <img src="./assets/img/connect.svg" alt="Connection" srcSet="" />
                    <h2>Connect With Friends</h2>
                  </li>
                  <li>
                    <img src="./assets/img/converse.svg" alt="Conversation" srcSet="" />
                    <h2>Chat, Share Photos, Videos and more</h2>
                  </li>
                  <li>
                    <img src="./assets/img/commune.svg" alt="Community" srcSet="" />
                    <h2>Be a part of a growing community</h2>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="inner">
              <div className="welcome">
                <img src="./assets/img/logo-pri.svg" alt="Logo" srcSet="" />
                <h1>Join BlazeChat Today</h1>
              </div>

              <form onSubmit={this.onSubmitSignup}>
                <div>
                  <div className="name">
                    <input type="text" name="firstName" id="firstName" placeholder="first name" onChange={this.onChange} />
                    <input type="text" name="lastName" placeholder="last name" onChange={this.onChange} />
                  </div>
                  <input type="email" name="signupEmail" placeholder="email" className="fill-parent" onChange={this.onChange} />
                  <input type="password" name="signupPassword" id="password" placeholder="password" className="fill-parent" onChange={this.onChange} />
                  <select name="gender" id="gender" className="fill-parent" onChange={this.onChange}>
                    <option hidden disabled selected value="other">gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {
                  this.state.loadingSignup ? (<Spinner full={false} />) : (<input type="submit" value="Sign Up" className="btn-input btn-pri" />)
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { signinUser, signupUser })(Landing);