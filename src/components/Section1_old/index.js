import React, { useState, useEffect } from "react";
import "./style.css";

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
    <>
      <div className="section section--1">
        <div className="subsection">
          <h3 className="subsection__title">Casos (Total)</h3>
          {cases && (
            <>
              <div className="chart">
                <div className="labels">
                  {cases?.first10Countries.map((country, key) => (
                    <div className="label">
                      <div
                        className={`label__color label__color--${key + 1}`}
                      ></div>
                      <span className="label__text">
                        {country}: {cases.first10Counter[key]}
                      </span>
                    </div>
                  ))}
                </div>
                <PieChart
                  size={350}
                  data={cases.first10Counter}
                  labels={cases.first10Countries}
                  colors={colors}
                  font={{ fontFamily: "monospace", fontSize: 12 }}
                />
              </div>
            </>
          )}
        </div>
        <div className="subsection">
          <h3 className="subsection__title">Mortes (Total)</h3>
          {deaths && (
            <>
              <div className="chart">
                <PieChart
                  size={350}
                  data={deaths.first10Counter}
                  labels={deaths.first10Countries}
                  colors={colors}
                  font={{ fontFamily: "monospace", fontSize: 12 }}
                />
                <div className="labels">
                  {deaths?.first10Countries.map((country, key) => (
                    <div className="label label--pull-right">
                      <span className="label__text">
                        {country}: {deaths.first10Counter[key]}
                      </span>
                      <div
                        className={`label__color label__color--${
                          key + 1
                        } label__color--pull-right`}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="section section--2">
        <div className="subsection">
          <h3 className="subsection__title subsection__title--dark">
            Mortes (Hoje)
          </h3>
          {todayDeaths && (
            <>
              <div className="chart">
                <div className="labels">
                  {todayDeaths?.first10Countries.map((country, key) => (
                    <div className="label">
                      <div
                        className={`label__color label__color--${key + 1}`}
                      ></div>
                      <span className="label__text">
                        {country}: {todayDeaths.first10Counter[key]}
                      </span>
                    </div>
                  ))}
                </div>
                <PieChart
                  size={450}
                  data={todayDeaths.first10Counter}
                  labels={todayDeaths.first10Countries}
                  colors={colors}
                  font={{ fontFamily: "monospace", fontSize: 12 }}
                  negative
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Section1;
