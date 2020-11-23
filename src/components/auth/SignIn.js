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
      signInSuccessWithAuthResult: (result) => {
        if (result.additionalUserInfo.isNewUser) {
          firebase.firestore().collection("user-data").doc(result.user.uid).set({
            created: Date.now(),
            name: result.user.displayName,
            email: result.user.email
          }).then(() => {
            firebase.firestore().collection("weekly-routines").add({
              userId: result.user.uid
            }).then((routineSnap) => {
              firebase.firestore().collection("user-data").doc(result.user.uid).update({
                routineId: routineSnap.id
              })
            })
          })
        }
      }
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
          <div className="container">
            <video autoPlay muted loop id="myVideo">
              <source src={VideoUrl} type="video/mp4" />
            </video>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
          </div>
        </>
      );
    }

    return null
  }
}

export default SignIn;
