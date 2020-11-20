import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ActivitiesCollection } from '../../firestoreCollections';

const StyledActivitiesList = styled(Container)``;
const ActivityList = styled(Row)`

`;
const ActivitiesList = () => {
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
    <StyledActivitiesList>
      <Row>
        <Col>
          <h1 style={{ textTransform: 'capitalize' }}>{categoryId}</h1>
        </Col>
      </Row>
      <ActivityList>
        {activities.map((act: any) => (
          <Card onClick={() => window.location.replace(`/activity/${act.id}`)}>
            <Card.Header>
              <h2>{act.name}</h2>
              <span>{act.description}</span>
            </Card.Header>
          </Card>
        ))}
      </ActivityList>
    </StyledActivitiesList >
  )
};

export default ActivitiesList;
