import React from 'react';
import styled from 'styled-components';


const StyledAboutUs = styled.div`
  padding: 20px;
  color: white;
  background: slategray;
  border-radius: 8px;
`;

const AboutUs = () => (
  <StyledAboutUs>
    <h1>Our vision:</h1>

    <p>
      The aim of this project is to create a useful digital platform that helps adults have a healthy lifestyle and staying physically active by offering a personalized weekly exercise routine ranging from different types of workouts for every need and goal of the user.
    </p>
    <ul>
      <h2>Objetives:</h2>
      <li>Keep the physical activity of people during stressful times.</li>
      <li>Help people find better quality of life through the use of a useful and simple app that generates weekly workout tutorials.</li>
      <li>Host a complete reference of workout routines by creating weekly personalized routines for people to workout anytime, five days a week and adjusting with a variable schedule.</li>
      <li>Provide a catalog where the user can choose from the most popular workout videos such as: yoga, cardio, weightlifting, crossfit, interval training and pilates.</li>
      <li>Instigate interest in people to keep a healthy and balanced life despite limitations like: finding a close gym, lack of time commuting, tight schedules, etc...</li>
      <li>Help people feel comfortable with the workouts they are doing and keep their motivation as a top priority.</li>

    </ul>
  </StyledAboutUs>
);

export default AboutUs;
