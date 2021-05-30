import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-1: #03071e;
    --color-2: #370617;
    --color-3: #6a040f;
    --color-4: #9d0208;
    --color-5: #d00000;
    --color-6: #dc2f02;
    --color-7: #e85d04;
    --color-8: #f48c06;
    --color-9: #faa307;
    --color-10: #ffba08
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
`;

export const Header = styled.div`
  background-color: #000000;
  color: #ffffff;
  width: 100%;
  padding: 20px 25px;
`;

export const Body = styled.div`
  height: 100%;
  overflow: auto;
`;

export const Title = styled.h3`
  font-size: 25px;
  line-height: 25px;
  font-weight: 400;
  color: var(--color-10);
`;

export const Section1 = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Section2 = styled(Section1)`
  background-color: #000;
`;

export const Section1Chart = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: ${({ dark }) => (dark ? "#000" : "#fff")};
  width: 100%;
`;

export const SectionTitle = styled.h3`
  color: ${({ dark }) => (dark ? "#fff" : "var(--color-5)")};
  font-size: 38px;
`;

export const Label = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  margin: 20px 0;
  width: 100%;
  flex-direction: ${({ right }) => (right ? "row-reverse" : "row")};
  color: ${({ negative }) => (negative ? "#FFF" : "#000")};
`;

export const Color = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  border: 1px solid white;
  border-radius: 50%;
  margin: 0 5px;
`;

export const LabelText = styled.span`
  margin-right: ${({ row }) => (row ? "20px" : "0")};
`;

export const Chart = styled.div`
  display: flex;
  align-items: center;
`;

export const LabelGroup = styled.div`
  display: ${({ row }) => (row ? "flex" : "block")};
`;
