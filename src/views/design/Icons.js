import React from "react";
import styled from "styled-components";

const Logo = styled.svg`
    position: relative;
    z-index: 100;  
    width: 10px;
    left: 50%;
    top: 0%;
    transform : translate(-60%, 0%);
`;

const Container = styled.button`
    &:hover {
    font-weight: 700;
    color: rgba(255, 255, 255, 1);
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
  align-items: center;
  border: 1px solid #ffffff;
  transition: all 0.3s ease;
  background: rgb(255, 255, 255, 0%);
`;

export const BackIcon = () => {
    return (

        <Logo viewBox="0 0 14 25" >
            <svg width="14" height="25" viewBox="0 0 14 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6088 24.4797L11.6088 24.4797L11.6123 24.4833C11.9887 24.8689 12.6098 24.8903 13.009 24.5097L13.009 24.5097L13.0132 24.5056C13.3988 24.1292 13.4202 23.5082 13.0396 23.109L13.0389 23.1083L2.90728 12.5228L13.0345 1.93285L13.035 1.93232C13.4156 1.53316 13.3942 0.912068 13.0086 0.535673L13.0086 0.535646L13.0042 0.531391C12.8147 0.350951 12.5718 0.255615 12.3193 0.255615C12.0596 0.255615 11.7986 0.358085 11.6041 0.561733C11.6041 0.561776 11.604 0.561818 11.604 0.561861C11.6039 0.561909 11.6039 0.561958 11.6038 0.562006L0.824648 11.8374L0.823996 11.8381C0.459175 12.2212 0.452676 12.8251 0.826245 13.2101C0.826888 13.2108 0.82753 13.2115 0.828175 13.2121L11.6088 24.4797Z" fill="white" stroke="white"/>
            </svg>
        </Logo>
    );
};


export const BackButton = () => {
    return (
        <Container>
            <BackIcon/>
        </Container>
    );
};