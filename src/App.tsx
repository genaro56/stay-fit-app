import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useCurrentUser } from './components/auth/CurrentUser';
import SignIn from './components/auth/SignIn';
import Footer from './components/footer/Footer';
import NoAuthNavbar from './components/navbar/NoAuthNavbar';
import Navbar from './components/navbar/Navbar';
import InitialAssessment from './components/assessment/InitialAssessment';
import MainDashboard from './components/dashboard/MainDashboard';
import ActivityView from './components/activity/ActivityView';
import ActivitiesList from './components/catalog/ActivitiesList';
import Profile from './views/ProfileView';
import CatalogView from './components/catalog/CatalogView';
import UploadActivity from './components/upload-activity/UploadActivity';
import RoutinesView from './components/routines/RoutinesView';
        
function App() {
  const user = useCurrentUser()
  console.log('%c:fuente_de_información: user', 'background: #006579; color: #C2F5FF; font-size: 16px', user)
  return (
    <Router>
      <Switch>
        {!user &&
          <>
            <NoAuthNavbar />
            <Switch>
              {/* Pantallas que ven los usuarios sin auth */}
              <Route exact path="/" component={SignIn} />
            </Switch>
          </>
        }
        {
          /**
            * Aqui ya tienen sesion iniciada pero tecnicamente no son admins por que apenas 
            * van a crear su rutina.
            */
          user &&
          <>
            <Navbar />
            <Route exact path="/initial-assessment" component={InitialAssessment} />
            <Route exact path="/" component={MainDashboard} />
            <Route exact path="/activity/:activityId" component={ActivityView} />
            <Route exact path="/activity-list/:categoryId" component={ActivitiesList} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/catalog" component={CatalogView} />
            <Route exact path="/upload-activity" component={UploadActivity} />
            <Route exact path="/routines" component={RoutinesView} />
            <Footer />
          </>
        }
      </Switch>
    </Router>
  );
}

export default App;
