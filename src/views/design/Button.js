import styled, { keyframes } from 'styled-components';
import React from "react";
import {BackIcon, LeaderboardIcon, QuickplayIcon, SettingsIcon, SocialIcon, TutorialIcon} from "./Icons";

export const Button = styled.button`
  &:hover {
    transform: translateY(${props => (props.disabled ? 0 : 2)}px);
    background: rgb(255, 255, 255, ${props => (props.disabled ? "0%" : "100%")});
  }
  padding: 6px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
  color: ${props => (props.disabled ? "rgba(255, 255, 255, 1)" : "rgba(142, 197, 177, 1)")};
  width: ${props => props.width || null};
  height: 35px;
  border: 1px solid #FFFFFF;;
  border-radius: 25px;
  margin-top: 10px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "66%" : "100%")};
  background: rgb(255, 255, 255, ${props => (props.disabled ? "0%" : "100%")});
  transition: all 0.3s ease;
`;

export const EvolveButton = styled.button`
  &:hover {
    transform: translateY(${props => (props.disabled ? 0 : 2)}px);
    background: rgb(255, 255, 255, ${props => (props.disabled ? "0%" : "100%")});
  }
  &:focus{
    font-family: Helvetica;
    font-weight: 500;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
    line-height: 23px;
    color: #FFFFFF;
    border: 1px solid #FFFFFF;
    background: linear-gradient(102.87deg, #69CBD1 0%, rgba(255, 255, 255, 0) 188.68%), #89FBB8;
  }
  padding: 6px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
  color: ${props => (props.disabled ? "rgba(255, 255, 255, 1)" : "rgba(142, 197, 177, 1)")};
  width: 100%;
  height: 35px;
  border: 1px solid #FFFFFF;;
  border-radius: 25px;
  margin-top: 10px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "66%" : "100%")};
  background: rgb(255, 255, 255, ${props => (props.disabled ? "0%" : "100%")});
  transition: all 0.3s ease;
`;

export const PageButton = styled.button`
  &:hover {
    transform: ${props => (props.disabled ? 'scale(1)' : 'scale(2.5)')};
    transition: all 0.3s ease;
  }
  &:active {
    transform: ${props => (props.alignment=='left' ? 'translateX(-10px)' : 'translateX(10px)')};
    transition: all 0.3s ease;
  }
  position: absolute;
  top: 50%;
  margin-top = 50%;
  ${props => props.alignment}: 2%;
  border: 0px;
  padding: 2px;
  width: 28px;
  height: 50px;
  cursor: "pointer";
  opacity: ${props => (props.disabled ? "50%" : "100%")};
  transition: visibility 1s linear;
  
  background: transparent;
  
  z-index: 6;
`

export const nextPage = ({disabled}) =>{
    return(
        <PageButton disabled={disabled}>
            <BackIcon/>
        </PageButton>
    )
}


export const TransparentButton = styled.button`
  &:hover {
    transform: translateY(${props => (props.disabled ? 0 : 2)}px);
  }
  padding: 6px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
  color: rgb(255, 255, 255);
  width: ${props => props.width || null};
  height: 35px;
  border: 1px solid #FFFFFF;;
  border-radius: 25px;
  margin-top: 10px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "66%" : "100%")};
  background: transparent;
  transition: all 0.3s ease;
`;

export const AvatarButton = styled.button`
 &:hover {
    transform: translateY(2px);
    border: 1px solid #FFFFFF;
    background: linear-gradient(227.89deg, #F53E28 1.67%, rgba(255, 255, 255, 0) 322.73%), #FCE93A;
    animation: fadeOut 1s linear;
    transition: visibility 1s linear;
  }
  &:active {
    transform: translateY(2px);
    border: 1px solid #FFFFFF;
    background:  #FCE93A;
    animation: fadeOut 1s linear;
    transition: visibility 1s linear;
  }
  padding: 2px;
  width: 100px;
  height: 100px;
  border: ${props => (props.enabled ? 1 : 0)}px solid #FFFFFF;
  border-radius: 50px;
  margin: 2px;
  cursor: "pointer";
  background: rgb(255, 255, 255, ${props => (props.enabled ? "33%" : 0)});
  transition: visibility 1s linear;
 `


export const MenuButton = styled.button`
  &:hover {
    transform: translateY(${props => (props.disabled ? 0 : 2)}px);
  }
  padding: 6px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
  color: ${props => (props.disabled ? "rgba(255, 255, 255, 1)" : "rgba(142, 197, 177, 1)")};
  width: ${props => props.width || null};
  height: 35px;
  border: 1px solid #FFFFFF;;
  border-radius: 25px;
  margin-top: 10px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "66%" : "100%")};
  background: rgb(255, 255, 255, ${props => (props.disabled ? "0%" : "100%")});
  transition: all 0.3s ease;
`;

export const LogOutButton = styled.button`
  &:hover {
    transform: ${props => (props.disabled ? 'translateY(0px)' :'translateY(2px)')};
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    opacity:  ${props => (props.disabled ? "66%" : "90%")};;
    border: ${props => (props.disabled ? '1' :'0')}px solid #FFFFFF;;
    background:  ${props => (props.disabled ? 'rgba(255,255,255,0)' : "linear-gradient(227.89deg, #F53E28 1.67%, rgba(255, 255, 255, 0) 322.73%), #FCE93A")}; 
    opacity: ${props => (props.disabled ? "0%" : "100%")};
    transition: all 0.3s ease;
  }
  padding: 6px;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
  color: #EB5757;
  transition: all 0.3s ease;
  width: ${props => props.width || null};
  height: 35px;
  border: 0px solid #FFFFFF;;
  border-radius: 25px;
  margin-top: 30px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "0%" : "90%")};
  background: rgb(255, 255, 255);
  transition: all 0.1s ease;
`;

export const RoundContainer = styled.button`
   &:hover {
    opacity: ${props => (props.disabled ? "66%" : "90%")};
    border: ${props => (props.disabled ? null : "0px solid #FFFFFF")};
    background: ${props => (props.disabled ? "rgb(255, 255, 255, 0%)" : "rgb(255, 255, 255, 20%)")};
    transition: all 0.3s ease;
  }
  &:active{
   transform: ${props => (props.disabled ? null : "translateY(2px)")};
  }
  margin:10px;
  width: ${props => props.width || "35px"};
  height: ${props => props.width || "35px"};
  border-radius: 25px;
  display: flex;
  border: 1px solid #ffffff;
  justify-content: center;
  
    align-items: center;
    align-text: center;
  
  transition: all 0.3s ease;
  background: rgb(255, 255, 255, 0%);
  
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "66%" : "100%")};
`;

export const DotButton = styled.button`
  &:active{
  transform: ${props => (props.disabled ? null : "translateY(1px)")};
  transition: all 0.3s ease;
  }
  margin-top: 10px;
  margin-left: 5px;
  color: #FFFFFF;
  margin-right: 5px;
  font-weight: ${props => (props.disabled ? '700' : null)};
  width: ${props => props.width || "10px"};
  height: ${props => props.width || "10px"};
  border-radius: ${props => props.width || "10px"};
  border: ${props => (props.disabled ? '2' : "1")}px solid #ffffff;
  transition: all 0.3s ease;
  opacity: ${props => (props.disabled ? '100%' : "90%")};
  background: ${props => (props.disabled ? "linear-gradient(102.87deg, #69CBD1 0%, rgba(255, 255, 255, 0) 188.68%), #89FBB8;" : "rgb(255, 255, 255, 33%)")};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
`;

export const PokedexGenerationButton = styled.button`
  &:active{
  transform: ${props => (props.disabled ? null : "translateY(1px)")};
  transition: all 0.3s ease;
  }
  color: #FFFFFF;
  margin-top: -10px;
  height: ${props => (props.width*2/3) || 10}px;;
  font-weight: ${props => (props.disabled ? '700' : null)};
  width: ${props => props.width || 10}px;
  border-top-left-radius: ${props => (props.gen == 'I' ? '25px' : "0px")};
  border-top-right-radius: ${props => (props.gen == 'VIII' ? '25px' : "0px")};
  border: ${props => (props.disabled ? '2px solid rgba(255,255,255,1)' : '2px solid rgba(255,255,255,0.3)')};
  transition: all 0.3s ease;
  opacity: ${props => (props.disabled ? '100%' : "90%")};
  background: ${props => (props.disabled ? "linear-gradient(102.87deg, #69CBD1 0%, rgba(255, 255, 255, 0) 188.68%), #89FBB8;" : "rgb(255, 255, 255, 0%)")};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
`

export const KickContainer = styled.button`
    &:hover {
    transform: translateX(2px);
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    opacity: 90%;
    border: 0px solid #FFFFFF;;
    background: linear-gradient(227.89deg, #F53E28 1.67%, rgba(255, 255, 255, 0) 322.73%), #FCE93A;
    transition: all 0.3s ease;
  }
  &:active{
   transform: translateX(-4px);
  }
  margin-bottom:10px;
  margin-left: 5px;
  width: ${props => props.width || "35px"};
  height: ${props => props.width || "35px"};
  border-radius: 25px;
  display: flex;
  border: 1px solid #ffffff;
  justify-content: center;
  
    align-items: center;
    align-text: center;
  
  transition: all 0.3s ease;
  background: rgb(255, 255, 255, 0%);
`;


export const TextRoundContainer = styled.button`
    &:hover {
    transform: translateX(2px);
    
  border: 1px solid #ffffff;
    transition: all 0.3s ease;
  }
  &:active{
   border: 0px solid #FFFFFF;;
  border: 1px solid #ffffff;
   transform: translateX(-4px);
  }
  margin-right:5px;
  margin-left: 5px;
  margin-bottom: 10px;
  padding-top: 1px;
  padding-bottom: 7px;
  width: ${props => props.width || "35px"};
  height: ${props => props.width || "35px"};
  font-weight: 300;
  font-size: 25px;
  text-align: center;
  color: rgb(255, 255, 255);
  border-radius: 25px;
  display: flex;
  border: 1px solid #ffffff;
  justify-content: center;
  align-items: center;
  
  transition: all 0.3s ease;opacity: 90%;
    background: rgb(255, 255, 255, 25%);
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`

const ExternalContainer = styled.button`
  &:hover {
    transform: translateY(${props => (props.disabled ? 0 : 2)}px);
  }
  font-weight: 500;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
  color: rgb(255, 255, 255);
  width: ${props => props.width || null};
  height: 35px;
  border: 1px solid #FFFFFF;;
  border-radius: 25px;
  margin-top: 12px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "66%" : "100%")};
  background: transparent;
  transition: all 0.3s ease;
`;

const Row = styled.div`

    &::after{
    content: "";
    clear: "";
    display: table "";
    }
    `;

const Column = styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
    align-text: center;
    float: ${props => props.float}};
    width = ${props => props.width};
    white-space: normal !important
}
    }
`;

function buttonIcon(type) {

    switch(type.text) {
        case('settings'):
            return <SettingsIcon/>;
        case('leaderboard'):
            return <LeaderboardIcon/>;
        case('social mode'):
            return <SocialIcon/>;
        case('quickplay'):
            return <QuickplayIcon/>;
        case('tutorial'):
            return <TutorialIcon/>;
    };
}

export let MenuButtonIcon = ( {type, onClicktoDo}) => {
    return (
        <ExternalContainer width={"160%"} onClick = {onClicktoDo}>
            <Row>
                <Column width={"25%"} float={'left'}>
                    {buttonIcon(type)}
                </Column>
                <Column width={"50%"} float={'center'}>
                    {type.text}
                </Column>

                <Column width={"25%"} float={'right'}/>

            </Row>
        </ExternalContainer>

    );
};



export let TestObject = ({stateTest}) => {
    console.log("recived: ", stateTest);
    return (
        <ExternalContainer width={"55%"}>
            <Row>
                <Column width={"25%"} float={'left'}>
                    <div>
                        {stateTest.pokeCode}
                    </div>
                </Column>
                <Column width={"50%"} float={'center'}>
                    {stateTest.amountOfPlayers}
                </Column>

                <Column width={"25%"} float={'right'}>
                    <div>
                        {stateTest.amountOfNPC}
                    </div>
                </Column>

            </Row>
        </ExternalContainer>

    );
};