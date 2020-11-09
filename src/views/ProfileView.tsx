import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { Card } from 'react-bootstrap';
// import { getRoutines } from '../services';
import WorkoutsView from './WorkoutsView';

const StyledProfile = styled.div``;

const Profile = ({ userInfo }: any) => {

  return (
    <StyledProfile>
      <WorkoutsView />
    </StyledProfile>
  );
}
export default Profile;
