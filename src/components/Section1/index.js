import React, { useState, useEffect } from "react";

import {
  Container,
  Skeleton,
  ChartWrapper,
  SubSectionTitle,
  Label,
  Color,
  LabelText,
} from "./style";

import { PieChart } from "datavis-library-tcc";

import { getAllCountries } from "../../services";
function Section1() {
  const [deaths, setDeaths] = useState(null);
  const [cases, setCases] = useState(null);
  const [todayDeaths, setTodayDeaths] = useState(null);

  useEffect(() => {
    if (!deaths)
      getAllCountries({ sort: "deaths", number: 10 }).then((data) =>
        setDeaths(data)
      );
  }, [deaths]);

  useEffect(() => {
    if (!cases)
      getAllCountries({ sort: "cases", number: 10 }).then((data) =>
        setCases(data)
      );
  }, [cases]);

  useEffect(() => {
    if (!todayDeaths)
      getAllCountries({ sort: "todayDeaths", number: 10 }).then((data) =>
        setTodayDeaths(data)
      );
  }, [todayDeaths]);

  const colors = [
    "#03071e",
    "#370617",
    "#6a040f",
    "#9d0208",
    "#d00000",
    "#dc2f02",
    "#e85d04",
    "#f48c06",
    "#faa307",
    "#ffba08",
  ];

  return (
    <Container>
      <ChartWrapper>
        <SubSectionTitle>Casos (Total)</SubSectionTitle>
        <PieChart
          size={200}
          data={cases.first10Counter}
          labels={cases.first10Countries}
          colors={colors}
          font={{ fontFamily: "monospace", fontSize: 12 }}
        />
        {cases?.first10Countries.map((country, key) => (
          <Label>
            <Color color={colors[key]} />
            <LabelText>
              {country}: {cases.first10Counter[key]}
            </LabelText>
          </Label>
        ))}
      </ChartWrapper>
    </Container>
  );
}

export default Section1;
