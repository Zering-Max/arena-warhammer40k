import { BloodBoxProps, BlueBoxProps, FlexBoxProps } from "../interfaces";
import styled from "styled-components";
import { colors } from "./colors";

export const MainPageContainer = styled.main`
  height: 90vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://www.warhammer-community.com/wp-content/uploads/2021/03/RROA3iRH7YjN8CBh.jpg");
  background-size: cover;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const BloodBox = styled.div<BloodBoxProps>(
  ({ medium, large }) => `
display: flex;
border: 1px solid gold;
background-color: ${colors.blood};
border-radius: 8px;
padding: 8px 8px;
${medium ? `height: 30%` : ""};
${large ? `height: 40%` : ""};
`
);

export const BlueBox = styled.div<BlueBoxProps>(
  ({ alignItems, spaceBetween, width }) => `
background-color: ${colors.darkblue};
border-radius: 8px;
margin-left: 8px;
padding: 8px 8px;
width: ${width}%;
display: flex;
flex-direction: column;
${spaceBetween ? `justify-content:space-between;` : ""}
${alignItems ? `align-items: center;` : ""}
`
);

export const BlackArena = styled.div`
  background-color: black;
  border-radius: 50%;
  height: 90%;
  width: 90%;
  border: 1px solid ${colors.darkred};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const BloodButton = styled.button`
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  border: 1px solid gold;
  background-color: ${colors.blood};
  padding: 4px 0 4px 0;
`;

export const FlexBox = styled.div<FlexBoxProps>(
  ({ height }) => `
height: ${height}%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
);

export const Overflow = styled.div`
  overflow: auto;
  height: 75%;
  border: 1px solid white;
  border-radius: 8px;
`;
