import React from 'react';

// UI

import { Container, makeStyles } from '@material-ui/core';
import ProfileCard from '../components/profile/profileCard';
import LogList from '../components/profile/logList';

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
      </div>
      <div className={classes.rightColumn}>
        <LogList />
      </div>
    </Container>
  )
}
