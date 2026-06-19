// sum all flights for given spokes
export function sumFlights(spokes) {
  if (spokes.length === 0) return 0;
  return spokes
    .map((spoke) => spoke.properties.DEPARTURES_PERFORMED)
    .reduce((a, b) => a + b);
}

export function sumPassengers(spokes) {
  if (spokes.length === 0) return 0;
  return spokes
    .map((spoke) => spoke.properties.PASSENGERS)
    .reduce((a, b) => a + b);
}

export function sumCO(spokes) {
  if (spokes.length === 0) return 0;
  const sum = spokes
    .map((spoke) => calcSpokeEmissions(spoke.properties))
    .reduce((a, b) => a + b);
  return Math.round(sum);
}

// returns the total CO2 emissions for a given spoke in Tons
export function calcSpokeEmissions(spoke) {
  // Coefficient: 0.1442kg of CO2 per-seat per-mile
  const c = 0.0001442;
  return c * spoke.PASSENGERS * spoke.DISTANCE;
}

// Number formatter, based on:
// https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
const lookup = [
  { value: 1, symbol: "" },
  { value: 1e3, symbol: "k" },
  { value: 1e6, symbol: "M" },
  { value: 1e9, symbol: "G" },
  { value: 1e12, symbol: "T" },
  { value: 1e15, symbol: "P" },
  { value: 1e18, symbol: "E" },
];
const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

export function formatNumber(num, digits) {
  if (!digits) {
    digits = 0;
    if (num >= 1000000 || num < 10000) {
      digits = 1;
    }
  }
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export function roundPercentage(num, per) {
  if (!num || !per) return 0;
  const n = (num / per) * 100;
  return Math.round(n);
}
