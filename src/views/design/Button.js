import styled, { keyframes } from 'styled-components';
import React from "react";
import {BackIcon} from "./Icons";

export const Button = styled.button`
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
    transform: translateY(2px);
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
    opacity: 90%;
    border: 0px solid #FFFFFF;;
    background: linear-gradient(227.89deg, #F53E28 1.67%, rgba(255, 255, 255, 0) 322.73%), #FCE93A;
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
  cursor: "pointer";
  opacity: 90%;
  background: rgb(255, 255, 255);
  transition: all 0.1s ease;
`;

export const RoundContainer = styled.button`
    &:hover {
    opacity: 90%;
    border: 0px solid #FFFFFF;;
    background: rgb(255, 255, 255, 25%);
    transition: all 0.3s ease;
  }
  &:active{
   transform: translateY(2px);
  }
  margin:5px;
  width: 35px;
  height: 35px;
  border-radius: 25px;
  display: flex;
  border: 1px solid #ffffff;
  transition: all 0.3s ease;
  background: rgb(255, 255, 255, 0%);
`;
