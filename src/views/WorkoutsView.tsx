import React, { useState, useEffect } from 'react';
// import { getRoutines, deleteRoutine } from '../services';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import styled from 'styled-components';


const StyledWorkoutsView = styled.div`
  color: white;

  .createButton{
    background: #FF8552;
    border-color: #FF8552;
  }
`;

const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`;

const RoutinesWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const RoutinesHeader = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  padding: 20px 10px 0px;
  align-content: center;
  align-items: center;
  margin-bottom: 20px;

  .workoutTitle {
    font-weight: bold;
    margin: 0;
  }
  .erase-btn {
    position: absolute;
    margin-right: 10px;
    right: 0;
  }
`;

const WorkoutsView = () => {
  const [routines, setRoutines] = useState<any>([]);
  const [dates, setDates] = useState<any>([]);

  const history = useHistory();
  const deleteWorkout = (id: string) => {
    // deleteRoutine(id).then(() => getRoutines()
    //   .then(routines => setRoutines(routines)))
    //   .catch(err => alert('There was an error deleting your routine!'));
    //   alert('Routine deleted!');
  }
  const calculateDays = (_routines: any) => {
    const dates = _routines.map((routine: any) => {
      var d = new Date(routine.startDate);
      let days = [];
      for (let index = 0; index < 5; index++) {
        const element = d.setDate(d.getDate() + ((index+1) + 7 - d.getDay()) % 7);
        days.push(element);
      }
      return { days };
    })
    return setDates(dates);
  }

  useEffect(() => {
    // getRoutines().then(routines => {
    //   setRoutines(routines)
    //   calculateDays(routines)
    // });
  }, []);

  return (
    <StyledWorkoutsView>
      <br />
      {routines.length === 0 ?
        (
          <div>
            <h1>You have no routines registered! Do you want to start one?</h1>
            <Button className="createButton" onClick={() => history.push('/initial-assessment')}>Create routine</Button>
          </div>
        )
        :
        routines.map((routine: any, index: number) => (
          <ContentCard>
            <hr style={{ width: '100%' }} />
            <RoutinesHeader>
              <label className="workoutTitle">{routine.name}</label>
              <Button className="erase-btn" onClick={() => deleteWorkout(routine._id)}>Erase workout</Button>
            </RoutinesHeader>
            <RoutinesWrapper className="routinesWrapper">
              <Card>
                <label>{(new Date(dates[index]?.days[0])).toLocaleDateString('en-US')}</label>
                <iframe width="100%" src={routine.monday.videoURL} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                <label>{routine.monday.comments}</label>
              </Card>
              <Card>
              <label>{(new Date(dates[index]?.days[1])).toLocaleDateString('en-US')}</label>
                <iframe width="100%" src={routine.tuesday.videoURL} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                <label>{routine.tuesday.comments}</label>
              </Card>
              <Card>
              <label>{(new Date(dates[index]?.days[2])).toLocaleDateString('en-US')}</label>
                <iframe width="100%" src={routine.wednesday.videoURL} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                <label>{routine.wednesday.comments}</label>
              </Card>
              <Card>
              <label>{(new Date(dates[index]?.days[3])).toLocaleDateString('en-US')}</label>
                <iframe width="100%" src={routine.thursday.videoURL} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                <label>{routine.thursday.comments}</label>
              </Card>
              <Card>
              <label>{(new Date(dates[index]?.days[4])).toLocaleDateString('en-US')}</label>
                <iframe width="100%" src={routine.friday.videoURL} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                <label>{routine.friday.comments}</label>
              </Card>
            </RoutinesWrapper>
          </ContentCard>
        ))}
    </StyledWorkoutsView>
  );
}
export default WorkoutsView;
