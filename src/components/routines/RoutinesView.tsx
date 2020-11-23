import { CalendarViewDay } from '@material-ui/icons';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/esm/Row';
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Map } from 'typescript';
import { WeeklyRoutinesCollection } from '../../firestoreCollections';
import { useCurrentUser } from '../auth/CurrentUser';

const CalendarContainer = styled.div`
  padding: 50px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto;
`;

const GridRow = styled(Row)`
  display: grid;
  grid-template-columns: repeat(7, 14.28%);

  .box {
    border: 1px solid #cccc;
    padding: 10px;
    .emtpy-warning {
      text-style: italic;
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
        console.log('%c activityEntry', 'background: #332167; color: #B3D1F6; font-size: 16px', activityEntry)
        const entry = {
          date: roundedDate,
          component: () => (
            <div className="box">
              <span>{moment(roundedDate).locale('en').format('MMM. DD')}</span>
              <Card>
                <Card.Body>
                  {activityEntry.name ? <Link to={`/activity/${activityEntry?.activityId}`}>{activityEntry?.name}</Link>
                    :
                    <span className="empty-warning">No activity for today</span>
                  }
                </Card.Body>
              </Card>
            </div>)
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
        routinesList.activities.forEach((item: any) => { routinesMap.set(item.date.toDate().toString(), item) })
      console.log('%c routinesMap', 'background: #332167; color: #B3D1F6; font-size: 16px', routinesMap)
      generateDates(routinesMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <CalendarContainer>
      <Grid>
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
