import moment from 'moment';
import React, { Component, useEffect, useState } from 'react';
import { Row, Col, Card, Spinner, Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import { CollectionDataHook, DocumentDataHook, useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ActivitiesCollection, WeeklyRoutinesCollection } from '../../firestoreCollections';
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

const ActivityView = () => {
  const { activityId }: any = useParams();
  const user = useCurrentUser();
  const [data, loading, error]: DocumentDataHook<IActivity> = useDocumentData(ActivitiesCollection.doc(activityId))
  const [weeklyRoutineData = {}, loadingRoutine, errorRoutine]: DocumentDataHook<any> = useDocumentData(WeeklyRoutinesCollection.doc(user?.routineId))
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClose = () => setShowModal(false);
  const { register, handleSubmit } = useForm()

  async function handleAddActivity({ date: selectedDate }: { date: Date }) {
    const isDatePicked = !!(weeklyRoutineData.activities.find((activity: any) => activity.date === selectedDate))

    if (!isDatePicked) {
      const activities = weeklyRoutineData.activities;
      activities.push({
        date: selectedDate,
        activityId
      });

      WeeklyRoutinesCollection.doc(user?.routineId).update({
        activities
      }).then((res) => {
        setSuccess(true)
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

  return (
    <Container>
      <Row className="section-row">
        <div className="section light-bg">
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
                      <Row className="section-content" style={{ display: 'flex', flex: '1 1 0' }}>
                        <Col
                          style={{ width: '80%' }}
                          md={6}
                        >
                          <span>{data?.description}</span>
                        </Col>
                        <Col style={{ width: '20%' }} md={6}>
                          <div>likes: {data?.likes}</div>
                        </Col>
                      </Row>
                      <Button onClick={() => setShowModal(true)}>Add to routine</Button>
                    </Card.Body>
                  </>
                )}
            </Card>
          </Col>
        </div>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Which day would you like to add to?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(handleAddActivity)}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Day:</Form.Label>
              <Form.Control ref={register({ required: true })} name="" value={Date()} type="date" />
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
      {success && <Alert variant="success">Rutina agregada con éxito</Alert>}
    </Container>
  );
}

export default ActivityView;
