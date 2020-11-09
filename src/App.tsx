import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useCurrentUser } from './components/auth/CurrentUser';
import { Alert, Navbar, Media } from 'react-bootstrap';
import SignIn from './components/auth/SignIn';
import Footer from './components/footer/Footer';
import NoAuthNavbar from './components/navbar/NoAuthNavbar';
import InitialAssessment from './components/assessment/InitialAssessment';
import MainDashboard from './components/dashboard/MainDashboard';

function App() {
  const user = useCurrentUser()
  console.log('%c:fuente_de_información: user', 'background: #006579; color: #C2F5FF; font-size: 16px', user)
  return (
    <Router>
      <Switch>
        {!user &&
          <>
            <Redirect to="/sigin" />
            <NoAuthNavbar />
            <Switch>
              {/* Pantallas que ven los usuarios sin auth */}
              <Route exact path="/sigin" component={SignIn} />
            </Switch>
            <Footer />
          </>
        }
        {
          /**
            * Aqui ya tienen sesion iniciada pero tecnicamente no son admins por que apenas 
            * van a crear su liga o por que van a inscribir a su equipo
            */
          user &&
          <Switch>
            <Navbar />
            <Route exact path="/initial-assessment" component={InitialAssessment} />
            <Route exact path="/dashboard" component={MainDashboard} />
            {/* <Route exact path="/profile" component={Profile} />
            <Route exact path="/about" component={AboutUs} /> */}
          </Switch>
        }
      </Switch>
    </Router>
  );
}

export default App;
