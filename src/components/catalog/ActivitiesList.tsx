import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ActivitiesCollection } from '../../firestoreCollections';

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
  }
}))

const ActivityList = styled(Row)`

`;
const ActivitiesList = () => {
  const classes = useStyles()

  const { categoryId }: any = useParams();
  console.log('%c categoryId', 'background: #332167; color: #B3D1F6; font-size: 16px', categoryId)
  const [data, loading, error] = useCollectionData(
    ActivitiesCollection.where('category', '==', categoryId), { idField: 'id' }
  );
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && data) {
      console.log('AAAAAA', data);
      const actList: any[] = [];
      data.forEach((activity: any) => {
        actList.push(activity)
      })
      setActivities(actList)
    }
  }, [data, loading])
  return (
    <Container maxWidth="md" component="main" className={classes.container}>
      <Row>
        <Col>
          <h1 style={{ textTransform: 'capitalize' }}>{categoryId}</h1>
        </Col>
      </Row>
      <ActivityList style={{ padding: '32px 0' }}>
        {activities.map((act: any) => (
          <Card onClick={() => window.location.replace(`/activity/${act.id}`)} className={classes.card}>
            <Card.Header>
              <h2>{act.name}</h2>
              <span>{act.description}</span>
            </Card.Header>
          </Card>
        ))}
      </ActivityList>
    </Container>
  )
};

export default ActivitiesList;
