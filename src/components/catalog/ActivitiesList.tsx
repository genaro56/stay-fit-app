import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ActivitiesCollection } from '../../firestoreCollections';
import DefaultImage from '../../images/placeholder.png';

// UI

import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '80vh',
    padding: '32px 0'
  },
  card: {
    cursor: 'pointer',
    marginBottom: 8,
    width: '100%'
  },
  row: {
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  img: {
    height: 100,
    width: 150
  }
}))

const ActivityList = styled(Row)``;

const ActivitiesList = () => {
  const classes = useStyles()

  const params: any = useParams();
  console.log('%c params', 'background: #332167; color: #B3D1F6; font-size: 16px', params)
  const { categoryId } = params;
  console.log('%c categoryId', 'background: #332167; color: #B3D1F6; font-size: 16px', categoryId)
  const [data, loading, error] = useCollectionData(
    ActivitiesCollection.where('category', '==', categoryId), { idField: 'id' }
  );
  const [activities, setActivities] = useState<any[]>([]);
  const [sortType, setSortType] = useState('likes');

  useEffect(() => {
    if (!loading && data) {
      console.log('AAAAAA', data);
      const actList: any[] = [];
      data.forEach((activity: any) => {
        actList.push(activity)
      })
      actList.sort((a, b) => { return b[sortType] - a[sortType] })
      setActivities(actList)
    }
  }, [data, loading, sortType])

  return (
    <Container maxWidth="md" component="main" className={classes.container}>
      <Row>
        <Col md="8">
          <h1 style={{ textTransform: 'capitalize' }}>{categoryId}</h1>
        </Col>
        <Col sm="4">
          <span>Sort by:</span>
          <Form.Control as="select" onChange={(e: any) => setSortType(e.target.value)}>
            <option value="likes">Most liked</option>
            <option value="views">Most popular</option>
          </Form.Control>
        </Col>
      </Row>
      <hr />
      <ActivityList style={{ padding: '32px 0' }}>
        {activities.length > 0 ? activities.map((act: any) => (
          <Card onClick={() => window.location.replace(`/activity/${act.id}`)} className={classes.card}>
            <Card.Header className={classes.row}>
              <img alt="Activity preview" src={act.thumbnail || DefaultImage} className={classes.img} />
              <Col sm={10}>
                <h2>{act.name}</h2>
                <span>{act.description}</span>
              </Col>
            </Card.Header>
            <Card.Body>
              <span style={{ marginRight: '10px' }}>likes: {act.likes}</span>
              <span>views: {act.views}</span>
            </Card.Body>
          </Card>
        )) : (
            <Card>
              <Card.Body>Looks like there are no activities here :(</Card.Body>
            </Card>
          )}
      </ActivityList>
    </Container>
  )
};

export default ActivitiesList;
