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
  margin-top: 10px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "66%" : "100%")};
  background: rgb(255, 255, 255, ${props => (props.disabled ? "0%" : "100%")});
  transition: all 0.3s ease;
`;



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

