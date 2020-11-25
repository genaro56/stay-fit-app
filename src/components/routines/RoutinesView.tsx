import { CalendarViewDay } from '@material-ui/icons';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Alert, Card } from 'react-bootstrap';
import Row from 'react-bootstrap/esm/Row';
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Map } from 'typescript';
import { WeeklyRoutinesCollection } from '../../firestoreCollections';
import { useCurrentUser } from '../auth/CurrentUser';
import { Checkbox } from '@material-ui/core';
import firebase from 'firebase';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const CalendarContainer = styled.div`
  padding: 50px;
  background: white;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto;
  border-radius: 5px;
`;

const GridRow = styled(Row)`
  display: grid;
  grid-template-columns: repeat(7, 14.28%);
  .card {
    border: none;
  }
  .card-body {
    background: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    min-height:58px;
  }
  .box {
    border: 1px solid #cccc;
    padding: 10px;
    .box-date {
      font-weight: bold;
    }
    .empty-warning {
      font-style: italic;
      color: white;
    }
  }

`;

const dateLimits = [30, 28, 31, 31, 31, 31, 31, 31, 30, 31, 31, 30, 31]

const calculateDay = (date: Date) => {
  const newDate = date;
  newDate.setHours(0); newDate.setMinutes(0); newDate.setSeconds(0); newDate.setMilliseconds(0);
  return newDate;
}

const RoutinesView = () => {
  const user = useCurrentUser();
  const [routinesList = [], loading, errors]: any = useDocumentData(WeeklyRoutinesCollection.doc(user?.routineId))
  const [DateObjects, setDateDateObjets] = React.useState<any[]>([]);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSuccess = (msg: string) => {
    setSuccess(true);
    setSuccessMessage(msg);
  }

  async function handleEraseActivity(searchDate: any) {
    const filteredActivities = routinesList.activities.filter((act: any) => act.date.toString() !== searchDate.toString());
    if (filteredActivities) {
      await WeeklyRoutinesCollection.doc(user?.routineId).update({
        activities: filteredActivities,
      }).then((res) => {
        handleSuccess('Activity erased from routine!');
      }).catch((err) => alert('Error deleting activity: ' + err))
    }
  }

  function generateDates(activitiesMap: any) {
    const DateObjects: any[] = [];
    const currentMonth = new Date().getMonth()
    let dayCounter = 1;
    for (let i = 0; i < dateLimits[currentMonth]; i += 7) {
      const rows: any[] = []
      for (let j = 0; j < 7; j++) {
        const entryDate: Date = new Date();
        entryDate.setMonth(currentMonth); entryDate.setDate(dayCounter);
        const roundedDate = calculateDay(entryDate);
        const activityEntry = activitiesMap.get(roundedDate.toString()) || {};
        const entry = {
          date: roundedDate,
          component: () => (
            <div className="box">
              <span className="box-date">{moment(roundedDate).locale('en').format('MMM. DD')}</span>
              <Card>
                {activityEntry.name ? (
                  <>
                    <Card.Header>
                      <Row style={{ justifyContent: "flex-end" }}>
                        <FaTimes title="erase this activity from routine." onClick={() => handleEraseActivity(activityEntry.date)} />
                      </Row>
                      <Link to={`/activity/${activityEntry?.activityId}`}>{activityEntry?.name}</Link>
                    </Card.Header>
                    <Card.Body style={{ background: 'rgb(28, 34, 55)', color: 'white' }}>
                      {activityEntry?.checked ? 'Completed: ' : 'Complete: '} <Checkbox title="mark as completed" style={{ color: "white"}} disabled={activityEntry.checked} defaultChecked={activityEntry.checked} onChange={(_, checked) => checkAction(routinesList, activityEntry, checked, user)}
                      />
                    </Card.Body>
                  </>
                )
                  :
                  <Card.Body><span className="empty-warning" style={{ color: 'black' }}>No activity for today</span></Card.Body>
                }
              </Card>
            </div >)
        }
        rows.push(entry)
        dayCounter++;
      }
      DateObjects.push(rows);
    }
    setDateDateObjets(DateObjects)
  }

  useEffect(() => {
    if (!loading) {
      const routinesMap = new Map()
      if (routinesList.activities)
        routinesList.activities.forEach((item: any, index: any) => { routinesMap.set(item.date.toDate().toString(), { ...item, id: index }) })
      generateDates(routinesMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, routinesList.activities])

  // useEffect(() => {
  //   const unsuscribe = routinesList &&
  //     WeeklyRoutinesCollection.doc(user?.routineId)
  //       .onSnapshot((snapshot) => {

  //       })
  // })

  return (
    <CalendarContainer>
      <Grid>
        {success && <Alert variant="success">{successMessage}</Alert>}
        {DateObjects.map((row) => (
          <GridRow>
            {row.map((Entry: any) =>
              (<Entry.component />)
            )}
          </GridRow>
        ))}
      </Grid>
    </CalendarContainer>
  );
}
export default RoutinesView;
function checkAction(routinesList: any, activityEntry: any, checked: boolean, user: any) {
  routinesList.activities[activityEntry.id] = {
    ...activityEntry,
    checked,
  };
  firebase.firestore().collection("weekly-routines").doc(user?.routineId).update({ activities: routinesList.activities });
  if (checked) {
    var log = user.log || [];
    log.push({
      date: Date.now(),
      title: "Exercise:" + activityEntry.name + " completed."
    });
    firebase.firestore().collection("user-data").doc(user.uid).update({ log });
  }
}

