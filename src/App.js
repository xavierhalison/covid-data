import React, { useState, useEffect } from "react";
import { BarChart } from "datavis-library-tcc";

import Skeleton from "./skeleton";

import "./App.css";

import { getLatestData, getHistoryCriticalStates } from "./services";

// const fetchData = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const latest = await getLatestData();
//       const criticalStatesHistory = await getHistoryCriticalStates();

//       resolve({ latest, criticalStatesHistory });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

function App() {
  const [covidData, setCovidData] = useState({
    latest: null,
    criticalStatesHistory: null,
  });

  useEffect(() => console.log(covidData), [covidData]);

  if (!covidData.latest)
    getLatestData()
      .then((data) => setCovidData({ ...covidData, latest: data }))
      .then(() => {
        if (!covidData.criticalStatesHistory)
          getHistoryCriticalStates().then((data) =>
            setCovidData({ ...covidData, criticalStatesHistory: data })
          );
      });

  return (
    <div className="App">
      <div className="header">
        <h3 className="header__title">Dados da covid-19 no Brasil</h3>
      </div>
      <div className="section section--1">
        <h3 className="section__title">Tempo real</h3>
        <div className="subsection">
          <div className="chart-container">
            {covidData && covidData.latest ? (
              <>
                <h4 className="chart-container__title">Número de mortos</h4>
                <BarChart
                  data={covidData.latest.deceasedByRegion.count}
                  labels={covidData.latest.deceasedByRegion.labels}
                  size={450}
                  color="#cf3a5f"
                />
              </>
            ) : (
              <>
                <Skeleton width="120px" height="20px" margin="0 0 10px" />
                <Skeleton width="450px" height="450px" />
              </>
            )}
          </div>
          <div className="chart-container">
            {covidData && covidData.latest ? (
              <>
                <h4 className="chart-container__title">Número de infectados</h4>
                <BarChart
                  data={covidData.latest.infectedByRegion.count}
                  labels={covidData.latest.infectedByRegion.labels}
                  size={450}
                  color="#cf3a5f"
                />
              </>
            ) : (
              <>
                <Skeleton width="120px" height="20px" margin="0 0 10px" />
                <Skeleton width="450px" height="450px" />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="section section--2">
        <h3 className="section__title">Últimos dias</h3>
        <div className="subsection">
          <div className="chart-container">
            {covidData && covidData.latest ? (
              <>
                <h4 className="chart-container__title chart-container__title--negative">
                  Número de mortos
                </h4>
                <BarChart
                  data={covidData.latest.deceasedByRegion.count}
                  labels={covidData.latest.deceasedByRegion.labels}
                  size={450}
                  color="#cf3a5f"
                />
              </>
            ) : (
              <>
                <Skeleton width="120px" height="20px" margin="0 0 10px" />
                <Skeleton width="450px" height="450px" />
              </>
            )}
          </div>
          <div className="chart-container">
            {covidData && covidData.latest ? (
              <>
                <h4 className="chart-container__title chart-container__title--negative">
                  Número de mortos
                </h4>
                <BarChart
                  data={covidData.latest.deceasedByRegion.count}
                  labels={covidData.latest.deceasedByRegion.labels}
                  size={450}
                  color="#cf3a5f"
                />
              </>
            ) : (
              <>
                <Skeleton width="120px" height="20px" margin="0 0 10px" />
                <Skeleton width="450px" height="450px" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
