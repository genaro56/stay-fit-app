import moment from 'moment';
import React, { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { WeeklyRoutinesCollection } from '../../firestoreCollections';
import { useCurrentUser } from '../auth/CurrentUser';

const StyledWorkoutView = styled.div``;

const WorkoutView = () => {
  const user = useCurrentUser();
  const [data, loading, error]: any = useCollectionData(
    // WeeklyRoutinesCollection.where('userId', '==', user?.id)
    WeeklyRoutinesCollection.where('userId', '==', 'RxGlhvfXqVMySkZVjOip9SYVn443')
  );
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const calculateDay = (date: Date) => {
    const newDate = date;
    newDate.setHours(0); newDate.setMinutes(0); newDate.setSeconds(0); newDate.setMilliseconds(0);
    return newDate
  }
  React.useEffect(() => {
    if (!loading && data?.[0]) {
      const currentActivity = data?.[0]?.activities.find((el: any) => calculateDay(new Date()) === calculateDay(el.date))
      console.log('%c currentActivity', 'background: #332167; color: #B3D1F6; font-size: 16px', currentActivity)
      setCurrentActivity(currentActivity)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const currentDate = moment(new Date()).format('MMM DD')
  return (
    <StyledWorkoutView>
      <Row>
        <Col>
          <Row>
            <h3 style={{ textTransform: 'capitalize' }}>{currentDate}</h3>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card>
            {!currentActivity ?
              <Card.Header>You don't have an activity for today :(</Card.Header>
              : (
                <>
                  <Card.Title>{currentActivity?.name}</Card.Title>
                  <Card.Body>
                    <iframe
                      title="Today's routine"
                      width="100%"
                      src={currentActivity?.video_url}
                      frameBorder="0"
                      allow="encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
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
