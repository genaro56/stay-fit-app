import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import moment from 'moment';

// UI

import { Avatar, Paper, Typography, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paperContainer: {
    padding: 16,
    display: 'flex',
    marginBottom: 8
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: 16
  }
}))

export default function ProfileCard(props) {
  const classes = useStyles()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const uid = firebase.auth().currentUser.uid
    firebase.firestore().collection("user-data").doc(uid).get().then((snap) => {
      setUser(snap.data())
    })
  }, [])

  return <>
    {user && <Paper elevation={3} className={classes.paperContainer}>
      <Avatar className={classes.avatar} />
      <div>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2" style={{ marginBottom: 8 }}>Miembro desde {moment(user.created).format("DD/MM/YYYY")}</Typography>
        <Button variant="contained" color="secondary">Editar perfil</Button>
      </div>
    </Paper>}
  </>

}