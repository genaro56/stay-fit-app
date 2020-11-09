import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
// import { createRoutines } from '../services'
import { useHistory } from 'react-router';
import { Card, Button } from 'react-bootstrap';

type dateValues = {
  videoUrl: string,
  comments: string,
}

type formValues = {
  name: string,
  startDate: string,
  endDate: string,
  days: dateValues[]
}

const InitialAssessment = () => {
  const { register, handleSubmit } = useForm()
  const history = useHistory();
  const [showError, setShowError] = useState(false)

  const onSubmit = (values: any) => {
    console.log(values);
    if(Object.keys(values).length !== 13) {
      setShowError(true);
    } else {
      alert('submitting data!');
      // createRoutines({
        // name: values.name as string,
        // startDate: values.startDate as string,
        // endDate: values.endDate as string,
        // monday: {
          // comments: values.monday_comment as string,
          // query: values.monday_query as string,
        // },
        // tuesday: {
          // comments: values.tuesday_comment as string,
          // query: values.tuesday_query as string,
        // },
        // wednesday: {
          // comments: values.wednesday_comment as string,
          // query: values.wednesday_query as string,
        // },
        // thursday: {
          // comments: values.thursday_comment as string,
          // query: values.thursday_query as string,
        // },
        // friday: {
          // comments: values.friday_comment as string,
          // query: values.friday_query as string,
        // }
      // }).then(() => {
        // history.push('/profile');
      // }).catch((err: any) => {
        // alert('there was an error uploading your routine! ' + err);
      // })
    }
  }
  const values = [
    { value: 'crunches workout', label: 'crunches' },
    { value: 'pushups workout', label: 'pushups' },
    { value: 'weight-lifting workout', label: 'weight-lifting' },
    { value: 'yoga begginer workout', label: 'yoga' },
    { value: 'cardio workout', label: 'cardio' },
    { value: 'burpees workout', label: 'burpees' },
    { value: 'stretching workout', label: 'stretching' },
  ]

  // const StyledInitialAssessment = styled.div`
  //   .submitBtn {
  //     background: #FF8552;
  //     border-color: #FF8552;
  //     margin-top: 10px;
  //   }
  //   .daysCard {
  //     color: black;
  //     background: #f8f9fa!important;
  //     display: flex;
  //     flex-direction: column;
  //     padding: 20px;
  //     label {
  //       display: flex;
  //       flex-direction: column;
  //     }

  //     select {
  //       max-width: 200px;
  //     }
  //   }
  // `;

  return (
    <div>
      <br />
      <div style={{ color: 'white' }}>
        <form onSubmit={handleSubmit(onSubmit as any)}>
          <div>
          <label>
            Name your routine:
          <input name="name" ref={register({ required: false })} />
          </label>
          <label>
            Start date:
          <input name="startDate" type="date" ref={register({ required: false })} />
          </label>
          <label>
            End date:
          <input name="endDate" type="date" ref={register({ required: false })} />
          </label>
          </div>
          <Card style={{ width: '100%', height: 'auto' }} className="daysCard" >
            <label style={{ background: '#e8eef3', fontWeight: 'bold' }}>
              Daily workout plan:
            </label>
          <label>
              Monday
            <input placeholder="any notes or comments for this day?" type="text" id="monday" name="monday_comment" ref={register({ required: false })} />
              <select name="monday_query" ref={register}>
                {values.map((t: any) =>
                  <option value={t.value}>{t.label}</option>
                )}
              </select>
            </label>
            <label>
              Tuesday
            <input placeholder="any notes or comments for this day?" type="text" id="tuesday" name="tuesday_comment" ref={register({ required: false })} />
              <select name="tuesday_query" ref={register}>
                {values.map((t: any) =>
                  <option value={t.value}>{t.label}</option>
                )}
              </select>
            </label>
            <label>
              Wednesday
            <input placeholder="any notes or comments for this day?" type="text" id="wednseday" name="wednesday_comment" ref={register({ required: false })} />
              <select name="wednesday_query" ref={register}>
                {values.map((t: any) =>
                  <option value={t.value}>{t.label}</option>
                )}
              </select>
            </label>
            <label>
              Thursday
            <input placeholder="any notes or comments for this day?" type="text" id="thursday" name="thursday_comment" ref={register({ required: true })} />
              <select name="thursday_query" ref={register}>
                {values.map((t: any) =>
                  <option value={t.value}>{t.label}</option>
                )}
              </select>
            </label>
            <label>
              Friday
            <input placeholder="any notes or comments for this day?" type="text" id="friday" name="friday_comment" ref={register({ required: false })} />
              <select name="friday_query" ref={register}>
                {values.map((t: any) =>
                  <option value={t.value}>{t.label}</option>
                )}
              </select>
            </label>
          </Card>
          <Button className="submitBtn" type="submit">
            Send plan information
        </Button>
        </form>
        {showError && <span>Missing input data</span>}
      </div>
    </div>
  );
}

export default InitialAssessment;
