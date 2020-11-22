import React, { Component, useCallback, useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import { CollectionDataHook, DocumentDataHook, useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ActivitiesCollection, UserDataCollection, WeeklyRoutinesCollection } from '../../firestoreCollections';
import { useCurrentUser } from '../auth/CurrentUser';
import './Activity.css';

interface IActivity {
  video_url: string,
  name: string,
  description: string,
  likes: number,
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
  const { activityId }: any = useParams();
  const user = useCurrentUser();
  const [data, loading, error]: DocumentDataHook<IActivity> = useDocumentData(ActivitiesCollection.doc(activityId))
<<<<<<< HEAD
  const [weeklyRoutineData, loadingRoutine, errorRoutine]: DocumentDataHook<any> = useDocumentData(WeeklyRoutinesCollection.doc(user?.routineId))
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
  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      date: new Date().toDateString(),
    }
  })

  async function handleAddActivity({ date: selectedDate }: { date: any }) {
    const formatDate = calculateDate(new Date(selectedDate));
    const indexOfDate = weeklyRoutineData?.activities.findIndex((activity: any) => {
      return calculateDate(activity.date.toDate()).toDateString() === formatDate.toDateString()
    })
    const isDatePicked = (indexOfDate !== -1)
    console.log('%c isDatePicked', 'background: #332167; color: #B3D1F6; font-size: 16px', isDatePicked)
    if (!isDatePicked && weeklyRoutineData) {
      const activities = weeklyRoutineData?.activities;
      activities?.push({
        date: formatDate,
        activityId
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
  }

  function handleLikeActivity() {
    if (!loading && data) {
      try {
        ActivitiesCollection.doc(activityId).update({
          likes: data?.likes + 1,
        }).then(() => {
          handleSuccess('Like sent.')
        })
        if (!isLikedBy) {
          const likedActivities = user.likedActivities || []
          likedActivities.push(activityId)
          UserDataCollection.doc(user.uid).update({
            likedActivities
          })
          setIsLikedBy(true)
        }
      } catch (err) {
        alert("Error creating operation: " + error);
      }
    }
  }

  useEffect(() => {
    if (!loading) {
      const exists = !!(user.likedActivities.find((act: any) => act === activityId))
      setIsLikedBy(exists)
    }
  }, [loading])
  console.log('%c isLikedBy', 'background: #332167; color: #B3D1F6; font-size: 16px', isLikedBy)
=======
  const [showModal, setShowModal] = React.useState(false);
  const {register, errors, handleSubmit} = useForm()
  const handleClose = () => setShowModal(false);
  const handleAddActivity = () => {
    alert('adding activity to weekly routine...')

  };
>>>>>>> 9bf96c37c3d4559fc957e1064b7462521ce25bfb
  return (
    <Container>
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
                    {data?.name}
                  </Card.Header>
                  <Card.Body>
                    <iframe
                      style={{ minHeight: '350px' }}
                      title="Today's routine"
                      width="100%"
                      src={data?.video_url}
                      frameBorder="1"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <Row className="section-content" style={{ margin: '20px 0', display: 'flex', flex: '1 1 0' }}>
                      <Col
                        // style={{ width: '80%' }}
                        sm={10}
                      >
                        <span>{data?.description}</span>
                      </Col>
                      <Col sm={2}>
                        <Row>
                          <Button disabled={isLikedBy} onClick={handleLikeActivity} >{isLikedBy ? 'Liked ': 'Like this activity'}</Button>
                          <div>{data?.likes}</div>
                        </Row>
                      </Col>
                    </Row>
                    <Button onClick={() => setShowModal(true)}>Add to routine</Button>
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
<<<<<<< HEAD
        <Form onSubmit={handleSubmit(handleAddActivity)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Day:</Form.Label>
              <Form.Control
                ref={register({
                  required: true
                })}
                onChange={(e: any) => setDateValue(e.target.value)}
                name="date"
                min={restrictDate()}
                value={dateValue}
                type="date"
              />
=======
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleAddActivity)}>
            <Form.Group>
              <Form.Label>Day:</Form.Label>
              <Form.Control ref={register({ required: true })} value={Date()} type="date" />
>>>>>>> 9bf96c37c3d4559fc957e1064b7462521ce25bfb
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
            <Button variant="primary" type="submit">
              Save Changes
          </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default ActivityView;
