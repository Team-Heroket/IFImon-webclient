import styled from "styled-components";

export const DESKTOP_WIDTH = 1160;
export const SMALL_LAPTOPS_WIDTH = 970;
export const TABLETS_WIDTH = 750;
export const SMALL_WIDTH = 768;

const Row = styled.div`
    &::after{
    content: "";
    clear: "";
    display: table "";
    }
    `;

const Column = styled.div`
    float: left
    align-items: center
    width = 100%
    
    @media only screen and (min-width: 768px){
    width: 50%;
    }
`

export const BaseContainer = styled.div`
  margin-left: auto;
  padding-left: 15px;
  margin-right: auto;
  padding-right: 15px;
  max-width: ${DESKTOP_WIDTH}px;
`;

export const  ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  justify-content: center;
  margin-bottom:20px
`;

export const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

export const SimpleContainer = styled.div`
  width: ${props => props.width || null};
  float: ${props => props.defFloat || null};
  justify-content:center;
  margin:auto;
  align-items: center;
  display: flex;
`;

export const PokeCodeContainer = styled.label`
  &:hover {
    transform: translateY(${props => (props.disabled ? 0 : 2)}px);
  }
  padding: 6px;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  color: white;
  width: ${props => props.width || null};
  height: 35px;
  border: 1px solid #FFFFFF;
  border-radius: 25px;
  margin-top: 10px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? "66%" : "100%")};
  background: rgba(255, 255, 255, 0.2);;
  transition: all 0.3s ease;
  margin: 0 auto;
`;

export const AvatarContainer = styled.div`
  overflow-y: scroll;
  background: rgba(255, 255, 255, 0.2);
  margin-left: 15%;
  border-radius: 25px;
  margin-top: 15px;
  height:  ${props => props.height || "350px"};
  width: 450px;
  padding-left: 15px;
  
`;

export const PlayerContainer = styled.li`
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;