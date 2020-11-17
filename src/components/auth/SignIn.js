import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase'
import { auth } from '../../firebase';
import { Redirect } from 'react-router-dom';
import VideoUrl from '../../images/trainee.mp4'
import './Signin.css'
class SignIn extends React.Component {

  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = auth.onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user })
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <>
          <div className="container contentBlock">
          <video autoPlay muted loop id="myVideo">
            <source src={VideoUrl} type="video/mp4" />
          </video>
            <div className="d-flex justify-content-center h-100" style={{ height: '100vh'}}>
              <div className="card">
                <div className="card-header">
                  <div className="d-flex justify-content-end social_icon">
                    <span><i className="fab fa-facebook-square"></i></span>
                    <span><i className="fab fa-google-plus-square"></i></span>
                    <span><i className="fab fa-twitter-square"></i></span>
                  </div>
                </div>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
              </div>
            </div>
          </div>
        </>
      );
    }

    return null
  }
}

export default SignIn;
