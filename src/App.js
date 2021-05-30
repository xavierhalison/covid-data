import React, { useEffect, useState } from "react";
import { PieChart, BarChart, LineChart } from "datavis-library-tcc";

import {
  Container,
  Header,
  GlobalStyle,
  Title,
  Body,
  Section1,
  Section1Chart,
  SectionTitle,
  LabelText,
  Label,
  Color,
  Chart,
  LabelGroup,
  Section2,
} from "./style";

import { getAllCountries, getLast12Months } from "./services";

function App() {
  const [cases, setCases] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [todayDeaths, setTodayDeaths] = useState(null);
  const [last12Months, setLast12Months] = useState(null);
  const [last12MonthsIndia, setLast12MonthsIndia] = useState(null);
  const [last12MonthsMex, setLast12MonthsMex] = useState(null);

  useEffect(() => {
    if (!cases)
      getAllCountries({ sort: "cases", number: 10 }).then((data) =>
        setCases(data)
      );
  }, [cases]);

  useEffect(() => {
    if (!deaths)
      getAllCountries({ sort: "deaths", number: 10 }).then((data) =>
        setDeaths(data)
      );
  }, [deaths]);

  useEffect(() => {
    if (!todayDeaths)
      getAllCountries({ sort: "todayDeaths", number: 10 }).then((data) =>
        setTodayDeaths(data)
      );
  }, [todayDeaths]);

  useEffect(() => {
    if (!last12Months)
      getLast12Months({ country: "brazil" }).then((data) => {
        const formatedData = data.dates.map((d) =>
          new Date(d).toGMTString().substring(8, 16)
        );
        setLast12Months({ ...data, dates: formatedData });
      });
  }, [last12Months]);

  useEffect(() => {
    if (!last12MonthsIndia)
      getLast12Months({ country: "india" }).then((data) => {
        const formatedData = data.dates.map((d) =>
          new Date(d).toGMTString().substring(8, 16)
        );
        setLast12MonthsIndia({ ...data, dates: formatedData });
      });
  }, [last12MonthsIndia]);

  useEffect(() => {
    if (!last12MonthsMex)
      getLast12Months({ country: "mexico" }).then((data) => {
        const formatedData = data.dates.map((d) =>
          new Date(d).toGMTString().substring(8, 16)
        );
        setLast12MonthsMex({ ...data, dates: formatedData });
      });
  }, [last12MonthsMex]);

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
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Title>Dados da covid 19</Title>
        </Header>
        <Body>
          <Section1>
            <Section1Chart>
              <SectionTitle>Casos (total)</SectionTitle>
              {deaths && (
                <Chart>
                  <LabelGroup>
                    {deaths?.first10Countries.map((country, key) => (
                      <Label>
                        <Color color={colors[key]} />
                        <LabelText>
                          <strong>{country}: </strong>
                          {deaths.first10Counter[key].toLocaleString()}
                        </LabelText>
                      </Label>
                    ))}
                  </LabelGroup>
                  <PieChart
                    size={370}
                    data={deaths.first10Counter}
                    labels={deaths.first10Countries}
                    colors={colors}
                    font={{ fontFamily: "monospace", fontSize: 12 }}
                  />
                </Chart>
              )}
            </Section1Chart>
            <Section1Chart>
              <SectionTitle>Óbitos (total)</SectionTitle>
              {cases && (
                <Chart>
                  <PieChart
                    size={370}
                    data={cases.first10Counter}
                    labels={cases.first10Countries}
                    colors={colors}
                    font={{ fontFamily: "monospace", fontSize: 12 }}
                  />
                  <LabelGroup>
                    {cases?.first10Countries.map((country, key) => (
                      <Label right>
                        <Color color={colors[key]} />
                        <LabelText>
                          <strong>{country}: </strong>
                          {cases.first10Counter[key].toLocaleString()}
                        </LabelText>
                      </Label>
                    ))}
                  </LabelGroup>
                </Chart>
              )}
            </Section1Chart>
          </Section1>
          <Section2>
            <Section1Chart dark>
              <SectionTitle dark>Óbitos (hoje)</SectionTitle>
              {todayDeaths && (
                <Chart>
                  <LabelGroup>
                    {todayDeaths?.first10Countries.map((country, key) => (
                      <Label negative>
                        <Color color={colors[key]} />
                        <LabelText>
                          <strong>{country}: </strong>
                          {todayDeaths.first10Counter[key].toLocaleString()}
                        </LabelText>
                      </Label>
                    ))}
                  </LabelGroup>
                  <PieChart
                    size={370}
                    data={todayDeaths.first10Counter}
                    labels={todayDeaths.first10Countries}
                    colors={colors}
                    font={{ fontFamily: "monospace", fontSize: 12 }}
                    negative
                  />
                </Chart>
              )}
            </Section1Chart>
          </Section2>
          <Section1>
            <Section1Chart dark>
              <SectionTitle dark>Casos (Brasil)</SectionTitle>
              {last12Months && (
                <BarChart
                  size={400}
                  data={last12Months.counter.Confirmed}
                  labels={last12Months.dates}
                  color={colors[9]}
                  negative
                />
              )}
            </Section1Chart>
            <Section1Chart>
              <SectionTitle>Óbitos (Brasil)</SectionTitle>
              {last12Months && (
                <BarChart
                  size={450}
                  data={last12Months.counter.Deaths}
                  labels={last12Months.dates}
                  color={colors[5]}
                />
              )}
            </Section1Chart>
          </Section1>
          <Section1>
            <Section1Chart>
              <SectionTitle>Casos (Brasil, Índia)</SectionTitle>
              {last12Months && last12MonthsIndia && (
                <LineChart
                  size={400}
                  datasets={[
                    last12Months.counter.Confirmed,
                    last12MonthsIndia.counter.Confirmed,
                  ]}
                  labels={last12Months.dates}
                  colors={[colors[5], colors[9]]}
                />
              )}
              <LabelGroup row>
                {["Brazil", "India"].map((country, key) => (
                  <Label right>
                    <LabelText row>
                      <strong>{country}</strong>
                    </LabelText>
                    <Color color={colors[key === 0 ? 5 : 9]} />
                  </Label>
                ))}
              </LabelGroup>
            </Section1Chart>
            <Section1Chart dark>
              <SectionTitle dark>Óbitos (Brasil, Índia)</SectionTitle>
              {last12Months && last12MonthsIndia && (
                <LineChart
                  size={400}
                  datasets={[
                    last12Months.counter.Deaths,
                    last12MonthsIndia.counter.Deaths,
                  ]}
                  labels={last12Months.dates}
                  colors={[colors[5], colors[9]]}
                  negative
                />
              )}
              <LabelGroup row>
                {["Brazil", "India"].map((country, key) => (
                  <Label right negative>
                    <LabelText row>
                      <strong>{country}</strong>
                    </LabelText>
                    <Color color={colors[key === 0 ? 5 : 9]} />
                  </Label>
                ))}
              </LabelGroup>
            </Section1Chart>
          </Section1>
        </Body>
      </Container>
    </>
  );
}

export default App;
