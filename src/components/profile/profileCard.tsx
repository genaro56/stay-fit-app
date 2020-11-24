import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import moment from 'moment';

// UI

import { Avatar, Paper, Typography, makeStyles, Button } from '@material-ui/core';
import { Form, Modal } from 'react-bootstrap';
import { useCurrentUser } from '../auth/CurrentUser';
import { UserDataCollection } from '../../firestoreCollections';
import { useForm } from 'react-hook-form';

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

function formIsValid(errors: any) {
  return Object.entries(errors).length === 0
}

export default function ProfileCard(props: any) {
  const classes = useStyles()
  const user = useCurrentUser();
  const [showModal, setShowModal] = useState(false);
  const [nameValue, setNameValue] = useState(user.name || 'Guest');
  const handleClose = () => setShowModal(false);


  // useEffect(() => {
  //   firebase.firestore().collection("user-data").doc(user.uid).get().then((snap: any) => {
  //     setUser(snap.data())
  //   })
  // }, [])
  const { register, errors, handleSubmit } = useForm();

  const handleProfileChanges = async ({ name }: any) => {
    await UserDataCollection.doc(user.uid).update({
      name
    }).then((res) => {
    }).catch((err) => alert('Error updating info: ' + err))
    setShowModal(false)
  }
  return <>
    {user && <Paper elevation={3} className={classes.paperContainer}>
      <Avatar className={classes.avatar} />
      <div>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2" style={{ marginBottom: 8 }}>Miembro desde {moment(user.created).format("DD/MM/YYYY")}</Typography>
        <Button onClick={() => setShowModal(true)} variant="contained" color="secondary">Edit profile</Button>
      </div>
    </Paper>}
    <Modal show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit(handleProfileChanges)}>
        <Modal.Body>
          <Form.Label>
            Name
        </Form.Label>
          <Form.Control ref={register({ required: true })} name="name" value={nameValue} onChange={(e: any) => setNameValue(e.target.value)} />
          <Modal.Footer>
            <Button variant="contained" type="submit" disabled={(nameValue === user?.name && nameValue.length > 3)} color="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Body>
      </Form>
    </Modal>
  </>

}