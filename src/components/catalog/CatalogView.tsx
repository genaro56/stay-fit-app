import React from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import styled from 'styled-components';

import YogaImage from '../../images/yoga.jpg'
import PushUpsImage from '../../images/pushups.jpg'
import WeightsImage from '../../images/weight.jpg'
import CardioImage from '../../images/cardio.jpg'
import PilatesImage from '../../images/pilates.jpg'
import { Category } from './Category';

const StyledCatalogView = styled(Container)``;

const Grid = styled(Row)`
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
`

const CatalogView = () => {
  const categories = [
    { name: 'Push-ups', id: 'push-ups', img: PushUpsImage },
    { name: 'Yoga', id: 'yoga', img: YogaImage },
    { name: 'Weights', id: 'weights', img: WeightsImage },
    { name: 'Cardio', id: 'cardio', img: CardioImage },
    { name: 'Pilates', id: 'pilates', img: PilatesImage },
  ]
  return (
    <StyledCatalogView>
      <Row>
        <Col>
          <Row>
            <h1>CatalogView</h1>
          </Row>
          <Grid>
            {categories.map((cat: any) => (
              <Category
                onClick={() => window.location.replace(`activity-list/${cat.id}`)}
                id={cat.name}
                className="category"
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
            ))

            }
          </Grid>
        </Col>
      </Row>
    </StyledCatalogView>
  )
};

export default CatalogView;
