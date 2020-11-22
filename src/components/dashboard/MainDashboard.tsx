import React, { useState } from 'react';
import { useCurrentUser } from '../auth/CurrentUser';
import WorkoutView from './WorkoutView';
import './Main.css'
import img1 from '../../images/pushups.jpg';
import img2 from '../../images/pilates.jpg';
import img3 from '../../images/abs.jpg';
import img4 from '../../images/yoga.jpg';
import { Carousel, Row } from 'react-bootstrap';
import moment from 'moment'

// UI

import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '40vh',
    padding: '32px 0'
  },
  carouselContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '0 !important',
    backgroundColor: 'black',
    position: 'absolute'
  },
  carousel: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: 450,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  carouselItem: {
    width: '100%',
    objectFit: 'cover',
    opacity: 0.5
  },
  headerContainer: {
    position: 'relative',
    height: 450,
  },
  title: {
    position: 'relative',
    color: 'white'
  },
  headerContainer2: {
    padding: 32,
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column'
  }
}))

const MainDashboard = () => {
  const classes = useStyles()

  const currentUser = useCurrentUser()
  const imgs = [img1, img2, img3, img4]
  return (
    <>
      <div className={classes.headerContainer}>
        <div className={classes.carouselContainer}>
          <Carousel className={classes.carousel}>
            {imgs.map((img, index) =>
              <Carousel.Item key={index} className={classes.carouselItem}>
                <img
                  // className="d-block w-100"
                  src={img}
                  alt="..."
                  style={{ objectFit: 'cover', width: '100%' }}
                />
              </Carousel.Item>
            )}
          </Carousel>
        </div>
        <Container maxWidth="md" className={classes.headerContainer2}>
          <h1 className={classes.title}>Welcome back, {currentUser.name || 'Guest'}</h1>
          <h3 className={classes.title}>{moment().locale('en').format('MMMM DD, YYYY')}</h3>
        </Container>
      </div>

      <Container maxWidth="lg" component="main" className={classes.container}>
        <WorkoutView />
      </Container>
    </>
  );
}
export default MainDashboard;
