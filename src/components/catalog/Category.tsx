import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const Category = styled(Card)`
  transition: opacity 1s ease-in-out;
  max-height: 50%;
  &:hover {
    top: -2px;
    box-shadow: 0px 22px 80px -30px #657480;
    :after {
      animation: shine 1.5s ease 0s 1 normal none running;
    }
  }
  .card-body {
    padding: 0;
  }
  img {
    width: 100%;
  }
`;
