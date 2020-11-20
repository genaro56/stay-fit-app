import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledActivitiesList = styled.div``;

const ActivitiesList = () => {
  const { categoryId }: any = useParams();
  return (
    <StyledActivitiesList>
      <h1 style={{ textTransform: 'capitalize' }}>{categoryId}</h1>
    </StyledActivitiesList>
  )
};

export default ActivitiesList;
