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
export const includeLayovers = writable(true);
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

// select spokes to render based on range, incl. layovers, and 
export const visibleSpokes = derived([
	spokes,
	range,
	includeLayovers,
], ([$spokes, $range, $includeLayovers]) => {
	// take $allSpokes
	// sort into direct and layover flights
	const direct = [];
	const layover = [];
	// filter by range (w/out) layovers
	const selection = $spokes.spokes.filter(spoke => {
		// can be replaced with direct?
		if(spoke.properties.DISTANCE <= $range) {
			direct.push(spoke);
			return true;
		}
		// Show layovers?
		if(!$includeLayovers) return false;
		// Can be replaced with layover?
		if(spoke.properties.layover_range!=null && spoke.properties.layover_range <= $range) {
			layover.push(spoke);
			return true;
		}
		// not replaceable at all
		return false;
	});
	return {
		spokes: selection,
		flights: sumFlights(selection),
		passengers: sumPassengers(selection),
		co2: sumCO(selection),
		direct: {
			flights: sumFlights(direct),
			passengers: sumPassengers(direct),
			co2: sumCO(direct)
		},
		layover: {
			flights: sumFlights(layover),
			passengers: sumPassengers(layover),
			co2: sumCO(layover)
		}
	}
});