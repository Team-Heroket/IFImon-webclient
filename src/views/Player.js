import React from "react";
import styled from "styled-components";

const Container = styled.button`
    &:hover {
    transform: translateY(2px);
    transition: all 0.1s ease;
  }
  margin:5px;
  width: 280px;
  height: 35px;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff;
  transition: all 0.3s ease;
  background: rgb(255, 255, 255, 0%);
`;

const UserName = styled.div`
  color: #FFFFFF
  margin-left: 5px;
`;

const Rank = styled.div`
  font-weight: bold;
  color: #FFFFFF;
  margin-left: 5px;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
  color: #FFFFFF
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */
const Player = ({ user }) => {
  return (
    <Container>
      <Rank>{user.rank}.</Rank> <UserName>{user.username}</UserName>
      <Id>{user.statistics.gamesWon}</Id>
    </Container>
  );
};

export default Player;
