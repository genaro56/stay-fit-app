import React from 'react';

// Components

import ProfileCard from '../components/profile/profileCard';
import LogList from '../components/profile/logList';
import LikedActivitiesCard from '../components/profile/likedActivitiesCard';

// UI

import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'row',
    display: 'flex',
    padding: '32px 0',
    minHeight: '80vh'
  },
  leftColumn: {
    width: 350,
    minWidth: 350,
    marginRight: 32
  },
  rightColumn: {
    display: 'flex',
    width: '100%'
  }
}))

export default function Profile(props) {
  const classes = useStyles()

  return (
    <Container maxWidth="lg" className={classes.container}>
      <div className={classes.leftColumn}>
        <ProfileCard />
        <LikedActivitiesCard />
      </div>
      <div className={classes.rightColumn}>
        <LogList />
      </div>
    </Container>
  )
}
