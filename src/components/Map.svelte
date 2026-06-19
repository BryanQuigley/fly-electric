<script>
	// I feel like this is slightly unconventional D3 code
	// I wanted to try out server-side rendering but also interactivity
	// It's based on https://github.com/Rich-Harris/svelte-d3-arc-demo

	import { range, visibleSpokes, includeLayovers, selectedAirport } from "/src/lib/stores.js";
	import { tooltip } from 'svooltip';
	import debounce from 'lodash/debounce';

	import * as d3 from "d3";
	import { mesh, feature } from "topojson-client";
	
	export let map;
	export let airports;

	const projection = d3.geoAlbersUsa().scale(1300).translate([487.5, 305]);
	const path = d3.geoPath();
	const pathProjected = d3.geoPath(projection);
	// Convert Topojson to mesh
	const states = mesh(map, map.objects.states, (a, b) => a !== b);
	const nation = feature(map, map.objects.nation);


	// const selectAirportDebounced = debounce(iataCode => {
	// 	if(airportLocked && iataCode === undefined) return;
	// 	$selectedAirport = iataCode;
	// }, 150);

	// const filterSpokesDebounced = function (iataCode) {
	// 	// filter is already active? 
	// 	if($selectedAirport && iataCode) {
	// 		// Immediately allow to select next airport
	// 		selectAirportDebounced.cancel();
	// 		return $selectedAirport = iataCode;
	// 	}
	// 	selectAirportDebounced(iataCode);
	// }

	let airportLocked = false;
	
	function lockAirport(iataCode) {
		// deselect
		if(iataCode === $selectedAirport) iataCode = undefined;
		// select
		airportLocked = true;
		$selectedAirport = iataCode;
	}

	function unlockAirport() {
		airportLocked = false;
		$selectedAirport = undefined;
	}
	
	
	// color spokes depending on class
	function spokeColor({properties}, includeLayovers) {
		// can be replaced direct
		if(properties.DISTANCE <= $range) return '#61A0FF';
		// can be replaced with 1 layover
		return '#FF8A00';
	}

	// construct scales
	// Map spoke width to passenger count
	const spokeWidthScale = d3.scaleLinear().domain([1, 102, 315, 720, 2029]).range([.5,.75,1.25,3]);
	// Map spoke opacity to departures performed
	const spokeOpacityScale = d3.scaleLinear().domain([1, 15712, 47498, 102776, 248722]).range([.2, .3, .4, .5])
	// Modifiers to make sure we see something in lower range
	const spokeWidthModifier = d3.scaleLinear().domain([0,1000]).range([0,0]).clamp(true);
	const spokeOpacityModifier = d3.scaleLinear().domain([0,1000]).range([.25, -.1]).clamp(true);

	const tooltipOptions = {
		delay: [100, 0],
		offset: 2,
	};
	

	function spokeOpacity(passengers) {
		// general opacity
		const opacity = spokeOpacityScale(passengers) + spokeOpacityModifier($range);
		// bump if we're selecting a single airport and there aren't many spokes
		if($visibleSpokes.spokes.length <= 20) return Math.max(0.5, opacity);
		return opacity;
	}

</script>

<div on:click={unlockAirport}>
	<svg viewBox='18 13 940 595' preserveAspectRatio="xMinYMin meet" id="airports">
		<!-- Continental US Geography -->
		<g fill="none" stroke-linejoin="round" stroke-linecap="round">
			<path stroke-width="1" stroke="var(--neutral-300)" fill="var(--neutral-50)" d="{path(nation)}" />
			<path stroke-width=".6" stroke="var(--neutral-300)" d="{path(states)}" />
		</g>
		
		<!-- Spokes -->
		<g fill="none" stroke="#000" stroke-linejoin="round" stroke-linecap="round" id="spokes">
			{#each $visibleSpokes.spokes as spoke (spoke.id)}
			<path 
				class="spoke"
				stroke="{spokeColor(spoke, $includeLayovers)}" 
				stroke-width="{ spokeWidthScale(spoke.properties.DEPARTURES_PERFORMED) + spokeWidthModifier($range) }"
				stroke-opacity="{ spokeOpacity(spoke.properties.PASSENGERS) }"
				d="{pathProjected(spoke)}"
			/>
			{/each}
		</g>
		
		<!-- Airports -->
		<g fill="rgba(0,0,0,.25)" stroke-width="9" stroke="transparent" stroke-linejoin="round" stroke-linecap="round">
			{#each airports.features as airport}
				<circle 
					cx="{projection(airport.geometry.coordinates)[0]}" 
					cy="{projection(airport.geometry.coordinates)[1]}" 
					r="2.25"
					on:click|capture|stopPropagation={ () => lockAirport(airport.properties.iata_code) }
					class:selected={ airport.properties.iata_code === $selectedAirport }
					use:tooltip={{
						...tooltipOptions,
						content: airport.properties.iata_code
					}}
				/>
			{/each}
			</g>
	</svg>
</div>

<style lang="scss">
	div {
		position: relative;
	}

	svg {
		width: 100%;
		height: 100%;
	}

	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	#spokes {
		pointer-events: none;
	}

	#airports circle {
		cursor: pointer;
		
		&:hover {
			fill: rgba(0,0,0,.7);
		}

		&.selected {
			fill: rgba(0,0,0,.7);
			transition: r .25s cubic-bezier(0.65, -0.08, 0.24, 2);
			r: 4;
			// stroke-width: 5;
		}
	}

</style>