import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ActivitiesCollection, WeeklyRoutinesCollection } from '../../firestoreCollections';
import { useCurrentUser } from '../auth/CurrentUser';

const StyledWorkoutView = styled.div``;

const CardContainer = styled(Card)`
  background: rgb(48 67 134);
  color: white;
  height: 100%;
`;


const WorkoutView = () => {
  const user = useCurrentUser();
  const [data, loading, error]: any = useDocumentData(
    WeeklyRoutinesCollection.doc(user?.routineId || 'default')
  );
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const calculateDay = (date: Date) => {
    const newDate = date;
    newDate.setHours(0); newDate.setMinutes(0); newDate.setSeconds(0); newDate.setMilliseconds(0);
    return newDate
  }
  async function fetchActivity(id: string) {
    let currentActivity: any = {}
    try {
      currentActivity = await ActivitiesCollection.doc(id).get().then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          return { activityId: doc.id, ...doc.data() }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    } catch (err) {
      alert('There was an error fetching the activity: ' + err);
    }
    setCurrentActivity(currentActivity)
  }
  useEffect(() => {
    if (!loading && data?.activities) {
      const activityInfo = data.activities.find((el: any) => {
        return calculateDay(new Date()).toString() === calculateDay(el.date.toDate()).toString()
      })
      if (activityInfo) fetchActivity(activityInfo.activityId);
    }
  }, [data, loading])
  return (
    <StyledWorkoutView>
      <Col lg="12">
        <Row>
          <Col md={6}>
            <CardContainer>
              {!currentActivity ?
                <>
                  <Card.Header>You don't have any activities for today.</Card.Header>
                  <Card.Body>Schedule your activities from the catalog today!</Card.Body>
                </>
                : (
                  <>
                    <Card.Header>
                      <h5>Today's activity: </h5><strong>{currentActivity?.name}</strong>
                    </Card.Header>
                    <Card.Footer>
                      <Button variant="secondary" onClick={() => window.location.replace(`/activity/${currentActivity.activityId}`)} >Go to activity</Button>
                    </Card.Footer>
                  </>
                )}
            </CardContainer>
          </Col>
          <Col md={6}>
            <CardContainer>
              <Card.Body>
                <h5><strong>Create your own activities!</strong></h5>
              </Card.Body>
              <Card.Footer>
                <Link to="/upload-activity">
                  <Button variant="secondary">Click here</Button>
                </Link>
              </Card.Footer>
            </CardContainer>
          </Col>
        </Row>
      </Col>
    </StyledWorkoutView>
  )
};

export default WorkoutView;
