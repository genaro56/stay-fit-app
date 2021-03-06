import React, { Component, useCallback, useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Modal, Form, Alert } from 'react-bootstrap';
import { CollectionDataHook, DocumentDataHook, useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ActivitiesCollection, UserDataCollection, WeeklyRoutinesCollection } from '../../firestoreCollections';
import { useCurrentUser } from '../auth/CurrentUser';
import './Activity.css';

// UI

import { Container, makeStyles, Button, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteEmptyIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '80vh',
    padding: '32px 0'
  },
}))

interface IActivity {
  video_url: string,
  name: string,
  description: string,
  likes: number,
  views: number,
}

function formIsValid(errors: any) {
  return Object.entries(errors).length === 0
}

function restrictDate() {
  var dtToday = new Date();

  var month = dtToday.getMonth() + 1 as any;
  var day = dtToday.getDate() as any;
  var year = dtToday.getFullYear();
  if (month < 10)
    month = '0' + month.toString();
  if (day < 10)
    day = '0' + day.toString();
  return year + '-' + month + '-' + day;
}

const calculateDate = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0); newDate.setMinutes(0); newDate.setSeconds(0); newDate.setMilliseconds(0);
  return newDate
}

const ActivityView = () => {
  const classes = useStyles()

  const { activityId }: any = useParams();
  const user = useCurrentUser();
  const [activityData, loading, error]: DocumentDataHook<IActivity> = useDocumentData(ActivitiesCollection.doc(activityId))
  const [weeklyRoutineData, loadingRoutine, errorRoutine]: DocumentDataHook<any> = useDocumentData(WeeklyRoutinesCollection.doc(user?.routineId || 'default'))
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [isLikedBy, setIsLikedBy] = useState(false);

  const handleSuccess = (msg: string) => {
    setSuccess(true);
    setSuccessMessage(msg);
  }
  const handleClose = () => setShowModal(false);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      date: new Date().toDateString(),
    }
  })

  async function handleAddActivity({ date: selectedDate }: { date: string }) {
    const formatDate = new Date(selectedDate + ':00:00:00')
    if (user.routineId && weeklyRoutineData) {
      const indexOfDate = weeklyRoutineData?.activities.findIndex((activity: any) => {
        return calculateDate(activity.date.toDate()).toDateString() === calculateDate(formatDate).toDateString()
      })
      const isDatePicked = (indexOfDate !== -1)
      if (!isDatePicked) {
        const activities = weeklyRoutineData?.activities;
        activities?.push({
          date: formatDate,
          activityId,
          name: activityData?.name
        });

        WeeklyRoutinesCollection.doc(user?.routineId).update({
          activities
        }).then((res) => {
          handleSuccess('Activity added to routine successfully')
          setShowModal(false);
        })
          .catch(function (error: any) {
            // The document probably doesn't exist.
            alert("Error updating document: " + error);
          });
      } else {
        alert("Cannot pick this date: date is already taken.")
      }
    } else {
      createNewRoutine(formatDate);
    }
  }

  async function createNewRoutine(date: any) {
    const activities = [{ date, activityId, name: activityData?.name }]
    const routineRef = await WeeklyRoutinesCollection.add({ activities, userId: user.uid })
    UserDataCollection.doc(user.uid).update({
      routineId: routineRef.id
    }).then((res) => {
      handleSuccess('Routine created successfully');
      setShowModal(false);
    })
  }

  function handleLikeActivity() {
    if (!loading && activityData) {
      try {
        ActivitiesCollection.doc(activityId).update({
          likes: isLikedBy ? activityData?.likes - 1 : activityData?.likes + 1,
        })
        if (isLikedBy) {
          var likedActivities = user.likedActivities || []
          likedActivities = likedActivities.filter((act: any) => {
            console.log("ACTIVITY ID", act, activityId)
            return act !== activityId
          })

          console.log("ACTIVITIES", likedActivities)
          UserDataCollection.doc(user.uid).update({
            likedActivities
          })
          user.likedActivities = likedActivities
        } else {
          const likedActivities = user.likedActivities || []
          likedActivities.push(activityId)
          UserDataCollection.doc(user.uid).update({
            likedActivities
          })
          user.likedActivities = likedActivities
        }
        setIsLikedBy(!isLikedBy)
      } catch (err) {
        alert("Error creating operation: " + error);
      }
    }
  }

  const updateView = () => {
    ActivitiesCollection.doc(activityId).update({
      views: activityData?.views ? (activityData?.views + 1) : 1
    })
  }

  useEffect(() => {
    if (!loading) {
      const exists = user.likedActivities && !!(user.likedActivities.find((act: any) => act === activityId))
      updateView()
      setIsLikedBy(exists)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  console.log('%c isLikedBy', 'background: #332167; color: #B3D1F6; font-size: 16px', isLikedBy)
  return (
    <Container maxWidth="lg" component="main" className={classes.container}>
      <Row className="section-row">
        {/* <div className="section light-bg"> */}
        <Col md={12}>
          <Card>
            {loading ?
              <div>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                  Loading...
                  </div>
              : (
                <>
                  {success && <Alert variant="success">{successMessage}</Alert>}
                  <Card.Header>
                    {activityData?.name}
                  </Card.Header>
                  <Card.Body>
                    <iframe
                      style={{ minHeight: '550px' }}
                      title="Today's routine"
                      width="100%"
                      src={activityData?.video_url}
                      frameBorder="1"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <Row className="section-content" style={{ margin: '20px 0', display: 'flex', flex: '1 1 0' }}>
                      <Col
                        sm={10}
                      >
                        <span>{activityData?.description}</span>
                      </Col>
                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <Row style={{ alignItems: 'center', paddingLeft: 16 }}>
                        <IconButton onClick={handleLikeActivity} style={{ padding: 4, marginRight: 8 }}>
                          {isLikedBy ? <FavoriteIcon /> : <FavoriteEmptyIcon />}
                        </IconButton>
                        <div>{activityData?.likes}</div>
                      </Row>
                      <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>Add to routine</Button>
                    </div>
                  </Card.Body>
                </>
              )}
          </Card>
        </Col>
        {/* </div> */}
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Which day would you like to add to?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(handleAddActivity)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Day:</Form.Label>
              <Form.Control
                ref={register({ required: true })}
                onChange={(e: any) => setDateValue(e.target.value)}
                name="date"
                min={restrictDate()}
                value={dateValue}
                type="date"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} style={{ marginRight: 8 }}>
              Cancel
          </Button>
            <Button type="submit" disabled={!formIsValid(errors)} variant="contained" color="primary">
              Save Changes
          </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default ActivityView;
