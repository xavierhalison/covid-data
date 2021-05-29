import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, BarChart } from "datavis-library-tcc";

import Skeleton from "./skeleton";

import Search from "./components/Search";

import "./App.css";

import {
  getAllCountries,
  getLastStartAndEndDates,
  getLast12Months,
} from "./services";
function App() {
  const [deaths, setDeaths] = useState(null);
  const [cases, setCases] = useState(null);
  const [todayDeaths, setTodayDeaths] = useState(null);
  const [tested, setTested] = useState(null);
  const [last12Months, setLast12Months] = useState(null);

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

  useEffect(() => {
    if (!tested)
      getAllCountries({
        sort: "tests",
        number: 20,
        restOfTheWorld: false,
      }).then((data) => setTested(data));
  }, [tested]);

  useEffect(() => {
    if (!last12Months)
      getLast12Months({ country: "brazil" }).then((data) => {
        const formatedData = data.dates.map((d) =>
          new Date(d).toGMTString().substring(8, 16)
        );
        setLast12Months({ ...data, dates: formatedData });
      });
  }, [last12Months]);

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
    <div className="App">
      {/* <div>
        
        {deaths?.first10Countries.map((country, key) => (
          <div>
            <span style={{ color: colors[key] }}>
              {country}: {deaths.first10Counter[key]}
            </span>
          </div>
        ))}
      </div> */}
      {deaths && (
        <PieChart
          size={300}
          data={deaths.first10Counter}
          labels={deaths.first10Countries}
          colors={colors}
          negative
        />
      )}
      {cases && (
        <PieChart
          size={300}
          data={cases.first10Counter}
          labels={cases.first10Countries}
          colors={colors}
        />
      )}
      {todayDeaths && (
        <PieChart
          size={300}
          data={todayDeaths.first10Counter}
          labels={todayDeaths.first10Countries}
          colors={colors}
        />
      )}
      {last12Months && (
        <BarChart
          size={450}
          data={last12Months.counter}
          labels={last12Months.dates}
          color={colors[9]}
        />
      )}
      {tested && (
        <BarChart
          size={450}
          data={tested.first10Counter}
          labels={tested.first10Countries}
          color={colors[5]}
        />
      )}
    </div>
  );
}

export default App;
