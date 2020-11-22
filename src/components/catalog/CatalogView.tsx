import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import styled from 'styled-components';

import YogaImage from '../../images/yoga.jpg'
import PushUpsImage from '../../images/pushups.jpg'
import WeightsImage from '../../images/weight.jpg'
import CardioImage from '../../images/cardio.jpg'
import PilatesImage from '../../images/pilates.jpg'
import { Category } from './Category';

// UI

import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '80vh',
    padding: '32px 0'
  },
}))

const Grid = styled(Row)`
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
`

const CatalogView = () => {
  const classes = useStyles()

  const categories = [
    { name: 'Push-ups', id: 'push-ups', img: PushUpsImage },
    { name: 'Yoga', id: 'yoga', img: YogaImage },
    { name: 'Weights', id: 'weights', img: WeightsImage },
    { name: 'Cardio', id: 'cardio', img: CardioImage },
    { name: 'Pilates', id: 'pilates', img: PilatesImage },
  ]

  return (
    <Container maxWidth="lg" component="main" className={classes.container}>
      <Row>
        <Col>
          <Row>
            <h1>CatalogView</h1>
          </Row>
          <Grid style={{ padding: '16px 0' }}>
            {categories.map((cat: any) => (
              <div style={{ padding: 4 }}>
                <Category
                  onClick={() => window.location.replace(`/activity-list/${cat.id}`)}
                  id={cat.name}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Header>
                    <h1>{cat.name}</h1>
                  </Card.Header>
                  <Card.Body>
                    <img
                      alt={cat.name}
                      src={cat.img}
                    />
                  </Card.Body>
                </Category>
              </div>
            ))

            }
          </Grid>
        </Col>
      </Row>
    </Container>
  )
};

export default CatalogView;
