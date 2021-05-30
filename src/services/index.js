import axios from "axios";

const BASE_URL_NINJA = "https://corona.lmao.ninja/v2";
const BASE_URL_COVID19API = "https://api.covid19api.com";

export const getAllCountries = ({ sort, number, restOfTheWorld = true }) => {
  return axios
    .get(`${BASE_URL_NINJA}/countries?sort=${sort}`)
    .then(({ data }) => {
      const countries = data.map(({ country }) => country);
      const counter = data.map((d) => d[sort]);
      return [countries, counter];
    })
    .then(([countries, counter]) => {
      const first10Countries = countries.slice(0, number - 1);
      const first10Counter = counter.slice(0, number - 1);

      if (restOfTheWorld) {
        first10Countries.push("Rest of the world");

        const leftCounters = counter.slice(number).reduce((a, c) => a + c);
        first10Counter.push(leftCounters);
      }

      return { first10Countries, first10Counter };
    })
    .catch((error) => error);
};

export const getLast12Months = ({ country }) => {
  const dates = getLastStartAndEndDates(),
    { startDate } = dates[0],
    { endDate } = dates[dates.length - 1],
    allEndDates = dates.map(({ endDate }) => endDate);

  return axios(
    `${BASE_URL_COVID19API}/country/${country}?from=${startDate}&to=${endDate}`
  )
    .then(({ data }) =>
      data.filter((d) =>
        allEndDates.includes(d.Date.replace("T00:00:00Z", "T00:00:00.000Z"))
      )
    )
    .then((data) => {
      const dates = allEndDates;
      const counter = {
        Deaths: data.map(({ Deaths }, key) => {
          return key - 1 === -1 ? Deaths : Deaths - data[key - 1].Deaths;
        }),
        Confirmed: data.map(({ Confirmed }, key) => {
          return key - 1 === -1
            ? Confirmed
            : Confirmed - data[key - 1].Confirmed;
        }),
      };

      return { dates, counter };
    })
    .then(({ dates, counter }) => {
      const { Confirmed, Deaths } = counter;
      Confirmed.shift();
      Deaths.shift();

      dates.shift();
      return { dates, counter: { Confirmed, Deaths } };
    });
};

const subtractMonth = (date, number) => {
  const y = date.getFullYear();
  const m = date.getMonth();

  if (m - number < 0) {
    date.setYear(y - 1);
    date.setMonth(11);
    return subtractMonth(date, (m - number + 1) * -1);
  } else {
    if (m - number === 1) {
      date.setMonth(m - number);
    }
    date.setMonth(m - number);
    return date;
  }
};

export const getLastStartAndEndDates = (number = 13) => {
  const dates = [];

  for (let index = number; index > 0; index--) {
    const baseDate = subtractMonth(new Date(), index);
    const startDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1)
      .toISOString()
      .replace("T03", "T00");
    const endDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0)
      .toISOString()
      .replace("T03", "T00");
    dates.push({ startDate, endDate });
  }

  return dates;
};
