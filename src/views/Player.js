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

const ExternContainer = styled.div`
  width: 450px;
  border-radius: 25px;
  display: flex;
  border: 1px solid #ffffff;
  margin-bottom: 10px
  transition: all 0.3s ease;
  background: rgb(255, 255, 255, 33%);
`;

const StatCardContainer = styled.div`
  width: 125px;
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
    width = ${props => props.span}%;
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
export let Player = ({ user }) => {
  return (
      <Container>
      <Rank>{user.statistics.rating}.</Rank> <UserName>{user.username}</UserName>
      <Id>{user.statistics.gamesWon}</Id>
    </Container>
  );
};

const RankCard = styled.div`
    display: flex;
    font-family: Helvetica;
  font-weight: bold;
  font-size:20px;
  color: #FFFFFF;
`;
const RankValCard = styled.div`
  font-weight: bold;
  font-size:50px;
  color: #000000;
`;

const UserNameCard = styled.div`
  font-weight: bold;
  font-size:30px;
  color: #FFFFFF;
`;

const StatsContainer = styled.div`
  position: relative;
  left: 10px;
  top: 20px;
  width: 300px;

  font-family: Helvetica;
  font-style: normal;
  font-size: 20px;
  line-height: 23px;
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: left;

color: #ffffff;
`;


export let PlayerStatCard = ({ user }) => {
    return (
        <ExternContainer>

            <Row>


                <Column span={"20"}>
                    <StatCardContainer>
                        {console.log("user id:"+user.avatarId)}
                        <img alt="avatar" src={require('../components/shared/images/avatarSVG/00'+user.avatarId+'-avatar.svg')} height={"66px"} width={"66px"}/>
                        <br/>
                        <RankCard>
                            Rank:
                        </RankCard>
                        <br/>
                        <RankValCard>
                            {user.statistics.rating}
                        </RankValCard>
                    </StatCardContainer>
                </Column>

                <Column span={"80"}>
                    <StatsContainer>
                        <UserNameCard>
                            {user.username}
                        </UserNameCard>
                        <br/>
                        <br/>
                        <RankCard>
                            Games played: {user.statistics.gamesPlayed}
                        </RankCard>
                        <br/>
                        <RankCard>
                            Wins: {user.statistics.gamesWon}
                        </RankCard>
                        <br/>
                        <RankCard>
                            Lost: {user.statistics.gamesLost}
                        </RankCard>
                        <br/>
                        <RankCard>
                            Pokemon discovered: {Math.round((user.statistics.pokemonDiscovered)/725*1000)/10}%
                        </RankCard>
                    </StatsContainer>

                </Column>
            </Row>
        </ExternContainer>

    );
};
