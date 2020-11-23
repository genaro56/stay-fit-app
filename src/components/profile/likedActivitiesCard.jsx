import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import moment from 'moment';

// UI

import { Paper, Typography, makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    padding: 16
  },
  row: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: 4,
    padding: 8,
    marginBottom: 8
  }
}))

export default function LikedActivitiesCard(props) {
  const classes = useStyles()

  const [activities, setActivities] = useState(null)

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid
    firebase.firestore().collection("user-data").doc(uid).get().then((snap) => {
      var tmp = []
      Promise.all(snap.data().likedActivities.map((act) => {
        return new Promise((resolve, reject) => {
          firebase.firestore().collection("activities").doc(act).get().then((actSnap) => {
            tmp.push({ ...actSnap.data(), id: act })
            resolve()
          })
        })
      })).then(() => {
        setActivities(tmp)
      })

    })
  }, [])

  return <>
    {activities && <Paper elevation={3} className={classes.paperContainer}>
      <Typography variant="h6" style={{ marginBottom: 8 }}>Liked activities</Typography>
      <div>
        {activities.map((act) => {
          return <div className={classes.row}>
            <Link to={`/activity/${act.id}`}><Typography>{act.name}</Typography></Link>
          </div>
        })}
      </div>
    </Paper>}
  </>

}