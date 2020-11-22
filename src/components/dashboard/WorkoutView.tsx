import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { ActivitiesCollection, WeeklyRoutinesCollection } from '../../firestoreCollections';
import { useCurrentUser } from '../auth/CurrentUser';

const StyledWorkoutView = styled.div``;

const WorkoutView = () => {
  const user = useCurrentUser();
  const [data, loading, error]: any = useDocumentData(
    WeeklyRoutinesCollection.doc(user?.routineId)
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
    console.log('%c currentActivity', 'background: #332167; color: #B3D1F6; font-size: 16px', currentActivity)
    setCurrentActivity(currentActivity)

  }
  useEffect(() => {
    if (!loading) {
      console.log('%c data[0]', 'background: #332167; color: #B3D1F6; font-size: 16px', data)
      const activityInfo = data.activities.find((el: any) => {
        return calculateDay(new Date()).toString() === calculateDay(el.date.toDate()).toString()
      })
      if (activityInfo) fetchActivity(activityInfo.activityId);
    }
  }, [data, loading])
  return (
    <StyledWorkoutView>
      <Row>
        <Col md={12}>
          <Card>
            {!currentActivity ?
              <Card.Header>You don't have any activities for today.</Card.Header>
              : (
                <>
                  <Card.Header>
                    <strong>{currentActivity?.name}</strong>
                  </Card.Header>
                  <Card.Body>
                    <Button onClick={() => window.location.replace(`/activity/${currentActivity.activityId}`)} >Go to activity</Button>
                  </Card.Body>
                </>
              )}
          </Card>
        </Col>
      </Row>
    </StyledWorkoutView>
  )
};

export default WorkoutView;
