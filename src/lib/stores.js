import allSpokes from '/src/data/spokes.json';
import { sumFlights, sumPassengers, sumCO } from './utils.js';
import { writable, derived } from "svelte/store"


// add ids to spokes to speed up re-rendering
allSpokes.features = allSpokes.features.map((spoke, id) => {
	return {
		...spoke, 
		id
	}
});

export const range = writable(175);
export const selectedAirport = writable(undefined);

const totalFlights = sumFlights(allSpokes.features);
const totalPassengers = sumPassengers(allSpokes.features);
const totalCO = sumCO(allSpokes.features);

// store derived of selected Airport 
// returns either all spokes US-wide, or all spokes for selected airport
export const spokes = derived(selectedAirport, $selectedAirport => {
	if(!$selectedAirport) return {
		spokes: allSpokes.features,
		flights: totalFlights,
		passengers: totalPassengers,
		co2: totalCO,
	}
	// apply airport filter
	const selection = allSpokes.features.filter(spoke => {
		if(spoke.properties.SPOKE_A === $selectedAirport || spoke.properties.SPOKE_B === $selectedAirport) {
			return true;
		} else {
			return false;
		}
	});
	// calculate metadata
	return {
		spokes: selection,
		flights: sumFlights(selection),
		passengers: sumPassengers(selection),
		co2: sumCO(selection)
	}
});

// select spokes to render based on range
export const visibleSpokes = derived([
	spokes,
	range,
], ([$spokes, $range]) => {
	const direct = $spokes.spokes.filter(spoke =>
		spoke.properties.DISTANCE <= $range
	);
	return {
		spokes: direct,
		flights: sumFlights(direct),
		passengers: sumPassengers(direct),
		co2: sumCO(direct),
		direct: {
			flights: sumFlights(direct),
			passengers: sumPassengers(direct),
			co2: sumCO(direct)
		}
	}
});