import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const Category = styled(Card)`
  transition: opacity 1s ease-in-out;
  height:350px;
  overflow:hidden;
  &:hover {
    top: -2px;
    box-shadow: 0px 22px 80px -30px #657480;
    :after {
      animation: shine 1.5s ease 0s 1 normal none running;
    }
  }
  .card-body {
    padding: 0;
    display:flex;
  }
  img {
    width: 100%;
    object-fit: cover;
  }
`;
