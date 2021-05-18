import axios from "axios";

export const getLatestData = () => {
  return axios
    .get(
      "https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true"
    )
    .then((res) => res.data)
    .then(({ deceasedByRegion, infectedByRegion }) => {
      const deceasedLabels = deceasedByRegion.map((d) => d.state);
      const infectedLabels = infectedByRegion.map((d) => d.state);

      const deceasedCount = deceasedByRegion.map((d) => d.count);
      const infectedCount = infectedByRegion.map((d) => d.count);

      return {
        deceasedByRegion: { labels: deceasedLabels, count: deceasedCount },
        infectedByRegion: { labels: infectedLabels, count: infectedCount },
      };
    })
    .catch((err) => console.error(err));
};

export const getHistoryCriticalStates = () => {
  console.log("call");
  return axios
    .get(
      "https://api.apify.com/v2/datasets/3S2T1ZBxB9zhRJTBB/items?format=json&clean=1"
    )
    .then(({ data }) => [
      data[data.length - 1],
      data[data.length - 2],
      data[data.length - 3],
    ])
    .then((data) =>
      data.map((d) => ({
        lastUpdatedAtSource: d.lastUpdatedAtSource,
        deceasedByRegion: {
          count: [
            d.deceasedByRegion[0].count,
            d.deceasedByRegion[1].count,
            d.deceasedByRegion[2].count,
          ],
          labels: [
            d.deceasedByRegion[0].state,
            d.deceasedByRegion[1].state,
            d.deceasedByRegion[2].state,
          ],
        },
        infectedByRegion: {
          count: [
            d.infectedByRegion[0].count,
            d.infectedByRegion[1].count,
            d.infectedByRegion[2].count,
          ],
          labels: [
            d.infectedByRegion[0].state,
            d.infectedByRegion[1].state,
            d.infectedByRegion[2].state,
          ],
        },
      }))
    )
    .catch((error) => console.error(error));
};
