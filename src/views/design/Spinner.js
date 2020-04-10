import React from "react";
import "./spinner.css";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left:-27px;
  margin-top:-40px;
  margin-bottom:20px;
`;

export const Spinner = () => {
    return (
        <Container>
            <div className="lds-ellipsis">
                <div />
                <div />
                <div />
                <div />
            </div>
        </Container>
    );
};
