import styled from "styled-components";

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
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "66%" : "90%")};
  background: rgb(255, 255, 255, ${props => (props.disabled ? "0%" : "100%")});
  transition: all 0.3s ease;
`;
