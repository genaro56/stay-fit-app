import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

// Components

import ActivityRow from './activityRow';

// UI

import { makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  activityEmptyContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    height: 100
  },
  activitySectionHeader: {
    marginBottom: 24
  }
}))

export default function LogList(props) {
  const classes = useStyles()

  const [log, setLog] = useState(null)
  const [doneFetching, setDoneFetching] = useState(false)

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid
    firebase.firestore().collection("user-data").doc(uid).get().then((snap) => {
      setLog(snap.data().log)
      setDoneFetching(true)
    })
  }, [])

  return <>
    {doneFetching && <>
      {log
        ? <div style={{ width: '100%' }}>
          <div className={classes.activitySectionHeader}>
            <Typography variant="h4">Actividad reciente</Typography>
          </div>
          <div style={{ width: '100%' }}>
            {log.map((activity) => {
              return <ActivityRow {...activity} />
            })}
          </div>
        </div>
        : <Paper elevation={3} className={classes.activityEmptyContainer}>
          <Typography>Aún no tienes ninguna actividad registrada.</Typography>
        </Paper>
      }
    </>
    }
  </>
}