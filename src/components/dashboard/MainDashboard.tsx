import React, { useState } from 'react';
import { useCurrentUser } from '../auth/CurrentUser';
import WorkoutView from './WorkoutView';
import './Main.css'
import img1 from '../../images/pushups.jpg';
import img2 from '../../images/pilates.jpg';
import img3 from '../../images/abs.jpg';
import img4 from '../../images/yoga.jpg';
import { Carousel, Container, Row } from 'react-bootstrap';
// const StyledMainDashboard = styled.div`
//   color: white;
// `;
// const Button = styled.button``;

const MainDashboard = () => {
  const currentUser = useCurrentUser()
  const imgs = [img1, img2, img3, img4]
  return (
    <div>
      <Container>
        <Row className="header">
          <h2>Welcome back: {currentUser.name || 'Guest'}</h2>
        </Row>
        <div className="section light-bg">
          <Row className="section-row">
            <Carousel>
              {imgs.map((img, index) =>
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt="..."
                  />
                </Carousel.Item>
              )}
            </Carousel>
          </Row>
          <Row className="section-row">
            <WorkoutView />
          </Row>
        </div>
      </Container>
    </div>
  );
}
export default MainDashboard;
