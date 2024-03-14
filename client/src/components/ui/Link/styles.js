import styled from "styled-components";
import { Link } from "react-router-dom";

export const SimpleLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover {
    color: #00bcd4;
    text-decoration: underline;
  }

  &.active {
    color: #00bcd4;
  }
`;
