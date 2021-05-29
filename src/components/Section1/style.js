import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 100%;

  @media screen and (min-width: 415px) {
    display: flex;
    justify-content: space-around;
  }
`;

export const ChartWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const SubSectionTitle = styled.h3`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const Label = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Color = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  border: 1px solid white;
  border-radius: 50%;
  margin: 0 5px;
`;

export const LabelText = styled.span``;
