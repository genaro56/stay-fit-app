import moment from 'moment';
import React, { Component, useEffect } from 'react';
import { Row, Col, Card, Spinner, Container, Button, Modal, Form } from 'react-bootstrap';
import { CollectionDataHook, DocumentDataHook, useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ActivitiesCollection } from '../../firestoreCollections';
import './Activity.css';

interface IActivity {
  video_url: string,
  name: string,
  description: string,
  likes: number,
}

const ActivityView = () => {
  const { activityId }: any = useParams();
  const [data, loading, error]: DocumentDataHook<IActivity> = useDocumentData(ActivitiesCollection.doc(activityId))
  const [showModal, setShowModal] = React.useState(false);
  const handleClose = () => setShowModal(false);
  const handleAddActivity = () => {
    alert('adding activity...')
  };
  return (
    <Container>
      <Row className="section-row">
        <div className="section light-bg">
          <Col md={12}>
            <Card style={{}}>
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
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Day:</Form.Label>
              <Form.Control value={Date()} type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleAddActivity()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ActivityView;
