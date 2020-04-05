import React from "react";
import styled from "styled-components";
import {ReactLogo} from "./ReactLogo";
import Header from "./Header";

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

const ExternContainer = styled.div`
  width: 450px;
  border-radius: 25px;
  display: flex;
  border: 1px solid #ffffff;
  transition: all 0.3s ease;
  background: rgb(255, 255, 255, 0%);
`;

const StatCardContainer = styled.div`
  width: 100%;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  height: 275px;
  
  display: flex;
  flex-direction: column;
  
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 0px solid #ffffff;
  transition: all 0.3s ease;
  background: linear-gradient(66deg, #F53E28 1.67%, rgba(255, 255, 255, 0) 322.73%), #FCE93A;
`;

const Row = styled.div`
    &::after{
    content: "";
    clear: "";
    display: table "";
    }
    `;

const Column = styled.div`
    float: left;
    align-items: center;
    width = ${props => props.span}px;;
    height = 100px;
    
    @media only screen and (min-width: 768px){
    width: 50%;
    white-space: normal !important
}
    }
`

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
export const Player = ({ user }) => {
  return (
      <Container>
      <Rank>{user.rank}.</Rank> <UserName>{user.username}</UserName>
      <Id>{user.statistics.gamesWon}</Id>
    </Container>
  );
};

const RankCard = styled.div`
  font-weight: bold;
  font-size:20px;
  color: #FFFFFF;
`;
const RankValCard = styled.div`
  font-weight: bold;
  font-size:50px;
  color: #000000;
`;

const StatsContainer = styled.div`
  position: relative;
  left: 10%;
  top: 40px;

  font-family: Helvetica;
  font-style: normal;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  text-align: left;
  align-items: left;

color: #FFFFFF;
`;


export const PlayerStatCard = ({ user }) => {
    return (
        <ExternContainer>

            <Row>
                <Column span={175}>
                    <StatCardContainer>
                        <img alt="avatar" src={require('../components/shared/images/avatarSVG/001-avatar.svg')} height={"66px"} width={"66px"}/>
                        <br/>
                        <RankCard>
                            Rank:
                        </RankCard>
                        <br/>
                        <RankValCard>
                            1
                        </RankValCard>
                    </StatCardContainer>
                </Column>
                <Column span={200}>
                    <StatsContainer>
                        username: Tim
                        <br/>
                        <br/>
                        games: 80
                        <br/>
                        wins: 3
                        <br/>
                        lost: 2
                        <br/>
                        Pokemon discovered: 213
                    </StatsContainer>

                </Column>
            </Row>
        </ExternContainer>

    );
};

